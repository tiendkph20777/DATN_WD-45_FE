import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPaymentByIdQuery, useUpdatePaymentMutation } from '../../../services/payment.service';

type FieldType = {
    name?: string;
};

const PaymentEdit: React.FC = () => {
    const [form] = Form.useForm();
    const [updatePayment] = useUpdatePaymentMutation();
    const [messageApi, contextHolder] = message.useMessage();
    // const navigate = useNavigate();
    const { idPayment } = useParams<{ idPayment: string }>();
    const { data: paymentData } = useGetPaymentByIdQuery(idPayment || "");

    const navigate = useNavigate();

    useEffect(() => {
        if (paymentData) {
            form.setFieldsValue({
                _id: paymentData._id,
                name: paymentData.name,

            });
        }

    }, [paymentData, form]);
    const onFinish = (values: any) => {
        updatePayment({ ...values, _id: idPayment })
            .unwrap()
            .then(() => {
                notification.success({
                    message: "Success",
                    description: "Sửa payment Thành Công!",
                });
                navigate("/admin/payment");
                window.location.reload()
            })
            .catch((error) => {
                console.error("Error adding payment:", error);
            });

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Cập nhật Payment</h5>
                    {contextHolder}
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}

                        autoComplete="off"
                    >
                        <Form.Item
                            label="Phương Thức Thanh Toán"
                            name="name"

                            rules={[{ required: true, message: 'Vui lòng nhập Phương Thức Thanh Toán!' }, { min: 3, message: "ít nhất 3 ký tự" },]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                            <Button
                                type='primary'
                                danger
                                onClick={() => navigate("/admin/payment")}
                                className='ml-2'
                            >Quay lại</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default PaymentEdit
