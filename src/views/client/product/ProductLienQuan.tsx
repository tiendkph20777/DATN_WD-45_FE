import React, { useState, useEffect } from "react";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import "./styles.css";
import { IProducts } from "../../../types/product.service";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductLienQuan = () => {
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

<<<<<<< HEAD
  return (
    <div>
      <section className="our-team position-relative">
        <div className="container">
          <h1>Sản Phẩm Liên Quan</h1>
          <div className="row ourteam-row position-relative">
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
                            <div className="bg-white content-product w-100 p-2">
                              <div className="product-vendor">{brandName}</div>
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
=======
    return (
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <h1>Sản Phẩm Liên Quan</h1>
                    <div className="row ourteam-row position-relative">
                        <div className="row col-xxl-12 border-2 col-xl-12 col-lg-12 col-sm-12 col-12 p-2">
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
                                            className="product col-xxl-3 border-2 col-xl-3 col-lg-3 col-sm-4 col-6 p-2"
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
                                                    <div className="bg-white content-product w-100 p-2">
                                                        <div className="product-vendor">{brandName}</div>
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
                                                    <div className="product-action pt-5 row text-center justify-content-center">
                                                        <div className="col-6"><img src="/src/assets/images/products/icons/read.svg" alt="" />
                                                        </div>
                                                        <div className="col-6"><img src="/src/assets/images/products/icons/cart.svg" alt="" />
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
>>>>>>> 18b29cc45a1c1367eb4fc2bc90ba2b6195c8d7cf
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
  );
};

export default ProductLienQuan;
