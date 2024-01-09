import React, { useState } from 'react';
import { Button, Form, Modal, Table, Tag, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useFetchCheckoutQuery, useUpdateCheckoutMutation } from '../../../../services/checkout.service';
import OrderDetails from './OrderDetails';
import TopUserPurchase from '../../../../components/main/TopUserPurchase';
import { useFetchOneUserQuery } from '../../../../services/user.service';
import ProductSale from '../../home/homeProduct/ProductSale';

const Purchase: React.FC = () => {
    /////// modal chi tiết
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    ///////
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const { data: usersOne } = useFetchOneUserQuery(idUs)

    const { data: orderDa, isLoading, isFetching } = useFetchCheckoutQuery()
    const [roleMane, setRoleMane] = useState<any>({});
    const [searchResult, setSearchResult] = useState<any>([]);

    const handleEditClick = (id: string) => {
        const productToEdit = orderDa?.find((item) => item?._id === id);
        setRoleMane(productToEdit)
        showModal();
    };

    const [searchFullName, setSearchFullName] = useState<string | undefined>(undefined);

    // const handleFullNameSearchChange = (value: string) => {
    //     setSearchFullName(value.toLowerCase());
    // };
    // console.log(dateCreateArray);

    const nonSuccessfulOrder = orderDa?.map((order: any, index: number) => {
        const date = new Date(order?.dateCreate)?.toLocaleDateString('en-US');
        const totals = order.products.reduce((acc: number, product: any) => acc + (product.total || 0), 0);
        return {
            ...order,
            index: index + 1,
            date: date,
            totals,
        };
    });

    const nonSuccessfulOrders = nonSuccessfulOrder
        ?.filter((order) => order.user_id === usersOne?._id)
        ?.filter((order: any) => order.status === 'Tiếp nhận đơn hàng')
        ?.filter((order) => !searchFullName || order.fullName.toLowerCase().includes(searchFullName))
        ?.sort((a, b) => new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime())
        ?.map((order, index) => ({ ...order, index: index + 1 }));

    // bảng dữ liệu
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
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, { status, _id }) => (
                <>
                    <Form
                        name="complex-form"
                        onFinish={(values) => onFinish(values, _id)}
                        initialValues={{ status: status }}
                        style={{ display: "flex", justifyContent: "right" }}
                    >
                        <Form.Item label="">
                            <Space.Compact>
                                <Form.Item
                                    name={'status'}
                                    noStyle
                                    rules={[{ required: true, message: 'Province is required' }]}
                                >
                                    <Input placeholder="Enter status" style={{ width: "250px" }} readOnly />
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>

                    </Form>
                </>
            ),
        },

        {
            title: "Xem chi tiết",
            dataIndex: '',
            key: 'action',
            render: (record: any) => (
                <span>
                    <Button
                        type='primary'
                        onClick={() => handleEditClick(record?._id)} >
                        Chi Tiết
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
                    <Table columns={columns} dataSource={searchResult.length > 0 ? searchResult : nonSuccessfulOrders} />
                    {/* modal chi tiết hàng */}
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
                <ProductSale />
            </div>
        </section>

    )
};

export default Purchase;
