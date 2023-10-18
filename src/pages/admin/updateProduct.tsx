import { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { IProduct } from "../interface/product";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductsMutation,
} from "../../services/product.service";

type FieldType = {
  size?: number;
  id_product?: string;
  quantity?: number;
  color?: string;
};

const UpdateProduct = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData } = useGetProductByIdQuery(idProduct || "");
  const [updateProduct] = useUpdateProductsMutation();
  // const {mutate:updateProduct} = useUpdateProductsMutation();
  // const updateProduct = updateProductMutation();
  const navigate = useNavigate();
  const onFinish = (values: IProduct) => {
    updateProduct({ ...values, id: idProduct })
      .unwrap()
      .then(() => navigate("/admin/products"))
      .catch((error) => {
        console.error("Error in promise:", error);
      });
  };
  const [form] = Form.useForm();
  console.log(idProduct);
  console.log(productData);

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        size: productData.size,
        quantity: productData.quantity,
        id_product: productData.id_product,
        color: productData.color,
      });
    }
  }, [productData, form]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        form={form}
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
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "blue" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
