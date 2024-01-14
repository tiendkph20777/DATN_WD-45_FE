import React, { useState } from "react";
import { useAddProductMutation } from "../../../services/product.service";
import { Button, Form, Input, notification, Upload } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { IProducts } from "../../../types/product2";
import axios from "axios";
import { useNavigate } from "react-router";

const ProductAdd: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProducts>();

  const [fileList, setFileList] = useState<any[]>([]);
  const [addProduct] = useAddProductMutation();
  const { data: categories } = useGetBrandsQuery();
  const navigate = useNavigate();

  const SubmitImage = async () => {
    const uploadPromises = fileList.map(async (file) => {
      const data = new FormData();
      const cloud_name = "ddbdu6zip";
      const upload_preset = "vithoang";
      data.append("file", file.originFileObj);
      data.append("upload_preset", upload_preset);
      data.append("cloud_name", cloud_name);
      data.append("folder", "portfolio");

      const takeData = await axios
        .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
        .then((data: any) => data);

      return takeData.data.secure_url;
    });

    return Promise.all(uploadPromises);
  };

  const onSubmit: SubmitHandler<IProducts> = async (product) => {
    try {
      const fileUrls = await SubmitImage();
      product.images = fileUrls;

      const newProduct = await addProduct(product);
      const idPro = newProduct.data._id;

      notification.success({
        message: "Success",
        description: "Thêm Sản Phẩm Thành Công!",
      });
      notification.warning({
        message: "Success",
        description: "Thêm Sản Phẩm Thành Công!",
      });

      navigate(`/admin/product/detail/add/${idPro}`);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  const onFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleReset = () => {
    setFileList([]);
    setValue("brand_id", ""); // Đặt giá trị mặc định cho select
    form.resetFields(); // Đặt lại tất cả các trường trong form
  };


  const validateSalePrice = (value) => {
    const priceValue = parseFloat(document.getElementById('productPrice').value);

    // Kiểm tra nếu giá giảm là rỗng thì không thực hiện kiểm tra
    if (value.trim() === '') {
      return true;
    }

    const salePriceValue = parseFloat(value);

    if (isNaN(priceValue) || isNaN(salePriceValue)) {
      return "Vui lòng nhập số hợp lệ";
    }

    if (salePriceValue < 0 || priceValue < 0) {
      return "Giá không được âm";
    }

    if (salePriceValue >= priceValue) {
      return "Giá giảm phải nhỏ hơn giá bán";
    }

    return true;
  };



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-uppercase add-new p-4 border-1 fw-semibold mb-4">Thêm Sản Phẩm</h5>
              <Form onFinish={handleSubmit(onSubmit)} className="row custom-form">
                
                <div className="mb-3 col-md-8 col-sm-12">
                  <label htmlFor="productName" className="form-label">
                    Tên sản phẩm
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""
                      }`}
                    id="productName"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">Không được bỏ trống!</div>
                  )}
                </div>
                <div className="mb-3 col-md-4 col-sm-12">
                  <label htmlFor="productCategory" className="form-label">
                    Thương Hiệu
                  </label>
                  <select
                    {...register("brand_id", { required: true })}
                    className={`form-select ${errors.brand_id ? "is-invalid" : ""
                      }`}
                    required
                  >
                    <option disabled selected value="">
                      [Chọn thương hiệu]
                    </option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.brand_id && (
                    <div className="invalid-feedback">Không được bỏ trống!</div>
                  )}
                </div>
                <div className="mb-3 col-md-6 col-sm-12">
                  <label htmlFor="productPrice" className="form-label">
                    Giá bán
                  </label>
                  <input
                    {...register("price", {
                      required: "Không được bỏ trống!",
                      min: {
                        value: 1000,
                        message: "Giá tối thiểu là 1000!"
                      },
                      pattern: {
                        value: /^[1-9][0-9]*$/, // Pattern để ngăn số âm
                        message: "Không được nhập số âm!"
                      }
                    })}
                    type="number"
                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                    id="productPrice"
                  />
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price.message}</div>
                  )}
                </div>
                <div className="mb-3 col-md-6 col-sm-12">
                  <label htmlFor="productPriceSale" className="form-label">
                    Giá bán sau khi giảm giá
                  </label>
                  <input
                    {...register("price_sale", {
                      validate: validateSalePrice
                    })}
                    type="number"
                    //                     className={`form-control ${errors.price_sale ? "" : ""
                    //                       }`}
                    //                     id="productPrice"
                    value={0}
                    className={`form-control ${errors.price_sale ? "is-invalid" : ""}`}
                    id="productPriceSale"
                  />
                  {errors.price_sale && (
                    <div className="invalid-feedback">{errors.price_sale.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">
                    Ảnh sản phẩm
                  </label>
                  <Upload
                    customRequest={() => { }}
                    onChange={onFileChange}
                    fileList={fileList}
                    listType="picture"
                    beforeUpload={() => false} // Always return true to allow uploading
                    multiple // Enable multiple file selection
                  >
                    <Button>Chọn ảnh</Button>
                  </Upload>
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    id="productDescription"
                    cols={30}
                    rows={5}
                    className={`w-100 form-control p-2 ${errors.description ? "is-invalid" : ""
                      }`}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">Không được bỏ trống!</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="productContent" className="form-label">
                    Nội dung sản phẩm
                  </label>
                  <textarea
                    {...register("content", { required: true })}
                    id="productContent"
                    cols={30}
                    rows={5}
                    className={`w-100 form-control p-2 ${errors.content ? "is-invalid" : ""
                      }`}
                  />
                  {errors.content && (
                    <div className="invalid-feedback">Không được bỏ trống!</div>
                  )}
                </div>
                <div className="mb-3">
                  <Button type="primary" htmlType="submit">
                    Thêm
                  </Button>
                  <Button type="default" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
