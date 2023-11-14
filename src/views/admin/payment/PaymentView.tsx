import React, { useState, useEffect } from 'react';
import { Button, Table, Input, notification, Popconfirm } from 'antd';
import { IPayment } from "../../../types/payment.service";

import { Link } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useGetPaymentQuery, useRemovePaymentMutation } from '../../../services/payment.service';

interface DataType {
    key: string | number;
    name: string,
}
const PaymentView: React.FC = () => {
    const { data: paymentData } = useGetPaymentQuery();
    const [removePayment] = useRemovePaymentMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);

    const confirm = async (id: number | string) => {
        try {
            // Gọi API xóa sản phẩm bất đồng bộ
            await removePayment(id);

            // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
            const updatedDataSource = dataSource.filter((item) => item.key !== id);
            setDataSource(updatedDataSource);
            // Hiển thị thông báo thành công
            notification.success({
                message: "Success",
                description: "Xóa Phương Thức Thanh Toán thành công!",
            });
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error("Error deleting product", error);
        }
    };
    useEffect(() => {
        if (paymentData) {
            const filteredData = paymentData.filter((payment: IPayment) =>
                payment.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const updatedDataSource = filteredData.map((payment: IPayment) => ({
                key: payment._id,
                name: payment.name,

            }));
            setDataSource(updatedDataSource);
        }
    }, [paymentData, searchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Khi người dùng nhấn Enter để tìm kiếm
        // useEffect sẽ được gọi và cập nhật dataSource
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Phương Thức Thanh Toán',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Hành động",
            key: "action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div>
                            <Popconfirm
                                title="Xóa Phương Thức Thanh Toán này"
                                description="Bạn có chắc chắn muốn xóa Phương Thức Thanh Toán này ?"
                                onConfirm={() => confirm(id)}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "red",
                                        margin: "4px",
                                        minWidth: "4em",
                                    }}
                                >
                                    <CloseOutlined />
                                </Button>
                            </Popconfirm>

                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "blue",
                                    margin: "4px",
                                    minWidth: "4em",
                                }}
                            >
                                <Link to={`${id}/edit`} >
                                    <EditOutlined />
                                </Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },

    ];
    const data = paymentData?.map((payment: any) => {
        return {
            key: payment._id,
            ...payment,
        };
    });
    return (
        <div className="container" style={{ paddingTop: "70px" }}>
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body" >
                            <h5 className="card-title fw-semibold">Phương Thức Thanh Toán</h5>
                            <Link className="text-white" to="/admin/payment/add">
                                <button className="btn btn-success m-1">Thêm</button>
                            </Link>
                            <div className="col-lg-12 d-flex align-items-stretch">
                                <form onSubmit={handleSearch} className="d-flex w-100" method='POST'>
                                    <div className=" w-75">
                                        <Input
                                            type="text"
                                            className=""
                                            placeholder="Nhập Phương Thức Thanh Toán cần tìm"
                                            name="searchTerm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Button type="primary" htmlType="submit" >
                                        Tìm kiếm
                                    </Button>
                                    {/* <button type="submit" className=" btn btn-secondary ">Tìm kiếm</button> */}
                                </form>
                            </div>
                            <div className="table-responsive">
                                <Table dataSource={dataSource} columns={columns} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentView;