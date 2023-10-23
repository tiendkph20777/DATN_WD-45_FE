import { Button, Form, Input, notification } from "antd";
import { IProduct } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import { useAddProductsMutation } from "../../../services/productDetail.service";


type FieldType = {
  name?: string;
  size?: number;
  id_product?: string;
  quantity?: number;
  color?: string;
};

const ProductAdd = () => {
  const [addProduct] = useAddProductsMutation();
  const navigate = useNavigate();

  const onFinish = (values: IProduct) => {
    addProduct(values)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Success",
          description: "Thêm Sản Phẩm Thành Công!",
        });
        navigate("/admin/product/detail");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Add Sản Phẩm</h1>
      <Form
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
          label="Size"
          name="size"
          rules={[{ required: true, message: "Nhập Size Sản Phẩm" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="quantity"
          name="quantity"
          rules={[{ required: true, message: "Nhập Số Lượng Sản Phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="id_product"
          name="id_product"
          rules={[{ required: true, message: "Nhập id Product" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Nhập màu sản phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: "blue" }}>
            Add New Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
