import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import { IProducts } from "../../../types/product.service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageZoom from "react-image-zoom";


const ProductDetail = () => {
  const { data: productData } = useGetProductsQuery();
  const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
  useEffect(() => {
    if (productData) {
      const updatedDataSource = productData.map((product) => ({
        ...product,
      }));
      setDataSourceToRender(updatedDataSource);
    }
  }, [productData]);
  const { data: brandData } = useGetBrandsQuery();
  const { _id } = useParams();
  const { data: prodetailData } = useGetProductByIdQuery(_id);
  const { handleSubmit, register } = useForm<any>();

  const brandName = brandData?.find(
    (brand) => brand._id === prodetailData?.brand_id
  )?.name;
  const { data: productDataDetail } = useGetAllProductsDetailQuery();

  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showColors, setShowColors] = useState(false);
  const [colorsForSelectedSize, setColorsForSelectedSize] = useState([]);
  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [mainImage, setMainImage] = useState(prodetailData?.images[0]);

  useEffect(() => {
    if (selectedSize) {
      const filteredColors = productDataDetail
        .filter((detail) => detail.size === selectedSize)
        .map((detail) => detail.color);
      setColorsForSelectedSize(filteredColors);
      setShowColors(true);
    }
  }, [selectedSize, productDataDetail]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    if (productData && prodetailData && productDataDetail) {
      const productDetailsForCurrentProduct = productDataDetail.filter(
        (detail) => detail.product_id === prodetailData._id
      );

      const sizesForCurrentProduct = productDetailsForCurrentProduct.map(
        (detail) => detail.size
      );

      const uniqueSizes = Array.from(new Set(sizesForCurrentProduct));

      setProductSizes(uniqueSizes);
    }
  }, [productData, prodetailData, productDataDetail]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedColor("");
    setSelectedColorName("");
    setHasSelectedColor(false);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const selectedColorDetail = productDataDetail?.find(
      (detail) => detail.color === color && detail.size === selectedSize
    );
    if (selectedColorDetail) {
      setSelectedColorName(selectedColorDetail.color);
    }
    setHasSelectedColor(true);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { user: id_user } = JSON.parse(localStorage.getItem("user") || "{}");
  const [addProduct] = useAddCommentMutation();
  const navigate = useNavigate();

  const onHandleSubmit = ({ content, rate }: any) => {
    const dataCmt = {
      id_product: prodetailData?._id,
      id_user,
      rate,
      content,
    };
    addProduct(dataCmt);
    navigate("/");
  };
  const sliderSettings = {
    infinite: true, // Vòng lặp vô hạn
    speed: 500, // Tốc độ chuyển đổi trong mili giây
    slidesToShow: 1, // Số lượng ảnh được hiển thị cùng một lúc
    slidesToScroll: 1, // Số lượng ảnh được cuộn một lúc
  };

  return (
    <div>
      <div className="product_image_area">
        <div className="container">
          <div className="row s_product_inner">
            <div className="col-lg-5 offset-lg-1">
              <div className="single-prd-item">
                <img
                  className="img-fluid w-[100px] "
                  src={mainImage || prodetailData?.images[0]}
                  alt=""
                  style={{ border: "1px solid #000" }}
                />
              </div>
              <Slider {...sliderSettings}>
                <div className="image-carosell d-flex p-2 mt-3">
                  {prodetailData?.images?.map((item: any) => (
                    <div
                      className="single-prd-item col-3 p-2"
                      key={item}
                      onClick={() => handleThumbnailClick(item)}
                    >
                      <img
                        className="img-fluid h-100"
                        src={item}
                        alt=""
                        style={{
                          border: "1px solid #000",
                          width: "100px", // Kích thước cố định cho ảnh
                          height: "100px", // Kích thước cố định cho ảnh
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Slider>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="s_product_text">
                <h3>{prodetailData?.name}</h3>
                {prodetailData?.price_sale === 0 ? (
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
                      <span>Thương Hiệu</span> : {brandName}
                    </a>
                  </li>
                  <li>
                    <i>{prodetailData?.content}</i>
                  </li>
                </ul>
                <p className="description-product">
                  {prodetailData?.description}
                </p>
                <div class="product-blocks-details product-blocks-443 grid-rows">
                  <div class="grid-row grid-row-443-1">
                    <div class="grid-cols">
                      <div class="grid-col grid-col-443-1-1">
                        <div class="grid-items">
                          <div class="grid-item grid-item-443-1-1-1">
                            <div class="module module-info_blocks module-info_blocks-361">
                              <div class="module-body">
                                <div class="module-item module-item-1 info-blocks info-blocks-icon">
                                  <div class="info-block">
                                    <div class="info-block-content">
                                      <div class="info-block-title">
                                        KHUYẾN MẠI ĐẶC BIỆT EXTRA SALE
                                      </div>
                                      <div class="info-block-text">
                                        Giảm thêm 200.000đ với đơn hàng từ 4
                                        triệu. Nhập mã: MYS200K
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-detail d-flex size">
                  <div className="product-size w-25 ">
                    <p>Kích Cỡ</p>
                    <div className="size-buttons">
                      {productSizes?.map((size, index) => (
                        <button
                          key={index}
                          className={`size-button ${
                            selectedSize === size ? "active" : ""
                          }`}
                          onClick={() => handleSizeChange(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="product-colors w-75">
                    {showColors && (
                      <div>
                        <p>Màu Sắc</p>
                        <div className="color-buttons">
                          {colorsForSelectedSize.map((color, index) => (
                            <button
                              key={index}
                              className={`color-button ${
                                selectedColor === color ? "active" : ""
                              } ${hasSelectedColor ? "with-color" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => handleColorChange(color)}
                            ></button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="product_count flex-1">
                  <label className="quantity">Số Lượng:</label>

                  <div className="quantity-input">
                    <span>
                      <button onClick={decrementQuantity}>-</button>
                    </span>
                    <input
                      min="1"
                      maxLength={999}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-50"
                    />
                    <span>
                      <button onClick={incrementQuantity}>+</button>
                    </span>
                  </div>
                </div>
                <div className="card_area d-flex align-items-center">
                  <a className="primary-btn" href="#">
                    Thêm Vào Giỏ Hàng
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <section className="our-team position-relative">
          <div className="container">
            <h1>Sản Phẩm Liên Quan</h1>

            <div className="position-relative">
              <div className="">
                <Slider
                  dots={true} // Hiển thị dấu chấm chỉ định trang hiện tại
                  infinite={true} // Lặp vô tận qua các ảnh
                  speed={300} // Tốc độ chuyển đổi (milliseconds)
                  slidesToShow={4} // Số ảnh được hiển thị cùng một lúc
                  slidesToScroll={1} // Số ảnh được chuyển đổi khi bạn di chuyển slide
                  autoplay={true}
                  autoplaySpeed={2000} // Thời gian chuyển ảnh
                >
                  {dataSourceToRender?.map((item) => {
                    if (item.brand_id === prodetailData?.brand_id) {
                      const brandName = brandData?.find(
                        (brand: any) => brand._id === item.brand_id
                      )?.name;
                      const discount = Math.round(
                        100 - (item.price_sale / item.price) * 100
                      );

                      return (
                        <div
                          className="product col-xxl-4 border-2 col-xl-4 col-lg-4 col-sm-6 col-12 p-2"
                          key={item._id}
                        >
                          <div className="card product-main">
                            <a
                              href={"/product/" + item._id + "/detail"}
                              className="d-block overflow-hidden no-underline"
                            >
                              <div className="position-relative product-image overflow-hidden">
                                <img
                                  src={item.images[0]}
                                  alt=""
                                  width="100%"
                                  height="auto"
                                  className="inset-0 object-cover"
                                />
                                <div className="product-hot" />
                              </div>
                              <div className="bg-white content-product w-100 p-2 h-50">
                                <div className="product-vendor">
                                  {brandName}
                                </div>
                                <h4 className="product-name">{item.name}</h4>
                                {item.price_sale > 0 ? (
                                  <div className="product-price row">
                                    <strong className="col-12">
                                      {item.price_sale}đ
                                    </strong>
                                    <div className="d-flex">
                                      <del className="price-del">
                                        {item.price}đ
                                      </del>
                                      <span className="product-discount">
                                        -{discount}%
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="product-price row">
                                    <strong className="col-12">
                                      {item.price}đ
                                    </strong>
                                  </div>
                                )}
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto w-50">
        <h2>Bình luận</h2>
        <form onSubmit={handleSubmit(onHandleSubmit)} className="form-floating">
          <textarea
            className="form-control"
            {...register("content", { required: true, minLength: 2 })}
          ></textarea>
          <label>Comments</label>
          <select
            className="form-select w-25"
            {...register("rate", { required: true })}
          >
            <option value="0" selected>
              Đánh giá
            </option>
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Bình luận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
