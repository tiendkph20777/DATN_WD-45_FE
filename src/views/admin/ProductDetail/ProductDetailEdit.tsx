import { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select,notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductsMutation,
  useGetProductQuery
} from "../../../services/productDetail.service";
import { IProduct } from "../../../types/product";

type FieldType = {
  size?: number;
  id_product?: string;
  quantity?: number;
  color?: string;
};

const ProductProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productData } = useGetProductByIdQuery(id || "");
  const [updateProduct] = useUpdateProductsMutation();

  const navigate = useNavigate();
  const onFinish = (values: IProduct) => {
    console.log(values);

    updateProduct({ ...values, id: id })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Success",
          description: "Sửa Sản Phẩm Thành Công!",
        });
        navigate("/admin/product/detail");
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error in promise:", error);
      });
  };
  const [form] = Form.useForm();
  // console.log(idProduct);
  // console.log(productData);

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        _id: productData._id,
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
      <h1>Update Sản Phẩm</h1>
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
          label="id"
          name="_id"
        >
          <Input type="string" disabled />
        </Form.Item>

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
        >
          <Input disabled />
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

export default ProductProductEdit;
