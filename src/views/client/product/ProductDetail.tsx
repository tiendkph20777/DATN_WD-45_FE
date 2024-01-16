import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import {
  useGetAllProductsDetailQuery,
  useGetAllsProductsDetailQuery,
} from "../../../services/productDetail.service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tabs, message as messageApi, Space, Alert } from "antd";
import CommentProductDetail from "./CommentProductDetail";
import { useCreateCartMutation } from "../../../services/cart.service";
import ProductLienQuan from "./ProductLienQuan";
import ProductSale from "../home/homeProduct/ProductSale";
import RelatedInformation from "./RelatedInformation";

const { TabPane } = Tabs;

const ProductDetail = () => {
  const { data: productData } = useGetProductsQuery();
  const [dataSourceToRender, setDataSourceToRender] = useState([]);
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

  const brandName = brandData?.find(
    (brand) => brand._id === prodetailData?.brand_id
  )?.name;
  const { data: productDataDetail, isLoading } =
    useGetAllsProductsDetailQuery(_id);

  const [productSizes, setProductSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showColors, setShowColors] = useState(true); // Hiển thị màu từ đầu
  const [colorsForSelectedSize, setColorsForSelectedSize] = useState([]);
  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [mainImage, setMainImage] = useState(prodetailData?.images[0]);
  const [selectedSizeColors, setSelectedSizeColors] = useState([]);
  const [remainingQuantity, setRemainingQuantity] = useState<number | null>(
    null
  );
  const [quantityError, setQuantityError] = useState(null);
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [totalQuantityForSelectedSize, setTotalQuantityForSelectedSize] =
    useState(null);
  const [quantityForColorsInSelectedSize, setQuantityForColorsInSelectedSize] =
    useState({});
  const [sizeError, setSizeError] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    if (selectedSize) {
      const totalQuantityForSize = productDataDetail
        ?.filter((detail: any) => detail?.size === selectedSize)
        .reduce((total, detail: any) => total + detail.quantity, 0);
      setTotalQuantityForSelectedSize(totalQuantityForSize);

      const detailsForSelectedSize = productDataDetail?.filter(
        (detail: any) => detail?.size === selectedSize
      );
      const colorsForCurrentProduct = detailsForSelectedSize
        .filter((detail: any) => detail?.product_id === prodetailData?._id)
        .map((detail: any) => detail?.color);

      setColorsForSelectedSize(colorsForCurrentProduct);
    }
  }, [selectedSize, productDataDetail, prodetailData]);

  const handleThumbnailClick = (image: any) => {
    setMainImage(image);
  };
  useEffect(() => {
    if (selectedSize) {
      // Lọc ra danh sách màu sắc cho kích thước đã chọn
      const colorsForSize = productDataDetail
        ?.filter((detail: any) => detail?.size === selectedSize)
        .map((detail: any) => detail?.color);

      // Tạo một đối tượng mới để lưu trữ số lượng còn lại của mỗi màu cho kích thước đã chọn
      const quantityForColors = {};

      // Tính toán số lượng còn lại cho mỗi màu
      colorsForSize.forEach((color) => {
        const totalQuantityForColor = productDataDetail
          ?.filter(
            (detail: any) =>
              detail?.color === color && detail?.size === selectedSize
          )
          .reduce((total, detail: any) => total + detail.quantity, 0);
        quantityForColors[color] = totalQuantityForColor;
      });

      setQuantityForColorsInSelectedSize(quantityForColors);
    }
  }, [selectedSize, productDataDetail]);

  useEffect(() => {
    if (productData && prodetailData && productDataDetail) {
      const productDetailsForCurrentProduct = productDataDetail.filter(
        (detail: any) => detail.product_id === prodetailData._id
      );

      const sizesForCurrentProduct = productDetailsForCurrentProduct.map(
        (detail: any) => detail.size
      );

      const uniqueSizes = Array.from(new Set(sizesForCurrentProduct));

      setProductSizes(uniqueSizes);
    }
  }, [productData, prodetailData, productDataDetail]);

  const handleSizeChange = (size: any) => {
    setSelectedSize(size);
    setSelectedColor("");
    setSelectedColorName("");
    setHasSelectedColor(false);
    setShowColors(true);

    // Lọc ra danh sách màu sắc cho kích thước đã chọn
    const colorsForSize = productDataDetail
      ?.filter((detail: any) => detail?.size === size)
      .map((detail: any) => detail?.color);

    setSelectedSizeColors(colorsForSize);
    setRemainingQuantity(calculateRemainingQuantity(selectedSize, size));
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
    const selectedColorDetail = productDataDetail?.find(
      (detail: any) => detail?.color === color && detail?.size === selectedSize
    );
    if (selectedColorDetail) {
      setSelectedColorName(selectedColorDetail?.color);
    }
    setHasSelectedColor(true);
    setRemainingQuantity(calculateRemainingQuantity(selectedSize, color));
  };
  const calculateRemainingQuantity = (size, color) => {
    // Tính toán số lượng còn lại dựa trên kích thước và màu đã chọn
    const selectedSizeColorDetail = productDataDetail?.find(
      (detail: any) => detail?.size === size && detail?.color === color
    );

    return Math.max(selectedSizeColorDetail?.quantity || 0);
  };
  useEffect(() => {
    if (selectedSize || selectedColor) {
      // Đặt lỗi về null khi kích thước hoặc màu sắc thay đổi
      setQuantityError(null);
    }
  }, [selectedSize, selectedColor]);

  useEffect(() => {
    // Nếu không có lỗi và người dùng vừa chọn số lượng hợp lệ, ẩn thông báo lỗi
    if (!quantityError && isErrorVisible) {
      setIsErrorVisible(false);
    }
  }, [quantityError, quantity]);

  const handleQuantityChange = (event: any) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Ẩn thông báo khi người dùng chọn số lượng hợp lệ
      setQuantityError("");
      setQuantity(newQuantity);

      // Đặt trạng thái hiển thị lỗi về false
      setIsErrorVisible(false);
    } else {
      // Hiển thị thông báo lỗi nếu số lượng không hợp lệ
      setQuantityError("Số lượng không hợp lệ");

      // Đặt trạng thái hiển thị lỗi về true
      setIsErrorVisible(true);
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

  const profileUser = JSON.parse(localStorage.getItem("user"))?.user;
  const [addCart] = useCreateCartMutation();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const onSubmitCart = async () => {
    if (profileUser) {
      if (!isAddingToCart) {
        if (!selectedSize || !selectedColor) {
          messageApi.error({
            type: "error",
            content:
              "Vui lòng chọn màu và size trước khi thêm vào giỏ hàng !!!",
            className: "custom-class",
            style: {
              margin: "10px",
              fontSize: "20px",
              lineHeight: "30px",
            },
          });
          return;
        }
        if (quantity > remainingQuantity) {
          // Đặt lỗi về null khi kích thước thay đổi
          setSizeError(null);

          // Hiển thị thông báo lỗi khi số lượng lớn hơn số sản phẩm còn lại
          setQuantityError(
            `Chỉ còn ${remainingQuantity} sản phẩm. Vui lòng chọn số lượng nhỏ hơn hoặc bằng.`
          );
          return;
        } else if (remainingQuantity === 0) {
          setQuantityError("Sản phẩm đã hết ");
        } else {
          setQuantityError(null);
        }

        setIsAddingToCart(true);
        const filteredProducts = productDataDetail?.map(async (product) => {
          if (
            typeof product?.size === "number" &&
            product?.size === selectedSize &&
            product?.color === selectedColor
          ) {
            const cartItem = {
              product_id: product._id,
              user_id: profileUser,
              quantity: quantity,
            };
            console.log(cartItem);
            const result = await addCart(cartItem);
            const successMessage = `Thêm sản phẩm vào trong giỏ hàng thành công 🎉🎉🎉`;
            messageApi.success({
              type: "success",
              content: successMessage,
              className: "custom-class",
              style: {
                margin: "10px",
                fontSize: "20px",
                lineHeight: "30px",
              },
            });
            return result;
          }
        });

        await Promise.all(filteredProducts);
        setIsAddingToCart(false);
      }
    } else {
      messageApi.error({
        type: "error",
        content: "Vui lòng đăng nhập để thực hiện chức năng này !!!",
        className: "custom-class",
        style: {
          margin: "10px",
          fontSize: "20px",
          lineHeight: "30px",
        },
      });
    }
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const uniqueColors = new Set();

  // Lặp qua productDataDetail để thêm các màu sắc vào tập hợp
  productDataDetail?.forEach((detail: any) => {
    if (detail.product_id === prodetailData?._id) {
      uniqueColors.add(detail.color);
    }
  });
  if (isLoading) {
    return (
      <div>
        <div className="right-wrapper">
          <div className="spinnerIconWrapper">
            <div className="spinnerIcon"></div>
          </div>
          <div className="finished-text">Xin vui lòng chờ một chút 🥰🥰🥰</div>
        </div>
      </div>
    );
  }
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
                          width: "100px",
                          height: "100px",
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
                {prodetailData?.price_sale > 0 ? (
                  <div className="product-price row">
                    <strong className="col-12">
                      {prodetailData?.price_sale?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                    <div className="d-flex">
                      <del className="price-del">
                        {prodetailData?.price?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </del>
                    </div>
                  </div>
                ) : (
                  <div className="product-price row">
                    <strong className="col-12">
                      {prodetailData?.price?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </div>
                )}
                <ul className="list">
                  <li>
                    <a className="active" href="#">
                      <span>Thương Hiệu</span> : {brandName}
                    </a>
                  </li>
                  <hr />
                  <li>
                    <i>{prodetailData?.description}</i>
                  </li>
                </ul>

                <div className="product-blocks-details product-blocks-443 grid-rows">
                  <div className="grid-row grid-row-443-1">
                    <div className="grid-cols">
                      <div className="grid-col grid-col-443-1-1">
                        <div className="grid-items">
                          <div className="grid-item grid-item-443-1-1-1">
                            <div className="module module-info_blocks module-info_blocks-361">
                              <div className="module-body">
                                <div className="module-item module-item-1 info-blocks info-blocks-icon">
                                  <div className="info-block">
                                    <div className="info-block-content">
                                      <div className="info-block-title">
                                        MỌI THẮC MẮC VUI LÒNG LIÊN HỆ ZALO : 0332573175
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

                <div className="product-blocks-details product-blocks-443 grid-rows">
                  <div className="grid-row grid-row-443-1">
                    <div className="grid-cols">
                      <div className="grid-col grid-col-443-1-1">
                        <div className="grid-items">
                          <div className="grid-item grid-item-443-1-1-1">
                            <div className="module module-info_blocks module-info_blocks-361">
                              <div className="module-body">
                                <div className="module-item module-item-1 info-blocks info-blocks-icon">
                                  <div className="info-block">
                                    <div className="info-block-content">
                                      <div className="info-block-title">
                                        KHUYẾN MẠI ĐẶC BIỆT EXTRA SALE
                                      </div>
                                      <div className="info-block-text">
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


                <div className="product-detail  size">
                  <p>Kích Cỡ</p>
                  <div className="size-buttons">
                    {productSizes?.map((size, index) => (
                      <button
                        key={index}
                        className={`size-button ${selectedSize === size ? "active" : ""
                          }`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="all-colors">
                    <p>Màu Sắc</p>
                    <div className="color-buttons">
                      {[...uniqueColors].map((color: any, index) => (
                        <button
                          key={index}
                          className={`color-button all-color ${selectedColor === color ? "active" : ""
                            } ${selectedSizeColors.includes(color)
                              ? "selected-size"
                              : ""
                            }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                        ></button>
                      ))}
                    </div>
                  </div>
                  <div className="remaining-quantity mt-3">
                    <p>
                      {selectedSize &&
                        `Tổng số lượng sản phẩm cho kích thước ${selectedSize}: ${totalQuantityForSelectedSize !== null
                          ? totalQuantityForSelectedSize
                          : "Loading..."
                        }`}

                      {selectedSize && (
                        <ul>
                          {Object.entries(quantityForColorsInSelectedSize).map(
                            ([color, quantity]) => (
                              <li key={color}>{`${color}: ${quantity !== null ? quantity : "Loading..."
                                }`}</li>
                            )
                          )}
                        </ul>
                      )}
                      {quantityError && (
                        <Alert type="error" message={quantityError} showIcon />
                      )}
                    </p>
                  </div>
                  {quantityError && (
                    <div className="quantity-error mt-3">
                      <p style={{ color: "red" }}>{quantityError}</p>
                    </div>
                  )}
                </div>
                <div className="product_count flex-1">
                  <label className="quantity">Số Lượng:</label>
                  <div className="quantity-input">
                    <span>
                      <button onClick={decrementQuantity}>-</button>
                    </span>
                    <input
                      min="1"
                      maxLength={10}
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
                  <button
                    className="primary-btn"
                    onClick={onSubmitCart}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart
                      ? "Thêm vào giỏ hàng..."
                      : "Thêm vào giỏ hàng"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1" className="container">
          <TabPane tab="Thông tin liên quan" key="1">
            <RelatedInformation />
          </TabPane>
          <TabPane tab="Xem đánh giá " key="2">
            <CommentProductDetail />
          </TabPane>
        </Tabs>
        <ProductLienQuan />
        <ProductSale />
      </div>
      <div></div>
    </div>
  );
};

export default ProductDetail;
