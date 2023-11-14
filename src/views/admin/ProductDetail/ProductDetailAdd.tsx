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
    <div className="navbar-collapse">
      <h1 style={{ paddingTop: "200px",color:"blue" }} className="text-center">Thêm Chi Tiết Sản Phẩm</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="timeline-badge-border rounded-sm rounded product-main"
      >

        <Form.Item label="Name" name="product_id" className="w-full" has>
          <Select placeholder="Chọn Sản Phẩm" defaultValue={id} >
            {productData &&
              productData?.map((product: IProducts) => (
                <Option key={product._id} value={product._id}>
                  {product.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: "Nhập Size Sản Phẩm" }]}
        >
          <Input type="number" className="bg-red-500" />
        </Form.Item>

        <Form.Item
          label="quantity"
          name="quantity"
          rules={[{ required: true, message: "Nhập Số Lượng Sản Phẩm" }]}
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
            Thêm
          </Button>
          <Button htmlType="reset">reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
