import React, { useState } from 'react'
import { useAddProductMutation } from '../../../services/product.service';
import {
    Button,
    Form,
    InputNumber,
    Select,
    Space,
    Input,
    notification,
} from 'antd';
import { useGetBrandsQuery } from '../../../services/brand.service';
import { IProducts } from '../../../types/product.service';
import axios from 'axios';
import { useNavigate } from 'react-router';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const ProductAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [addProduct] = useAddProductMutation();
    const [images, setImage] = useState("");
    // const [messageApi, contextHolder] = message.useMessage();
    const { data: categories } = useGetBrandsQuery();
    // const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const SubmitImage = async () => {
        const data = new FormData();
        const cloud_name = "ddbdu6zip";
        const upload_preset = "vithoang";
        data.append("file", images);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);
        data.append("folder", "portfolio");
        const takeData = await axios
            .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
            .then((data: any) => data);
        return takeData.data.secure_url;
    };

    const onFinish = async (product: IProducts) => {
        product.images = await SubmitImage();
        addProduct(product)
            .unwrap()
            .then(() => {
                notification.success({
                    message: "Success",
                    description: "Thêm Sản Phẩm Thành Công!",
                });
                navigate("/admin/product");
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
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
    const validateMessages = {
        required: "Không được bỏ trống!",
        types: {
            number: "Phải nhập vào là một số!",
        },
        number: {
            range: "Không là số âm",
        },
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Thêm Sản Phẩm</h5>
                    <Form
                        form={form}
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                            'color-picker': null,
                        }}
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}
                    >

                        <Form.Item
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

                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                { min: 3, message: "ít nhất 3 ký tự" },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item label="Giá niêm yết" name="price" rules={[
                            {
                                required: true,
                                type: 'number',
                                message: 'Phải nhập vào là 1 số',
                            },
                        ]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Giá bán"
                            name="price_sale"
                            rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    message: 'Phải nhập vào là 1 số',
                                },
                            ]}>

                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh"
                            name="images"
                            id="preview-image"
                            required
                            rules={[
                                { required: true, message: 'Vui lòng chọn ít nhất 1 ảnh!' },
                                { validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Please select an image!')) },
                            ]}
                            valuePropName="file"
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
                                <img src="" alt="" id="preview-image"></img>
                            </div>
                        </Form.Item>
                        {/* <Form.Item label="Nội dung" name="content">
                            <TextArea rows={4} />
                        </Form.Item> */}
                        <Form.Item
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
                                <Button type="primary" htmlType="submit" >
                                    Thêm
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