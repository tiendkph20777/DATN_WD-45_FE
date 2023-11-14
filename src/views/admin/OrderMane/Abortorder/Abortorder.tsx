import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useFetchCheckoutQuery } from '../../../../services/checkout.service';
import { useGetAllProductsDetailQuery } from '../../../../services/productDetail.service';
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
    const { data: orderDa } = useFetchCheckoutQuery()
    const { data: proDetail } = useGetAllProductsDetailQuery()
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
    const nonSuccessfulOrder = orderDa?.map((order, index) => {
        const totals = order.products.reduce((acc: any, product: any) => acc + (product.total || 0), 0);
        return {
            ...order,
            index: index + 1,
            totals,
        };
    });
    const successfulOrders = nonSuccessfulOrder
        ?.filter((order: any) => order.status === 'Hủy đơn hàng')
        ?.filter((order) => !searchFullName || order.fullName.toLowerCase().includes(searchFullName))
        ?.map((order, index) => ({ ...order, index: index + 1 }));
    // console.log(successfulOrders)

    const columns: ColumnsType<any> = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tên người nhận',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tổng tiền đơn hàng',
            dataIndex: 'totals',
            key: 'totals',
            render: (_, { totals }) => (
                <>
                    <Tag className='py-1' style={{ display: "flex", justifyContent: "center" }}>
                        {totals?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
            dataIndex: 'dateCreate',
            key: 'dateCreate',
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
