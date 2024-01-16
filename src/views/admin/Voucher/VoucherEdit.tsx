import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, message, notification } from 'antd';
import { useGetVoucherByIdQuery, useUpdateVoucherMutation } from '../../../services/voucher.service';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IVouchers } from "../../../types/voucher";
import { VerticalRightOutlined } from '@ant-design/icons';

type FieldType = {
    code?: string;
    value?: string;
    quantity?: number;
    date_start: Date;
    date_end: Date;
    status: boolean;
};

const VoucherEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [updateVoucher] = useUpdateVoucherMutation();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: voucherData } = useGetVoucherByIdQuery(id || "");
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue(voucherData);

    }, [voucherData]);
    const onFinish = (values: IVouchers) => {
        updateVoucher({ ...values, _id: id })
            .unwrap()
            .then(() => {

                navigate('/admin/voucher');
                notification.success({
                    message: 'Update Voucher Successful',
                    description: `Update Voucher thành công.`,
                    duration: 2,
                })
            })
            .catch(()=>{
                
                messageApi.open({
                    type: "warning",
                    content: "Ngày kết thúc phải sau ngày bắt đầu",
                })
            })
            window.location.reload();
            
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Cập nhật Voucher</h5>
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
                            rules={[{ required: true, message: 'Please input the Value!' },]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="date_start"
                            name="date_start"
                            rules={[{ required: true, message: "Please input the date Start" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="date_end"
                            name="date_end"
                            rules={[{ required: true, message: "Please input the date Start" }]}
                        >
                            <Input />
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
                                Cập nhật
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

export default VoucherEdit
