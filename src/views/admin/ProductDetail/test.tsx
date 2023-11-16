import React, { useEffect } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAddProductsDetailMutation } from "../../../services/productDetail.service";
import { useGetProductsQuery } from "../../../services/product.service";
import { IProducts } from "../../../types/product.service";
const { Option } = Select;

type FieldType = {
  name?: string;
  size?: number;
  product_id?: string;
  quantity?: number;
  color?: string;
};

const ProductAdd = () => {
  const { id } = useParams();
  const [addProduct] = useAddProductsDetailMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: productData, refetch: refetchProductData } =
    useGetProductsQuery();

  useEffect(() => {
    if (productData && id) {
      const selectedProduct = productData.find(
        (product: IProducts) => product._id === id
      );

      if (selectedProduct) {
        form.setFieldsValue({ product_id: selectedProduct._id });
      }
    }
  }, [productData, id, form]);

  const onFinish = async (values) => {
    try {
      const response = await addProduct(values);

      if (response.data) {
        console.log("Sản phẩm đã được thêm thành công");

        form.resetFields();

        notification.success({
          message: "Success",
          description: "Sản phẩm đã được thêm thành công!",
        });

        handleAdditionalTasks(response.data);
      }
      const productId = values.product_id;
      // console.log('New product ID:', productId);
      navigate(`/admin/product/detail/${productId}`);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm", error);
      notification.error({
        message: "Error",
        description: "Thêm sản phẩm không thành công. Vui lòng thử lại!",
      });
    }
  };

  const handleAdditionalTasks = (productData) => {
    console.log(
      "Thực hiện các tác vụ bổ sung với dữ liệu sản phẩm",
      productData
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container mt-5 custom-container">
      <div className="text-center">
        <h1 className="page-title">Thêm Chi Tiết Sản Phẩm</h1>
      </div>
      <div className="form-container mt-3">
        <div className="col-md-6 offset-md-3">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="custom-form"
          >
            <Form.Item label="Tên" name="product_id">
              <Select
                className=""
                placeholder="Chọn Sản Phẩm"
                defaultValue={id}
              >
                {productData &&
                  productData.map((product) => (
                    <Select.Option key={product._id} value={product._id}>
                      {product.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Size"
              name="size"
              rules={[{ required: true, message: "Nhập Size Sản Phẩm" }]}
            >
              <Input type="number" className="form-control" />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Nhập Số Lượng Sản Phẩm" }]}
            >
              <Input type="number" className="form-control" />
            </Form.Item>

            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: "Nhập màu sản phẩm" }]}
            >
              <Input className="form-control" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
              <Button htmlType="reset" className="reset-button">
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
