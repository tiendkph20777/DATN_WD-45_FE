import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGetBrandsQuery } from '../../../services/brand.service';
import { useGetProductsQuery } from '../../../services/product.service';
import { IProducts } from '../../../types/product.service';
import { useEffect, useState } from 'react';
import useRefs from "react-use-refs";
import PageProduct from "./homeProduct/PageProduct";
import ProductSale from "./homeProduct/ProductSale";
const Product = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: brandData } = useGetBrandsQuery();
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const brandName = (item: any) => brandData?.find((brand: any) => brand._id == item.brand_id)?.name
    const discount = (item: any) => Math.round(100 - (item.price_sale / item.price * 100))

    useEffect(() => {
        if (productData) {
            const updatedDataSource = productData.map(({ ...IProducts }) => ({ ...IProducts }));
            setDataSourceToRender(updatedDataSource);
        }
    }, [productData]);


    const settings = {
        // dots: true,  Hiển thị dấu chấm chỉ định trang hiện tại
        infinite: true, // Lặp vô tận qua các ảnh
        adaptiveHeight: true,
        speed: 500,// Tốc độ chuyển đổi (milliseconds)
        slidesToShow: 5, // Số ảnh được hiển thị cùng một lúc
        slidesToScroll: 1, // Số ảnh được chuyển đổi khi bạn di chuyển slide
        autoplay: true,
        autoplaySpeed: 2000, // Thời gian chuyển ảnh
        arrows: true,
        responsive:
            [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
    };
    const [sliderRef0, sliderRef1] = useRefs<{ slickNext(): Function, slickPrev(): Function }>()

    const gotoPrev = (sliderRef: any) => {
        sliderRef?.current?.slickPrev();
    }
    const gotoNext = (sliderRef: any) => {
        sliderRef?.current?.slickNext()
    }
    return (
        <div className="w-[90%] container">
            <section className="our-team position-relative">
                <div className="container">
                    <div className="fs-2 mb-4 section-heading text-uppercase fw-bold text-center">
                        Thương Hiệu
                    </div>
                    <div>
                    </div>
                    <div className="row my-xl-5 my-0 ourteam-row position-relative">
                        <div className="row">
                            {brandData?.map((item) => {
                                return (
                                    <div className=" col-xxl-2 border-2 col-xl-2 col-lg-2 col-sm-2 col-4 " key={item._id}>
                                        <div className="">
                                            <div className="position-relative overflow-hidden">
                                                <img src={item.image} alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* page product */}
            <div>
                <PageProduct />
            </div>
            <div>
                <ProductSale />
            </div>
            <section className="our-team position-relative">
                <div className="container_home">
                    <div className="d-flex justify-content-between py-5">
                        <div className="fs-5  text-uppercase fw-bold text-center">
                            - Sản phẩm bán chạy
                        </div>
                        <div>
                            <button className="button_slide" onClick={() => gotoPrev(sliderRef1)}><img src="/src/assets/icons/prev.svg" /></button>
                            <button className="button_slide" onClick={() => gotoNext(sliderRef1)}><img src="/src/assets/icons/next.svg" /></button>
                        </div>
                    </div>
                    <Slider ref={sliderRef1 as any} {...settings}>
                        {dataSourceToRender?.slice(0, 6).map((item) => {
                            return (
                                <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2" key={item._id}>
                                    <div className="card product-main">
                                        <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                                            <div className="position-relative product-image overflow-hidden">
                                                <img src={item.images[0]} alt="" width="100%" height="300" className=" inset-0 object-cover" />
                                                <div className="product-hot" />
                                            </div>
                                            <div className="bg-white content-product w-100 p-2">
                                                <div className="product-detail px-3 row ">
                                                    <div className="col-12 row px-2">
                                                        <div className="col-1 m-1 product-color color-1" />
                                                    </div>
                                                </div>
                                                <div className="product-vendor">{brandName(item)}</div>
                                                <h4 className="product-name ellipsis" >
                                                    {item.name}
                                                </h4>
                                                {item.price_sale > 0 ? (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                                        <div className="d-flex">
                                                            <del className="price-del">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                                                            <span className="product-discount">-{discount(item)}%</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                                    </div>
                                                )}
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
                            )
                        })}

                    </Slider>
                </div>
            </section>
        </div >
    )
}

export default Product