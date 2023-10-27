import React from 'react';
import { Button, Form, Input, message,DatePicker } from 'antd';
import { useAddVoucherMutation } from '../../../services/voucher.service';
import { useNavigate } from 'react-router-dom';
import { IVouchers } from "../../../types/voucher";


type FieldType = {
    code?: string;
    value?: string;
    quantity?: number;
    date_start: Date;
    date_end: Date;
    status: boolean;
};

const VoucherAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [addVoucher] = useAddVoucherMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = (values: IVouchers) => {
        addVoucher(values)
            .unwrap()
            .then(() =>
                messageApi.open({
                    type: "success",
                    content: "Thêm Voucher thành công",
                })
            );
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Thêm Voucher</h5>
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
                        <Form.Item<FieldType>
                            label="Mã giảm giá"
                            name="code"
                            rules={[{ required: true, message: 'Please input the code !' }, { min: 3, message: "ít nhất 3 ký tự" },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Value"
                            name="value"
                            rules={[{ required: true, message: 'Please input the Value!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="quantity"
                            name="quantity"
                            rules={[{ required: true, message: "Please input the quantity" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="date_start"
                            name="date_start"
                            rules={[{ required: true, message: "Please input the date Start" }]}
                        >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item
                            label="date_end"
                            name="date_end"
                            rules={[{ required: true, message: "Please input the date Start" }]}
                        >
                            <DatePicker />
                        </Form.Item>

                        {/* <Form.Item<FieldType>
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: "Please input the status" }]}
                        >
                            <Input />
                        </Form.Item> */}


                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button
                                type='primary'
                                danger
                                onClick={() => navigate("/admin/voucher")}
                                className='ml-2'
                            >Quay lại</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default VoucherAdd
