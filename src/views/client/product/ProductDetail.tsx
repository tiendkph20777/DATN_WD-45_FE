import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import {
  useGetAllProductsDetailQuery,
  useGetProductDetailByIdQuery,
} from "../../../services/productDetail.service";
const ProductDetail = () => {
  const { data: brandData } = useGetBrandsQuery();
  const { _id } = useParams();
  const { data: prodetailData } = useGetProductByIdQuery(_id);
  const brandName = brandData?.find(
    (brand: any) => brand._id == prodetailData?.brand_id
  )?.name;
  console.log(brandName);
  const { data: productDataDetail } = useGetAllProductsDetailQuery();
  const { data: productByIdDetail } = useGetProductDetailByIdQuery(_id);

  const sizes = productDataDetail?.map((detail) => detail.size) || [];
  const colors = productDataDetail?.map((detail) => detail.color) || [];

  // Sử dụng state để lưu trữ giá trị màu sắc được chọn và tên màu đã chọn
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState(""); // Thêm state cho tên màu

  // Hàm xử lý khi người dùng thay đổi màu sắc
  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setSelectedColor(selectedColor);

    // Tìm tên màu tương ứng với màu đã chọn
    const selectedColorDetail = productDataDetail?.find(
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
              {/* <div className="s_Product_carousel"> */}
              <div className="single-prd-item">
                <img
                  className="img-fluid w-[100px]"
                  src={prodetailData?.images[0]}
                  alt=""
                />
              </div>
              <div className="image-carosell d-flex p-2">
                {prodetailData?.images?.map((item: any) => {
                  return (
                    <div className="single-prd-item col-3 p-2">
                      <img className="img-fluid " src={item} alt="" />
                    </div>
                  );
                })}
              </div>
              {/* </div> */}
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="s_product_text">
                <h3>{prodetailData?.name}</h3>
                {prodetailData?.price_sale == 0 ? (
                  <div className="product-price row">
                    <strong className="col-12">
                      {prodetailData?.price}
                      <span>VND</span>
                    </strong>
                  </div>
                ) : (
                  <div className="product-price row">
                    <strong className="col-12">
                      {prodetailData?.price_sale}
                      <span>VND</span>
                    </strong>
                    <div className="d-flex">
                      <del className="price-del">
                        {prodetailData?.price}
                        <span>VND</span>
                      </del>
                    </div>
                  </div>
                )}

                <ul className="list">
                  <li>
                    <a className="active" href="#">
                      <span>Danh Mục</span> : {brandName}
                    </a>
                  </li>
                  <li>
                    {" "}
                    <i>{prodetailData?.content}</i>
                  </li>
                </ul>
                <p className="description-product">
                  {prodetailData?.description}
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
                  <input type="number" min="1" minLength={1} maxLength={999} />
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
