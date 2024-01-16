import React, { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Form, Input, Select, Button, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAddProductsDetailMutation } from "../../../services/productDetail.service";
import { useGetProductsQuery } from "../../../services/product.service";
import { IProducts } from "../../../types/product2";
const { Option } = Select;

type FormData = {
  size: number;
  quantity: number;
  color: string;
};

const ProductAdd = () => {
  const { id } = useParams();
  const [addProduct] = useAddProductsDetailMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const { data: productData, refetch: refetchProductData } = useGetProductsQuery();

  useEffect(() => {
    if (productData && id) {
      const selectedProduct = productData.find(
        (product: IProducts) => product._id === id
      );

      if (selectedProduct) {
        setValue("product_id", selectedProduct._id);
      }
    }
  }, [productData, id, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const response = await addProduct(values);
      if (response.data) {
        console.log("Sản phẩm đã được thêm thành công");

        notification.success({
          message: "Success",
          description: "Sản phẩm đã được thêm thành công!",
        });

        handleAdditionalTasks(response.data);
      }
      const productId = values.product_id;
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card custom-card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">
                Thêm Chi Tiết Sản Phẩm
              </h5>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="custom-form"
              >
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Tên
                  </label>
                  <select
                    className="form-select"
                    defaultValue={id}
                    disabled
                    {...register("product_id")}
                  >
                    {productData &&
                      productData.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="productSize" className="form-label">
                    Kích Cỡ
                  </label>
                  <input
                    type="number"
                    id="size"
                    {...register("size", { required: true, min: 1 })}
                    className={`form-control ${errors.size ? "is-invalid" : ""}`}
                  />
                  {errors.size && (
                    <div id="emailHelp" className="form-text text-danger">
                      {errors.size.type === "required"
                        ? "Vui lòng nhập giá trị."
                        : "Giá trị phải lớn hơn 0."}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="productColor" className="form-label">
                    Màu Sắc
                  </label>
                  <input
                    placeholder="*vui lòng nhập màu bằng tiếng anh và không sai chính tả, xin cảm ơn"
                    {...register("color", { required: true })}
                    className={`form-control ${errors.color ? "is-invalid" : ""}`}
                  />
                  {errors.color && (
                    <div id="emailHelp" className="form-text text-danger">
                      {errors.color.type === "required"
                        ? "Vui lòng nhập giá trị."
                        : "Giá trị phải lớn hơn 0."}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="productQuantity" className="form-label">
                    Số Lượng
                  </label>
                  <input
                    type="number"
                    {...register("quantity", { required: true, min: 0 })}
                    className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
                  />
                  {errors.quantity && (
                    <div id="emailHelp" className="form-text text-danger">
                      {errors.quantity.type === "required"
                        ? "Vui lòng nhập giá trị."
                        : "Giá trị phải lớn hơn 0."}
                    </div>
                  )}
                </div>



                <div className="mb-3">
                  <Button type="primary" htmlType="submit">
                    Thêm
                  </Button>
                  <Button type="reset" htmlType="reset" className="reset-button">
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
