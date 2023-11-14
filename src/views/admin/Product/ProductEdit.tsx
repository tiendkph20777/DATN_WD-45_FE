import React, { useEffect, useState } from 'react'
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
    notification,
} from 'antd';
import { useGetBrandsQuery } from '../../../services/brand.service';

import { useNavigate, useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { IProducts } from '../../../types/product.service';

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
    description?: string;
    content?: string,
};
const ProductAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [updateProduct] = useUpdateProductMutation();
    const [, contextHolder] = message.useMessage();
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData } = useGetProductByIdQuery(idProduct || "");
    const [, setImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (productData) {
            form.setFieldsValue({
                _id: productData._id,
                name: productData.name,
                brand_id: productData.brand_id,
                price_sale: productData.price_sale,
                images: productData.images,
                price: productData.price,
                description: productData.description,
                content: productData.content,
            });
        }
    }, [productData, form]);
    console.log(productData)
    // const [brands, setBrands] = useState<any[]>([]);
    // const [brandId, setBrandId] = useState<number | string | undefined>(undefined);
    const { data: categories } = useGetBrandsQuery();

    const onFinish = (values: IProducts) => {
        updateProduct({ ...values, _id: idProduct })
            .unwrap()
            .then(() => {
                notification.success({
                    message: "Success",
                    description: "Sửa Sản Phẩm Thành Công!",
                });
                navigate("/admin/product");

            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // Preview image
    const inputFile: any = document.getElementById("file-input");
    const previewImage: any = document.getElementById("preview-image");

    inputFile?.addEventListener("change", function () {
        const file = inputFile.files[0];
        const reader = new FileReader();

        reader?.addEventListener("load", function () {
            previewImage.src = reader.result;
        });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            previewImage.src = "";
        }
    });
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
                            rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
                        >
                            <Select placeholder="Thương Hiệu">
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
                                { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                { min: 3, message: "ít nhất 3 ký tự" },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            name="price"
                            label="Giá niêm yết"
                            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                        >
                            <Form.Item name="price" noStyle>
                                <InputNumber min={1} max={16000000} />
                            </Form.Item>

                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Giá bán"
                            name="price_sale"
                            rules={[
                                { required: true, message: 'Vui lòng nhập giá bán sản phẩm!' },

                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh"
                            name="images"
                            valuePropName="file"
                            id="preview-image"
                        >
                            <div>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <i className="bx bx-image-add"></i>
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        onChange={(e: any) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <img src={productData?.images} alt="" id="preview-image"></img>
                            </div>
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Mô tả sản phẩm"
                            name="description"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mô tả sản phẩm!' },
                                { min: 3, message: "ít nhất 3 ký tự" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Nội dung" name="content" rules={[
                            { required: true, message: 'Vui lòng nhập nôi dung sản phẩm!' },

                        ]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                                <Button
                                    type='primary'
                                    danger
                                    onClick={() => navigate("/admin/product")}
                                    className='ml-2'
                                >Quay lại</Button>
                            </Space>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div >
    )
}

export default ProductAdd
