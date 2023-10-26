import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../services/product.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productDataProduct } = useGetProductByIdQuery(id || "");
  const { data: productDataProductDetail } = useGetAllProductsDetailQuery();

  // Lấy danh sách kích cỡ và màu sắc từ dữ liệu chi tiết sản phẩm
  const sizes = productDataProductDetail?.map((detail) => detail.size) || [];
  const colors = productDataProductDetail?.map((detail) => detail.color) || [];
  const quantity =
    productDataProductDetail?.map((detail) => detail.quantity) || [];

  // Sử dụng state để lưu trữ giá trị màu sắc được chọn và tên màu đã chọn
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState(""); // Thêm state cho tên màu

  // Hàm xử lý khi người dùng thay đổi màu sắc
  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setSelectedColor(selectedColor);

    // Tìm tên màu tương ứng với màu đã chọn
    const selectedColorDetail = productDataProductDetail?.find(
      (detail) => detail.color === selectedColor
    );
    if (selectedColorDetail) {
      setSelectedColorName(selectedColorDetail.colorName);
    }
  };

  return (
    <div>
      <div className="product_image_area">
        <div className="container">
          <div className="row s_product_inner">
            <div className="col-lg-5 offset-lg-1">
              <div className="single-prd-item">
                <img
                  className="img-fluid"
                  src={productDataProduct?.image}
                  alt="Product"
                />
              </div>
              <div className="image-carosell d-flex p-2">
                {/* Other product images */}
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="s_product_text">
                <h3>{productDataProduct?.name}</h3>
                <h2>
                  {productDataProduct?.price} <span>VND</span>
                </h2>
                <del>
                  <h4>
                    {productDataProduct?.price} <span>VND</span>
                  </h4>{" "}
                </del>
                <ul className="list">
                  <li>
                    <a className="active" href="#">
                      <span>Danh Mục</span> {productDataProduct?.category}
                    </a>
                  </li>
                  <li>
                    <i>Sự Kết Hợp Hoàn Hảo Giữa Thể Thao và Thời Trang</i>
                  </li>
                </ul>
                <p className="description-product">
                  {productDataProduct?.description}
                </p>
                <div className="product-detail d-flex">
                  <div className="product-size w-25">
                    <p>Kích Cỡ</p>
                    <select className="product-detail-size" name="" id="">
                      {sizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="product__filter-item w-75">
                    <p>Màu Sắc</p>
                    <select className="product-detail-size" name="" id="">
                      {colors.map((colors, index) => (
                        <option key={index} value={colors}>
                          {colors}
                        </option>
                      ))}
                    </select>
                    {selectedColorName && (
                      <span>Tên màu: {selectedColorName}</span>
                    )}
                  </div>
                </div>
                <div className="product_count">
                  <label className="quantity">Số Lượng:</label>
                  <input type="number" minLength={1} maxLength={999} />
                </div>
                <div className="product_count m-4">
                  <label className="quantity">Số lượng trong kho:</label>
                  <input
                    type="number"
                    disabled
                    value={productDataProduct?.quantity}
                    minLength={1}
                    maxLength={999}
                  />
                </div>
                <div className="card_area d-flex align-items-center">
                  <a className="primary-btn" href="#">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
