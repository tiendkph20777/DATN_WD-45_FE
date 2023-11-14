import { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailByIdQuery,
  useUpdateProductsDetailMutation,
} from "../../../services/productDetail.service";
import { IProductDetail } from "../../../types/product";
import { useGetProductsQuery } from "../../../services/product.service";

type FieldType = {
  _id?: string;
  size?: number;
  product_id?: string;
  quantity?: number;
  color?: string;
};

const ProductProductEdit = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  // console.log(idProduct)
  const handleGoBack = () => {
    navigate(-1); 
  };

  const { data: productData } = useGetProductDetailByIdQuery(idProduct || "");
  const { data: productsData } = useGetProductsQuery();
  console.log(idProduct);
  console.log(productData);

  const [updateProduct] = useUpdateProductsDetailMutation();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        _id: productData?.productDetail._id,
        size: productData?.productDetail.size,
        quantity: productData?.productDetail.quantity,
        product_id: productData?.productDetail.product_id,
        color: productData?.productDetail.color,
      });
    }
  }, [productData, form]);

  const onFinish = (values: IProductDetail) => {
    console.log(values);

    updateProduct({ ...values, id: idProduct })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Success",
          description: "Sửa Chi Tiết Sản Phẩm Thành Công!",
        });
        const productId = values.product_id;
        navigate(`/admin/product/detail/${productId}`);
      })
      .catch((error) => {
        console.error("Error in promise:", error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 style={{ paddingTop: "100px" }}>Sửa Chi Tiết Sản Phẩm</h1>
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
        <Form.Item<FieldType> label="id" name="_id" style={{ display: "none" }}>
          <Input disabled />
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
        <Form.Item label="Tên sản Phẩm" name="product_id">
          <Select disabled placeholder="Chọn Sản Phẩm">
            {productsData &&
              productsData?.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.name}
                </Option>
              ))}
          </Select>
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
            Cập nhật
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleGoBack}
            className="ml-2"
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductProductEdit;
