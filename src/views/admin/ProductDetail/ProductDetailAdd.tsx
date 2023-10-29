import { Button, Form, Input, notification,Select } from "antd";
import { IProductDetail } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import { useAddProductsDetailMutation } from "../../../services/productDetail.service";
import { useGetProductsQuery } from "../../../services/product.service";
import { IProducts } from "../../../types/product.service";


type FieldType = {
  name?: string;
  size?: number;
  product_id?: string;
  quantity?: number;
  color?: string;
};

const ProductAdd = () => {
  const [addProduct] = useAddProductsDetailMutation();
  const navigate = useNavigate();

  const { data:productData } = useGetProductsQuery()
  console.log(productData)

  const onFinish = (values: IProductDetail) => {
    
    values.product_id = values.product_id?.toString();
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
    <div >
      <h1 style={{paddingTop:"200px"}}>Thêm Sản Phẩm</h1>
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

        <Form.Item
          label="Name"
          name="product_id"
          // rules={[{ required: true, message: "Chọn Sản Phẩm" }]}
        >
          <Select placeholder="Chọn Sản Phẩm">
            {productData &&
              productData?.map((product:IProducts) => (
                <Option key={product._id} value={product._id}>
                  {product.name}
                  
                </Option>
              ))}
          </Select>
        </Form.Item>

        {/* <Form.Item
          label="product_id"
          name="product_id"
          rules={[{ required: true, message: "Nhập id Product" }]}
        >
          <Input />
        </Form.Item> */}


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
