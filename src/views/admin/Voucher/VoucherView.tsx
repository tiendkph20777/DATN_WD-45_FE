import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Popconfirm, notification } from 'antd';
import { IVouchers } from "../../../types/voucher";
import { useGetVouchersQuery, useRemoveVoucherMutation } from '../../../services/voucher.service';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

const VoucherView: React.FC = () => {
    const { data: voucherData } = useGetVouchersQuery();
    const [removeVoucher] = useRemoveVoucherMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);
    const confirm = async (id) => {
        try {
            // Gọi API xóa sản phẩm bất đồng bộ
            await removeVoucher(id);

            // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
            const updatedData = dataSource.filter((item) => item.key !== id);
            setDataSource(updatedData);

            // Hiển thị thông báo thành công
            notification.success({
                message: "Success",
                description: "Xóa voucher thành công!",
            });
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error("Error deleting product", error);
        }
    };
    useEffect(() => {
        if (voucherData) {
            const updatedDataSource = voucherData.map(
                ({ _id, code, value, quantity, date_start, date_end }: IVouchers) => ({
                    key: _id,
                    code,
                    value,
                    quantity,
                    date_start,
                    date_end,

                })
            );
            setDataSource(updatedDataSource);
        }
    }, [voucherData, searchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Khi người dùng nhấn Enter để tìm kiếm
        // useEffect sẽ được gọi và cập nhật dataSource
    };




    const columns = [
        {
            title: 'Mã giảm giá',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'date_start',
            key: 'date_start',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'date_end',
            key: 'date_end',
        },


        {
            render: ({ key: id }: { key: number | string }) => {
                return (
                    <>
                        <Button>
                            <Link to={`/admin/voucher/${id}/edit`}>Update</Link>
                        </Button>
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa voucher này ?"
                            onConfirm={() => {
                                confirm(id);
                            }}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <Button type="primary" style={{ backgroundColor: 'red', margin: '4px', minWidth: '8em' }}>
                                <CloseOutlined /> Remove
                            </Button>
                        </Popconfirm>

                    </>
                );
            },
        },
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body" style={{ paddingTop: "70px" }}>
                            <h5 className="card-title fw-semibold ">Mã giảm giá</h5>
                            <a className="text-white" href="/admin/voucher/add">
                                <button type="button" className="btn btn-success m-1">Thêm</button>
                            </a>
                            <div className="col-lg-12 d-flex align-items-stretch">

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

export default VoucherView;