import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useGetBrandByIdQuery, useUpdateBrandMutation } from '../../../services/brand.service';
import { useParams } from 'react-router-dom';

type FieldType = {
    name?: string;
};

const CategoryEdit: React.FC = () => {
    const [form] = Form.useForm();
    const [updateBrand] = useUpdateBrandMutation();
    const [messageApi, contextHolder] = message.useMessage();
    // const navigate = useNavigate();
    const { idBrand } = useParams<{ idBrand: string }>();
    const { data: brandData } = useGetBrandByIdQuery(idBrand || "");

    useEffect(() => {
        form.setFieldsValue(brandData);

    }, [brandData]);
    const onFinish = (values: any) => {
        updateBrand({ ...values, _id: idBrand })
            .unwrap()
            .then(() =>
                messageApi.open({
                    type: "success",
                    content: "Cập nhật danh mục thành công",
                })
            );

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Cập nhật Danh Mục</h5>
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
                            label="Tên thương hiệu"
                            name="name"

                            rules={[{ required: true, message: 'Please input your name!' }, { min: 3, message: "ít nhất 3 ký tự" },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                            {/* <Button
                                type='primary'
                                danger
                                onClick={() => navigate("/admin/category")}
                                className='ml-2'
                            >Quay lại</Button> */}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CategoryEdit
