import React, { useState, useEffect } from "react";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { IProducts } from "../../../types/product2";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useRefs from "react-use-refs";

const ProductLienQuan = () => {
  const { data: productData, isLoading } = useGetProductsQuery();
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

  const [sliderRef0, sliderRef1] = useRefs<{ slickNext(): Function, slickPrev(): Function }>()

  const gotoPrev = (sliderRef: any) => {
    sliderRef?.current?.slickPrev();
  }
  const gotoNext = (sliderRef: any) => {
    sliderRef?.current?.slickNext()
  }
  if (isLoading) {
    return <div>
      <div className="right-wrapper">
        <div className="spinnerIconWrapper">
          <div className="spinnerIcon"></div>
        </div>
        <div className="finished-text">
          Xin vui lòng chờ một chút 🥰🥰🥰
        </div>
      </div>
    </div>;
  }
  return (
    <div>
      <section className="our-team position-relative">
        <div className="container">
          <div className="d-flex justify-content-between py-5">
            <div className="fs-5  text-uppercase fw-bold text-center">
              - Sản Phẩm Liên Quan
            </div>
          </div>
          <Slider
            // dots={true} // Hiển thị dấu chấm chỉ định trang hiện tại
            infinite={true} // Lặp vô tận qua các ảnh
            speed={300} // Tốc độ chuyển đổi (milliseconds)
            slidesToShow={5} // Số ảnh được hiển thị cùng một lúc
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
                  <div className="product col-xxl-2 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2" key={item._id}>
                    <div className="card product-main">
                      <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                        <div className="position-relative product-image overflow-hidden">
                          <img src={item.images[0]} alt="" width="100%" className=" inset-0 object-cover" />
                          <div className="product-sale" />
                        </div>
                        <div className="bg-white content-product w-100 p-2 pt-4">
                          <div className="product-detail px-3 row ">
                            <div className="col-12 row px-2">
                              <div className="col-1 m-1 product-color color-1" />
                              <div className="col-1 m-1 product-color color-2" />
                              <div className="col-1 m-1 product-color color-3" />
                            </div>
                          </div>
                          <div className="product-vendor">{brandName}</div>
                          <h4 className="product-name ellipsis">
                            {item.name}
                          </h4>
                          <div className="product-price row">
                            <strong className="col-12">{item.price_sale?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                            <div className="d-flex">
                              <del className="price-del">{item.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                              <span className="product-discount">-{discount}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="product-action pt-5 row text-center justify-content-center">
                          <div className="col-6"><img src="/src/assets/icons/read.svg" alt="" />
                          </div>
                          <div className="col-6"><img src="/src/assets/icons/cart.svg" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default ProductLienQuan;
