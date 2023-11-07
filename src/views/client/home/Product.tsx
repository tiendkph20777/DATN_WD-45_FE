import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGetBrandsQuery } from '../../../services/brand.service';
import { useGetProductsQuery } from '../../../services/product.service';
import { IProducts } from '../../../types/product.service';
import { useEffect, useState } from 'react';

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
        speed: 800,// Tốc độ chuyển đổi (milliseconds)
        slidesToShow: 4, // Số ảnh được hiển thị cùng một lúc
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

    return (
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <div className="fs-2 mb-4 section-heading text-uppercase fw-bold text-center">
                        Thương Hiệu
                    </div>
                    <div>

                    </div>
                    <div className="row ourteam-row position-relative container">
                        <div className="row">
                            {brandData?.map((item) => {
                                return (
                                    <div className="brandIcon col-xxl-2 border-2 col-xl-2 col-lg-6 col-sm-6 col-12 p-2 " key={item._id}>
                                        <div className="card">
                                            <a onClick={() => onHandleClick(item._id)} className="d-block overflow-hidden no-underline m-2">
                                                <div className="position-relative overflow-hidden">
                                                    <img src={item.image} alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="row ourteam-row w-100 position-relative ">
                        <div className="fs-2 section-heading p-5 text-uppercase fw-bold text-center">
                            Sản phẩm đang giảm giá
                        </div>
                        <div >
                            <Slider {...settings}>
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
                                                            <div className="col-6"><img src="/src/assets/images/products/icons/read.svg" alt="" />
                                                            </div>
                                                            <div className="col-6"><img src="/src/assets/images/products/icons/cart.svg" alt="" />
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
                    </div>
                </div>
            </section>
            <section className="our-team position-relative">
                <div className="container">
                    <div className="fs-2 p-5 section-heading text-uppercase fw-bold text-center m-2">
                        Sản phẩm bán chạy
                    </div>
                    <Slider {...settings}>
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
                                                <div className="col-6"><img src="/src/assets/images/products/icons/read.svg" alt="" />
                                                </div>
                                                <div className="col-6"><img src="/src/assets/images/products/icons/cart.svg" alt="" />
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
            <section className="our-team position-relative pt-2">
                <div className="container">
                    <div className="fs-2 section-heading pb-5 text-uppercase fw-bold text-center">
                        Sản phẩm nổi bật
                    </div>
                    <Slider {...settings}>
                        {dataSourceToRender?.slice(0, 6).map((item) => {
                            return (
                                <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
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
                                                <div className="col-6"><img src="/src/assets/images/products/icons/read.svg" alt="" />
                                                </div>
                                                <div className="col-6"><img src="/src/assets/images/products/icons/cart.svg" alt="" />
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            )
                        })}

                    </Slider>
                </div></section>
        </div >
    )
}

export default Product

