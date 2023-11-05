import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IPayment } from '../../../types/payment.service';
import { useAddPaymentMutation } from '../../../services/payment.service';

const PaymentAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [addPayment] = useAddPaymentMutation();
    // const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (payment: IPayment) => {

        addPayment(payment)
            .unwrap()
            .then(() => {
                notification.success({
                    message: "Success",
                    description: "Thêm payment Thành Công!",
                });
                navigate("/admin/paymnent");
            })
            .catch((error) => {
                console.error("Error adding payment:", error);
            });
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Thêm Payment</h5>
                    {/* {contextHolder} */}
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }, { min: 3, message: "ít nhất 3 ký tự" },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" >
                                Submit
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

export default PaymentAdd
