import React, { useState } from 'react';
import { Button, Modal, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useFetchCheckoutQuery } from '../../../../services/checkout.service';
import OrderDetails from './OrderDetails';
import TopUserPurchase from '../../../../components/main/TopUserPurchase';
import { useFetchOneUserQuery } from '../../../../services/user.service';
import ProductSale from '../../home/homeProduct/ProductSale';
import CommentProduct from './CommentProduct';

const History: React.FC = () => {
    /////// modal
    const [open, setOpen] = useState(false);
    const [openCmt, setOpenCmt] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const showCmt = () => {
        setOpenCmt(true);
    };
    const hideCmt = () => {
        setOpenCmt(false);
    }
    ///////
    const { data: orderDa, isLoading } = useFetchCheckoutQuery()
    const [roleMane, setRoleMane] = useState<any>({});
    const [roleCmt, setRoleCmt] = useState<any>({});

    const handleEditClick = (id: string) => {
        const productToEdit = orderDa?.find((item) => item?._id === id);
        setRoleMane(productToEdit)
        showModal();
    };

    const handleCmtClick = (id: string) => {
        const productToCmt = orderDa?.find((item) => item?._id === id);
        setRoleCmt(productToCmt)
        showCmt();
    };
    const [searchFullName, setSearchFullName] = useState<string | undefined>(undefined);

    const handleFullNameSearchChange = (value: string) => {
        setSearchFullName(value.toLowerCase());
    };
    const nonSuccessfulOrder = orderDa?.map((order: any, index) => {
        const date = new Date(order?.dateCreate)?.toLocaleDateString('en-US');
        const datehis = new Date(order?.updatedAt)?.toLocaleDateString('en-US');
        const totals = order.products.reduce((acc: number, product: any) => acc + (product.total || 0), 0);
        return {
            ...order,
            index: index + 1,
            totals,
            date: date,
            datehis: datehis,
        };
    });
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const { data: usersOne } = useFetchOneUserQuery(idUs)

    const successfulOrders = nonSuccessfulOrder
        ?.filter((order) => order.user_id === usersOne?._id)
        ?.filter((order: any) => order.status === 'Giao hàng thành công')
        ?.filter((order) => !searchFullName || order.fullName.toLowerCase().includes(searchFullName))
        ?.sort((a, b) => new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime())
        ?.map((order, index) => ({ ...order, index: index + 1 }));

    if (isLoading) {
        return <div>
            <div className="right-wrapper">
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
            title: "Mã đơn hàng",
            dataIndex: "_id",
            key: "_id",
            render: (_id: any) => <span className="container">{_id}</span>,
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
            title: 'Ngày giao hàng',
            dataIndex: 'datehis',
            key: 'datehis',
            render: (datehis: any) => (
                <span className='container'>
                    {datehis}
                </span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    <Tag className='py-1' color='green'>
                        {status}
                    </Tag>
                </>
            ),
        },
        {
            title: "Xem chi tiết",
            dataIndex: '',
            key: 'action',
            render: (record: any) => (
                <span>
                    <Button type='primary' onClick={() => handleEditClick(record?._id)} >
                        Xem Chi Tiết
                    </Button>
                    {/* </Link> */}
                </span>
            ),
        },
        {
            title: "Đánh giá",
            dataIndex: '',
            key: 'action',
            render: (record: any) => (
                <span>
                    <Button type='primary' onClick={() => handleCmtClick(record?._id)} >
                        Đánh giá
                    </Button>
                    {/* </Link> */}
                </span>
            ),
        },
    ];

    return (
        <section className="our-team position-relative">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                        data-sidebar-position="fixed" data-header-position="fixed">
                        <TopUserPurchase />
                    </div>
                </div>
                <div>
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
                    <Modal
                        title="Đánh giá"
                        open={openCmt}
                        onOk={hideCmt}
                        onCancel={hideCmt}
                        okText="ok"
                        cancelText="cancel"
                        width={1000}
                        style={{ top: 20 }}
                    >
                        <CommentProduct roleCmt={roleCmt} />
                    </Modal>
                </div>
                <ProductSale />
            </div>
        </section>
    )
};

export default History;
