import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useAddBrandMutation } from '../../../services/brand.service';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IBrands } from '../../../types/brand';

const CategoryAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [addBrand] = useAddBrandMutation();
    // const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [images, setImage] = useState("");

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
    const onFinish = async (brand: IBrands) => {
        brand.image = await SubmitImage();
        addBrand(brand)
            .unwrap()
            .then(() => {
                notification.success({
                    message: "Success",
                    description: "Thêm Thương Hiệu Thành Công!",
                });
                navigate("/admin/category");
            })
            .catch((error) => {
                console.error("Error adding brand:", error);
            });
    };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };
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
                    <h5 className="card-title add-new p-4 border-1 fw-semibold mb-4">Thêm Danh Mục</h5>
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
                            label="Tên Thương Hiệu"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên Thương Hiệu!' }, { min: 3, message: "ít nhất 3 ký tự" },]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ảnh"
                            name="image"
                            required
                            rules={[
                                { required: true, message: 'Vui lòng chọn 1 ảnh!' },
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

                        <Form.Item
                            label="Mô tả thương hiệu"
                            name="description"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mô tả!' },
                                { min: 3, message: "ít nhất 3 ký tự" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" >
                                Thêm
                            </Button>
                            <Button htmlType="reset">Xóa Nội Dung</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CategoryAdd
