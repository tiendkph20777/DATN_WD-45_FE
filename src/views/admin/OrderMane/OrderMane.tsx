import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Select, Table, Tag, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useFetchCheckoutQuery, useUpdateCheckoutMutation } from '../../../services/checkout.service';
import OrderDetails from './OrderDetails';
import { message as messageApi } from 'antd';

const OrderMane: React.FC = () => {
    /////// modal chi tiết
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    // model hủy hàng
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    ///////
    const { data: orderDa, isLoading, isFetching } = useFetchCheckoutQuery()
    const [updateCheck] = useUpdateCheckoutMutation()
    const [roleMane, setRoleMane] = useState<any>({});
    const [searchResult, setSearchResult] = useState<any>([]);

    const handleEditClick = (id: string) => {
        const productToEdit = orderDa?.find((item) => item?._id === id);
        setRoleMane(productToEdit)
        showModal();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    // console.log(orderDa)

    const [searchFullName, setSearchFullName] = useState<string | undefined>(undefined);

    const handleFullNameSearchChange = (value: string) => {
        setSearchFullName(value.toLowerCase());
    };
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
    // console.log(searchResult)
    // console.log(nonSuccessfulOrder);
    const onSearch = (value: string) => {
        if (value === "") {
            setSearchResult(nonSuccessfulOrders);
        } else {
            let filteredData = nonSuccessfulOrders;
            filteredData = filteredData?.filter((item: any) => {
                // console.log(item?.status)
                return (
                    item?.status === value
                );
            }
            );
            if (filteredData?.length == 0) {
                messageApi.error({
                    type: 'error',
                    content: "Không có đơn hàng nào trạng thái này",
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "15px",
                        lineHeight: "50px"
                    },
                });
            }
            setSearchResult(filteredData);
        }
    };
    // console.log(searchResult)

    const nonSuccessfulOrders = nonSuccessfulOrder
        ?.filter((order: any) => order.status !== 'Giao hàng thành công' && order.status !== 'Hủy đơn hàng')
        ?.filter((order) => !searchFullName || order.fullName.toLowerCase().includes(searchFullName))
        ?.map((order, index) => ({ ...order, index: index + 1 }));

    const onFinish = async (values: any, id: string) => {
        try {
            const updatedData = {
                _id: id,
                status: values.status,
            };
            if (values.status === 'Giao hàng thành công') {
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
            } else if (values.status === 'Hủy đơn hàng') {
                setIsModalOpen(true);
                // await updateCheck(updatedData).unwrap();
            } else {
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
    if (isLoading) {
        return <div>Loading...</div>;
    }
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
                                    <Select placeholder="Select province" style={{ width: "250px" }}>
                                        {/* <Select.Option value="Đang xác nhận đơn hàng">{status}</Select.Option> */}
                                        <Select.Option value="Đang xác nhận đơn hàng">Đang xác nhận đơn hàng</Select.Option>
                                        <Select.Option value="Tiếp nhận đơn hàng">Tiếp nhận đơn hàng</Select.Option>
                                        <Select.Option value="Đã giao cho đơn vị vận chuyển">Đã giao cho đơn vị vận chuyển</Select.Option>
                                        <Select.Option value="Đang giao hàng">Đang giao hàng</Select.Option>
                                        <Select.Option value="" disabled > </Select.Option>
                                        <Select.Option value="Giao hàng thành công">Giao hàng thành công</Select.Option>
                                        <Select.Option value="" disabled > </Select.Option>
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
            dataIndex: 'date',
            key: 'date',
            render: (date: any) => (
                <span className='container'>
                    {date}
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
            <Select
                style={{ width: 300, margin: 16 }}
                placeholder="Chọn trạng thái"
                onChange={onSearch}
                options={[
                    { value: "", label: "All" },
                    { value: "Đang xác nhận đơn hàng", label: "Đang xác nhận đơn hàng" },
                    { value: "Tiếp nhận đơn hàng", label: "Tiếp nhận đơn hàng" },
                    { value: "Đã giao cho đơn vị vận chuyển", label: "Đã giao cho đơn vị vận chuyển" },
                    { value: "Đang giao hàng", label: "Đang giao hàng" },
                ]} />
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
            {/* modal hủy hàng */}
            <Modal title="Lý do hủy đơn hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="nest-messages"
                    // onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name={['user', 'introduction']}>
                        <Input.TextArea rows={6} placeholder='Nhập lý do hủy đơn hàng ...' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};

export default OrderMane;
