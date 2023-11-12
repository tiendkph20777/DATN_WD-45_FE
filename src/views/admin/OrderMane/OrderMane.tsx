import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Select, Table, Tag, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useFetchCheckoutQuery, useUpdateCheckoutMutation } from '../../../services/checkout.service';
import OrderDetails from './OrderDetails';
import { message as messageApi } from 'antd';
import unorm from 'unorm';


const OrderMane: React.FC = () => {
    /////// modal
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    ///////
    const { data: orderDa, isLoading, isFetching } = useFetchCheckoutQuery()
    const [updateCheck] = useUpdateCheckoutMutation()
    const [roleMane, setRoleMane] = useState<any>({});

    const handleEditClick = (id: string) => {
        const productToEdit = orderDa?.find((item) => item?._id === id);
        setRoleMane(productToEdit)
        showModal();
    };

    const [searchFullName, setSearchFullName] = useState<string | undefined>(undefined);

    const handleFullNameSearchChange = (value: string) => {
        setSearchFullName(value.toLowerCase());
    };

    const nonSuccessfulOrders = orderDa
        ?.filter((order: any) => order.status !== 'Giao hàng thành công' && order.status !== 'Hủy đơn hàng')
        ?.filter((order) => !searchFullName || order.fullName.toLowerCase().includes(searchFullName))
        ?.map((order, index) => ({ ...order, index: index + 1 }));


    const onFinish = async (values: any, id: string) => {
        try {
            if (values.status === 'Giao hàng thành công') {
                const updatedData = {
                    _id: id,
                    status: values.status,
                };
                messageApi.success({
                    type: 'success',
                    content: "Đơn hàng đã được giao thành công 🎉🎉🎉",
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "15px",
                        lineHeight: "50px"
                    },
                });
                await updateCheck(updatedData).unwrap();
            } else {
                const updatedData = {
                    _id: id,
                    status: values.status,
                };
                messageApi.success({
                    type: 'error',
                    content: "Cập nhật trạng thái đơn hàng thành công 🎉🎉🎉",
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "15px",
                        lineHeight: "50px"
                    },
                });
                await updateCheck(updatedData).unwrap();
            }
            hideModal();
        } catch (error) {
            console.error("Error updating checkout status:", error);
        }
    };
    // bảng dữ liệu
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
            align: 'center',
            render: (_, { status, _id }) => (
                <>
                    <Form
                        name="complex-form"
                        // onFinish={onFinish}
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
                                    <Select placeholder="Select province" style={{ width: "250px" }}>
                                        <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
                                        <Select.Option value="Tiếp nhận đơn hàng">Tiếp nhận đơn hàng</Select.Option>
                                        <Select.Option value="Đã giao cho đơn vị vận chuyển">Đã giao cho đơn vị vận chuyển</Select.Option>
                                        <Select.Option value="Đang giao hàng">Đang giao hàng</Select.Option>
                                        <Select.Option value="Giao hàng thành công">Giao hàng thành công</Select.Option>
                                        <Select.Option value="Hủy đơn hàng">Hủy đơn hàng</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
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
                    {/* </Link> */}
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

            <Table columns={columns} dataSource={nonSuccessfulOrders} />
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

export default OrderMane;
