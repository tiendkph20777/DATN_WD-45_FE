import React, { useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../services/product.service";
import { Button, Form, Select, Space, notification, List } from "antd";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

type FieldType = {
  name?: string;
  brand_id?: string;
  price_sale?: number | string;
  price?: number;
  description?: string;
  content?: string;
};

const ProductEdit: React.FC = () => {
  const [form] = Form.useForm();
  const [updateProduct] = useUpdateProductMutation();
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData } = useGetProductByIdQuery(idProduct || "");
  const [, setImage] = useState("");
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState<string[]>(
    productData?.images || []
  );

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        _id: productData._id,
        name: productData.name,
        brand_id: productData.brand_id,
        price_sale: productData.price_sale,
        price: productData.price,
        description: productData.description,
        content: productData.content,
      });

      // Set selected images
      setSelectedImages(productData.images || []);
    }
  }, [productData, form]);

  const onFinish = async (values: FieldType) => {
    try {
      // Update product with selected images
      const updatedValues = { ...values, images: selectedImages };
      await updateProduct({ ...updatedValues, _id: idProduct }).unwrap();

      notification.success({
        message: "Success",
        description: "Sửa Sản Phẩm Thành Công!",
      });

      navigate("/admin/product");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card custom-card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">Sửa Sản Phẩm</h5>
              <Form
                form={form}
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item label="Category" name="brand_id">
                  <Select placeholder="Thương Hiệu">
                    {useGetBrandsQuery()?.data?.map((category) => (
                      <Option key={category._id} value={category._id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
                  <input type="text" className={`form-control`} />
                </Form.Item>

                <Form.Item label="Giá niêm yết" name="price" rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}>
                  <input type="number" className={`form-control`} />
                </Form.Item>

                <Form.Item label="Giá bán" name="price_sale" rules={[{ required: true, message: "Vui lòng nhập giá bán sản phẩm!" }]}>
                  <input type="number" className={`form-control`} />
                </Form.Item>

                <Form.Item label="Ảnh" name="images" valuePropName="file" id="preview-image">
                  <div>
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <i className="bx bx-image-add"></i>
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        onChange={(e: any) => {
                          handleImageChange(e);
                          setImage(e.target.files[0]);
                        }}
                        multiple
                      />
                    </div>
                    <List
                      grid={{ gutter: 16, column: 4 }}
                      dataSource={selectedImages}
                      renderItem={(item, index) => (
                        <List.Item>
                          <div className="selected-image">
                            <img src={item} alt={`Selected ${index + 1}`}  style={{width:"10px", height:"10px"}} className=""/>
                            <Button type="text" danger onClick={() => handleRemoveImage(index)}>
                              Remove
                            </Button>
                          </div>
                        </List.Item>
                      )}
                    />
                  </div>
                </Form.Item>

                <Form.Item label="Mô tả sản phẩm" name="description" rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}>
                  <input type="text" className={`form-control`} />
                </Form.Item>

                <Form.Item label="Nội dung" name="content" rules={[{ required: true, message: "Vui lòng nhập nôi dung sản phẩm!" }]}>
                  <input type="textarea" className={`form-control`} />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                    <Button type="primary" danger onClick={() => navigate("/admin/product")} className="ml-2">
                      Quay lại
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
