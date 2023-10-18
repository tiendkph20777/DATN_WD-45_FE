import React, { useEffect } from 'react'
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../services/product.service';
// import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    InputNumber,
    Select,
    Space,
    Input,
    message,
} from 'antd';
import { useGetBrandsQuery } from '../../../services/brand.service';

import { useParams } from 'react-router-dom';

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

type FieldType = {
    name?: string;
    brand_id?: string;
    price_sale?: number | string;
    images?: string;
    price?: number;
};
const ProductAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [updateProduct] = useUpdateProductMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData } = useGetProductByIdQuery(idProduct || "");

    useEffect(() => {
        form.setFieldsValue(productData);

    }, [productData]);
    // const [brands, setBrands] = useState<any[]>([]);
    // const [brandId, setBrandId] = useState<number | string | undefined>(undefined);
    const { data: categories } = useGetBrandsQuery();

    const onFinish = (values: any) => {
        updateProduct({ ...values, _id: idProduct })
            .unwrap()
            .then(() =>
                messageApi.open({
                    type: 'success',
                    content: 'Cập nhật sản phẩm thành công',
                })
            );

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Thêm Sản Phẩm</h5>
                    {contextHolder}
                    <Form
                        form={form}
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                            'color-picker': null,
                        }}
                        style={{ maxWidth: 600 }}
                        autoComplete="off"
                    >

                        <Form.Item<FieldType>
                            label="Category"
                            name="brand_id"
                            rules={[{ required: true, message: 'Please select a category!' }]}
                        >
                            <Select placeholder="Select a category">
                                {categories?.map((category) => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                { required: true, message: 'Please input your product!' },
                                { min: 3, message: "ít nhất 3 ký tự" },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            name="price"
                            label="Giá"
                            rules={[{ required: true, message: 'Please select your price!' }]}
                        >
                            <Form.Item name="price" noStyle>
                                <InputNumber min={1} max={16000000} />
                            </Form.Item>

                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Mã giảm giá"
                            name="price_sale"
                            rules={[
                                { required: true, message: 'Please input your product!' },

                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="images"
                            rules={[
                                { required: true, message: 'Please input your image!' },
                                {
                                    validator: (_, value) => {
                                        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                                        if (urlRegex.test(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Image must be a valid URL.');
                                    }
                                }
                            ]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                                <Button htmlType="reset">reset</Button>
                            </Space>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div >
    )
}

export default ProductAdd
