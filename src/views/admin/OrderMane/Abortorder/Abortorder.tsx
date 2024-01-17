import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useFetchCheckoutQuery } from '../../../../services/checkout.service';
import OrderDetails from '../OrderDetails';

const Abortorder: React.FC = () => {
    /////// modal
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    ///////
    const { data: orderDa, isLoading } = useFetchCheckoutQuery()
    const [roleMane, setRoleMane] = useState<any>({});

    const handleEditClick = (id: string) => {
        const productToEdit = orderDa?.find((item) => item?._id === id);
        setRoleMane(productToEdit)
        showModal();
    };
    // console.log(roleMane)
    // bảng dữ liệu
    const [searchFullName, setSearchFullName] = useState<string | undefined>(undefined);
    const handleFullNameSearchChange = (value: string) => {
        setSearchFullName(value.toLowerCase());
    };

    const [searchID, setSearchID] = useState<string | undefined>(undefined);

    const handleIDSearchChange = (value: string) => {
        setSearchID(value.toLowerCase());
    };

    const nonSuccessfulOrder = orderDa?.map((order: any, index) => {
        const date = new Date(order?.dateCreate)?.toLocaleDateString('en-US');
        const datehis = new Date(order?.updatedAt)?.toLocaleDateString('en-US');
        const totals = order.products.reduce((acc: any, product: any) => acc + (product.total || 0), 0);
        return {
            ...order,
            index: index + 1,
            totals,
            date: date,
            datehis: datehis,
        };
    });
    const successfulOrders = nonSuccessfulOrder
        ?.filter((order: any) => order.status === 'Hủy đơn hàng')
        ?.filter((order) => !searchFullName || order.fullName.toLowerCase().includes(searchFullName))
        ?.filter((order) => !searchID || order._id.toLowerCase().includes(searchID))
        ?.sort((a, b) => new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime())
        ?.map((order, index) => ({ ...order, index: index + 1 }));

    // console.log(successfulOrders)
    if (isLoading) {
        return <div>
            <div className="right-wrapper" style={{ paddingTop: "100px" }}>
                <div className="spinnerIconWrapper">
                    <div className="spinnerIcon"></div>
                </div>
                <div className="finished-text">
                    Xin vui lòng chờ một chút 🥰🥰🥰
                </div>
            </div>
        </div>;
    }
    const columns: ColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            render: (_id) => <a>{_id}</a>,
        },
        {
            title: 'Tên người nhận',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tổng tiền đơn hàng',
            dataIndex: 'total',
            key: 'total',
            render: (_, { total }) => (
                <>
                    <Tag className='py-1' style={{ display: "flex", justifyContent: "center" }}>
                        {total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    <Tag className='py-1' color='red'>
                        {status}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Ngày mua hàng',
            dataIndex: 'date',
            key: 'date',
            render: (date: any) => (
                <span className='container'>
                    {date}
                </span>
            ),
        },
        {
            title: 'Ngày hủy hàng',
            dataIndex: 'datehis',
            key: 'datehis',
            render: (datehis: any) => (
                <span className='container'>
                    {datehis}
                </span>
            ),
        },
        {
            title: "Action",
            dataIndex: '',
            key: 'action',
            render: (record: any) => (
                <span>
                    <Button type='primary' onClick={() => handleEditClick(record?._id)} >
                        Xem Chi Tiết
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{ paddingTop: "70px" }}>
            <Input
                placeholder="Search by mã đơn hàng"
                style={{ width: 400, marginBottom: 16, marginLeft: 30 }}
                onChange={(e) => handleIDSearchChange(e.target.value)}
            />
            <Input
                placeholder="Search by full name"
                style={{ width: 400, marginBottom: 16, marginLeft: 30 }}
                onChange={(e) => handleFullNameSearchChange(e.target.value)}
            />
            <Table columns={columns} dataSource={successfulOrders} />
            <Modal
                title="Chi tiết đơn hàng"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                okText="ok"
                cancelText="cancel"
                width={1000}
                style={{ top: 20 }}
            >
                <OrderDetails roleMane={roleMane} />
            </Modal>
        </div>
    )
};

export default Abortorder;
