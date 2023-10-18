import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useAddBrandMutation } from '../../../services/brand.service';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    name?: string;
};

const CategoryAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [addBrand] = useAddBrandMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        addBrand(values)
            .unwrap()
            .then(() =>
                messageApi.open({
                    type: "success",
                    content: "Thêm danh mục thành công",
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
                    <h5 className="card-title fw-semibold mb-4">Thêm Danh Mục</h5>
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
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }, { min: 3, message: "ít nhất 3 ký tự" },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button
                                type='primary'
                                danger
                                onClick={() => navigate("/admin/category")}
                                className='ml-2'
                            >Quay lại</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CategoryAdd
