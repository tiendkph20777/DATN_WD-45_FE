import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import "./styles.css";
import { IProducts } from "../../../types/product.service";
import CommentProductDetail from "./CommentProductDetail";
import { useCreateCartMutation } from "../../../services/cart.service";
import ProductLienQuan from "./ProductLienQuan";

const ProductDetail = () => {
  const { data: productData } = useGetProductsQuery();
  const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
  useEffect(() => {
    if (productData) {
      const updatedDataSource = productData.map(({ ...IProducts }) => ({
        ...IProducts,
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

  const getUniqueSizes = () => {
    const uniqueSizes = [
      ...new Set(productDataDetail?.map((detail) => detail.size) || []),
    ];
    return uniqueSizes;
  };

  const sizes = getUniqueSizes();
  const colorsSet = new Set(productDataDetail?.map((detail) => detail.color));
  const uniqueColors = [...colorsSet];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showColors, setShowColors] = useState(false);
  const [colorsForSelectedSize, setColorsForSelectedSize] = useState([]);
  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [mainImage, setMainImage] = useState(prodetailData?.images[0]);
  // console.log(selectedSize)
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  useEffect(() => {
    if (selectedSize) {
      const filteredColors = productDataDetail
        .filter((detail) => detail.size === selectedSize)
        .map((detail) => detail.color);
      setColorsForSelectedSize(filteredColors);
      setShowColors(true);
    }
  }, [selectedSize, productDataDetail]);

  const handleSizeChange = (size: any) => {
    setSelectedSize(size);
    setSelectedColor("");
    setSelectedColorName("");
    setHasSelectedColor(false);
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
    const selectedColorDetail = productDataDetail?.find(
      (detail) => detail.color === color && detail.size === selectedSize
    );
    if (selectedColorDetail) {
      setSelectedColorName(selectedColorDetail.color);
    }
    setHasSelectedColor(true);
  };

  const handleQuantityChange = (event: any) => {
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

  ////////////////////////////////
  const { user } = JSON.parse(localStorage.getItem('user')!)
  const [addCart, isLoading] = useCreateCartMutation()

  const onSubmitCart = async (dataCart: any) => {
    const filteredProducts = productDataDetail?.map(async (product) => {
      if (typeof product?.size === 'number' && product?.size === selectedSize) {
        if (product?.color === selectedColor) {
          const cartItem = {
            product_id: product._id,
            user_id: user,
          };
          // console.log(cartItem)
          const result = await addCart(cartItem);
          return result;
        }
      }
    });
    const results = await Promise.all(filteredProducts);
    // console.log("Kết quả các cuộc gọi addCart:", results);
  }

  /////////////////////

  return (
    <div>
      <div className="product_image_area">
        <div className="container">
          {/*  */}
          <form action="" onSubmit={handleSubmit(onSubmitCart)}>
            <div className="row s_product_inner">
              <div className="col-lg-5 offset-lg-1">
                <div className="single-prd-item">
                  <img
                    className="img-fluid w-[100px]"
                    src={mainImage || prodetailData?.images[0]}
                    alt=""
                  />
                </div>
                <div className="image-carosell d-flex p-2">
                  {prodetailData?.images?.map((item: any) => (
                    <div
                      className="single-prd-item col-3 p-2"
                      key={item}
                      onClick={() => handleThumbnailClick(item)}
                    >
                      <img className="img-fluid" src={item} alt="" />
                    </div>
                  ))}
                </div>
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
                        <span>Danh Mục</span> : {brandName}
                      </a>
                    </li>
                    <li>
                      <i>{prodetailData?.content}</i>
                    </li>
                  </ul>
                  <p className="description-product">
                    {prodetailData?.description}
                  </p>

                  <div className="product-detail d-flex size">
                    <div className="product-size w-25">
                      <p>Kích Cỡ</p>
                      <div className="size-buttons">
                        {sizes.map((size, index) => (
                          <button
                            key={index}
                            className={`size-button ${selectedSize === size ? "active" : ""}`}
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
                                className={`color-button ${selectedColor === color ? "active" : ""} ${hasSelectedColor ? "with-color" : ""}`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorChange(color)}
                              ></button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="product_count">
                    <label className="quantity">Số Lượng:</label>
                    <div className="quantity-input">
                      <button onClick={decrementQuantity}>-</button>
                      <input
                        min="1"
                        maxLength={999}
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                      <button onClick={incrementQuantity}>+</button>
                    </div>
                  </div>
                  <div className="card_area d-flex align-items-center">
                    {/* <a className="primary-btn" href="#">
                    Add to Cart
                  </a> */}
                    <button className="primary-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/*  */}
        </div>
      </div>
      <div>
        <ProductLienQuan />
      </div>
      <div>
        <CommentProductDetail />
      </div>
    </div>
  );
};

export default ProductDetail;
