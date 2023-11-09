import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGetBrandsQuery } from '../../../services/brand.service';
import { useGetProductsQuery } from '../../../services/product.service';
import { IProducts } from '../../../types/product.service';
import { useEffect, useState } from 'react';
import useRefs from "react-use-refs";
import { Pagination } from 'antd';
const Product = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: brandData } = useGetBrandsQuery();
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const [searchResult, setSearchResult] = useState<IProducts[]>([]);
    const brandName = (item: any) => brandData?.find((brand: any) => brand._id == item.brand_id)?.name
    const discount = (item: any) => Math.round(100 - (item.price_sale / item.price * 100))
    useEffect(() => {
        if (productData) {
            const updatedDataSource = productData.map(({ ...IProducts }) => ({ ...IProducts }));
            setDataSourceToRender(updatedDataSource);
            setSearchResult(updatedDataSource)
        }
    }, [productData]);

    const onHandleClick = (value: string | number) => {
        let filteredData = dataSourceToRender;
        filteredData = filteredData.filter((item) => item.brand_id == value);
        if (filteredData.length > 1) {
            setDataSourceToRender(filteredData);
        } else {
            filteredData = searchResult;
            filteredData = filteredData.filter((item) => item.brand_id == value);
            setDataSourceToRender(filteredData);
        }
    };

    const settings = {
        // dots: true,  Hiển thị dấu chấm chỉ định trang hiện tại
        infinite: true, // Lặp vô tận qua các ảnh
        adaptiveHeight: true,
        speed: 500,// Tốc độ chuyển đổi (milliseconds)
        slidesToShow: 5, // Số ảnh được hiển thị cùng một lúc
        slidesToScroll: 1, // Số ảnh được chuyển đổi khi bạn di chuyển slide
        // autoplay: true, 
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
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <div className="fs-2 mb-4 section-heading text-uppercase fw-bold text-center">
                        Thương Hiệu
                    </div>
                    <div>
                    </div>
                    <div className="row my-5 ourteam-row position-relative container_home">
                        <div className="row">
                            {brandData?.map((item) => {
                                return (
                                    <div className=" col-xxl-2 border-2 col-xl-2 col-lg-6 col-sm-6 col-12 p-2 " key={item._id}>
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
            <section className="our-team position-relative pt-2">
                <div className="container_home">
                    <div className="d-flex mb-3 py-5">
                        <div className="fs-5 text-uppercase fw-bold">
                            - SẢN PHẨM MỚI
                        </div>
                        <div>
                            <div className="d-flex flex-row  mx-4 w-full">
                                {brandData?.map((item) => {
                                    return (
                                        <div className="brandIcon " key={item._id}>
                                            <div onClick={() => onHandleClick(item._id)} >
                                                {item.name}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-lg-5 g-2 g-lg-3">
                        {dataSourceToRender.slice(0, 15).map((item) => {
                            return (
                                // <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2" key={item._id}>
                                <div className="product col border-2 p-2" key={item._id}>
                                    <div className="card product-main">
                                        <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                                            <div className="position-relative product-image overflow-hidden">
                                                <img src={item.images[0]} alt="" width="100%" height="300" className=" inset-0 object-cover" />
                                            </div>
                                            <div className="bg-white content-product w-100 p-2">
                                                <div className="product-detail px-3 row ">
                                                    <div className="col-12 row px-2">
                                                        <div className="col-1 m-1 product-color color-1" />
                                                    </div>
                                                </div>
                                                <div className="product-vendor">{brandName(item)}</div>
                                                <h4 className="product-name" style={{ height: '60px' }}>
                                                    {item.name}
                                                </h4>
                                                {item.price_sale > 0 ? (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price_sale}đ</strong>
                                                        <div className="d-flex">
                                                            <del className="price-del">{item.price}đ</del>
                                                            <span className="product-discount">-{discount(item)}%</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price}đ</strong>
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

                    </div>
                    <Pagination onChange={(page: number, pageSize: number) => {

                    }} total={50} />
                </div></section>

            <section className="our-team position-relative pt-2">
                <div className="container_home">
                    <div>
                        <div className="d-flex justify-content-between py-5">
                            <div className="fs-5  text-uppercase fw-bold text-center">
                                - SẢN PHẨM KHUYẾN MÃI
                            </div>
                            <div>
                                <button className="button_slide" onClick={() => gotoPrev(sliderRef0)}><img src="/src/assets/icons/prev.svg" /></button>
                                <button className="button_slide" onClick={() => gotoNext(sliderRef0)}><img src="/src/assets/icons/next.svg" /></button>
                            </div>
                        </div>
                        <Slider ref={sliderRef0 as any}  {...settings}>
                            {dataSourceToRender?.slice(0, 6).map((item) => {
                                if (item.price_sale > 0) {
                                    return (
                                        <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2" key={item._id}>
                                            <div className="card product-main">
                                                <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                                                    <div className="position-relative product-image overflow-hidden">
                                                        <img src={item.images[0]} alt="" width="100%" className=" inset-0 object-cover" />
                                                    </div>
                                                    <div className="bg-white content-product w-100 p-2">
                                                        <div className="product-detail px-3 row ">
                                                            <div className="col-12 row px-2">
                                                                <div className="col-1 m-1 product-color color-1" />
                                                            </div>
                                                        </div>
                                                        <div className="product-vendor">{brandName(item)}</div>
                                                        <h4 className="product-name ellipsis">
                                                            {item.name}
                                                        </h4>
                                                        <div className="product-price row">
                                                            <strong className="col-12">{item.price_sale}đ</strong>
                                                            <div className="d-flex">
                                                                <del className="price-del">{item.price}đ</del>
                                                                <span className="product-discount">-{discount(item)}%</span>
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
                                    )
                                }
                            })}
                        </Slider>

                    </div>
                </div></section >
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
                                                <h4 className="product-name" style={{ height: '60px' }}>
                                                    {item.name}
                                                </h4>
                                                {item.price_sale > 0 ? (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price_sale}đ</strong>
                                                        <div className="d-flex">
                                                            <del className="price-del">{item.price}đ</del>
                                                            <span className="product-discount">-{discount(item)}%</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price}đ</strong>
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

        </div>
    )
}

export default Product

