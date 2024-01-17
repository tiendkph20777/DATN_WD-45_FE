import { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldType>();
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card custom-card">
            <div className="card-body">
              <h1 className="card-title fw-semibold mb-4 text-center">
                Sửa Chi Tiết Sản Phẩm
              </h1>
              <Form
                name="basic"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="id"
                  name="_id"
                  style={{ display: "none" }}
                >
                  <Input disabled />
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
                <Form.Item<FieldType> name="size" label="Size">

                  <input
                    type="number"
                    className={`form-control ${errors.size ? "is-invalid" : ""
                      }`}
                  />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity" rules={[]}>
                  <input
                    type="number"
                    className={`form-control ${errors.quantity ? "is-invalid" : ""
                      }`}
                  />
                </Form.Item>

                <Form.Item label="Color" name="color">
                  <input
                    type="text"
                    className={`form-control ${errors.color ? "is-invalid" : ""
                      }`}
                  />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductProductEdit;
