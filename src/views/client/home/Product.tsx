
import { useGetBrandsQuery } from '../../../services/brand.service';
import { useGetProductsQuery } from '../../../services/product.service';
import { IProducts } from '../../../types/product.service';
import { useEffect, useState } from 'react';
const Product = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: brandData } = useGetBrandsQuery();
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const [searchResult, setSearchResult] = useState<IProducts[]>([]);
    useEffect(() => {
        if (productData) {
            const updatedDataSource = productData.map(({ ...IProducts }) => ({ ...IProducts }));
            setDataSourceToRender(updatedDataSource);
            setSearchResult(updatedDataSource)
        }
    }, [productData]);

    const onHandleClick = (value: string | number) => {
        let filteredData = dataSourceToRender;
        if (filteredData.length > 2) {
            filteredData = filteredData.filter((item) => item.brand_id == value);
            setDataSourceToRender(filteredData);
        } else {
            filteredData = searchResult;
            filteredData = filteredData.filter((item) => item.brand_id == value);
            setDataSourceToRender(filteredData);
        }
    };

    return (
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <div className="fs-2 section-heading text-uppercase fw-bold text-center">
                        Thương Hiệu
                    </div>
                    <div className="row ourteam-row position-relative container">
                        <div className="row ">
                            {brandData?.map((item) => {
                                return (
                                    <div className="col-xxl-2 border-2 col-xl-2 col-lg-2 col-sm-4 col-6 p-2" key={item._id}>
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
                        <div className="row">
                            {dataSourceToRender?.map((item) => {
                                const brandName = brandData?.find((brand: any) => brand._id == item.brand_id)?.name
                                const discount = Math.round(100 - (item.price_sale / item.price * 100))
                                if (item.price_sale > 0) {
                                    return (
                                        <div className="product col-xxl-3 border-2 col-xl-3 col-lg-4 col-sm-6 col-6 p-2" key={item._id}>
                                            <div className="card product-main">
                                                <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                                                    <div className="position-relative product-image overflow-hidden">
                                                        <img src={item.images[0]} alt="" width="100%" className=" inset-0 object-cover" />
                                                    </div>
                                                    <div className="bg-white content-product w-100 p-2">
                                                        <div className="product-detail pt-2 row text-center">
                                                            <div className="col-6 d-flex">
                                                            </div>
                                                            <div className="col-6 row justify-content-end">
                                                                <div className="col-3 m-1 product-color color-1" />
                                                                <div className="col-3 m-1 product-color color-2" />
                                                                <div className="col-3 m-1 product-color color-3" />
                                                            </div>
                                                        </div>
                                                        <div className="product-vendor">{brandName}</div>
                                                        <p className="product-name ellipsis" style={{ fontSize: "18px" }} >
                                                            {item.name}
                                                        </p>
                                                        <div className="product-price row">
                                                            <strong className="col-12">{item.price_sale}đ</strong>
                                                            <div className="d-flex">
                                                                <del className="price-del">{item.price}đ</del>
                                                                <span className="product-discount">-{discount}%</span>
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
                        </div>
                    </div>
                </div>
            </section>
            <section className="our-team position-relative mt-5">
                <div className="container">
                    <div className="fs-2 p-5 section-heading text-uppercase fw-bold text-center m-2">
                        Sản phẩm bán chạy
                    </div>
                    <div className="row">
                        {dataSourceToRender?.map((item) => {
                            const brandName = brandData?.find((brand: any) => brand._id == item.brand_id)?.name
                            const discount = Math.round(100 - (item.price_sale / item.price * 100))
                            return (
                                <div className="product col-xxl-3 border-2 col-xl-3 col-lg-4 col-sm-6 col-6  p-2" key={item._id}>
                                    <div className="card product-main">
                                        <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                                            <div className="position-relative product-image overflow-hidden">
                                                <img src={item.images[0]} alt="" width="100%" height="300" className=" inset-0 object-cover" />
                                                <div className="product-hot" />
                                                {/* <div class="product-category"></div> */}
                                            </div>
                                            <div className="bg-white content-product w-100 p-2">
                                                <div className="product-detail row text-center">
                                                    <div className="col-6 d-flex">
                                                    </div>
                                                    <div className="col-6 row justify-content-end">
                                                        <div className="col-3 m-1 product-color color-1" />
                                                        <div className="col-3 m-1 product-color color-2" />
                                                        <div className="col-3 m-1 product-color color-3" />
                                                    </div>
                                                </div>
                                                <div className="product-vendor">{brandName}</div>
                                                <h4 className="product-name ellipsis">
                                                    {item.name}
                                                </h4>
                                                {item.price_sale > 0 ? (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price_sale}đ</strong>
                                                        <div className="d-flex">
                                                            <del className="price-del">{item.price}đ</del>
                                                            <span className="product-discount">-{discount}%</span>
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

                    </div>
                </div>

            </section>
            <section className="our-team position-relative pt-2">
                <div className="container">
                    <h5 className="fs-5 section-subheading text-uppercase text-center fw-500" style={{ paddingBottom: "30px" }}>Giày</h5>
                    <div className="fs-2 section-heading pb-5 text-uppercase fw-bold text-center">
                        Sản phẩm nổi bật
                    </div>
                    <div className="row">
                        {dataSourceToRender?.map((item) => {
                            const brandName = brandData?.find((brand: any) => brand._id == item.brand_id)?.name
                            const discount = Math.round(100 - (item.price_sale / item.price * 100))
                            return (
                                <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                    <div className="card product-main">
                                        <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                                            <div className="position-relative product-image overflow-hidden">
                                                <img src={item.images[0]} alt="" width="100%" height="300" className=" inset-0 object-cover" />
                                                <div className="product-hot" />
                                            </div>
                                            <div className="bg-white content-product w-100">
                                                <div className="product-detail row">
                                                    <div className="col-6 d-flex">
                                                    </div>
                                                    <div className="col-6 row justify-content-end">
                                                        <div className="col-2 m-1 product-color color-1" />
                                                        <div className="col-2 m-1 product-color color-2" />
                                                        <div className="col-2 m-1 product-color color-3" />
                                                    </div>
                                                </div>
                                                <div className="product-vendor">{brandName}</div>
                                                <h4 className="product-name ellipsis">
                                                    {item.name}
                                                </h4>
                                                {item.price_sale > 0 ? (
                                                    <div className="product-price row">
                                                        <strong className="col-12">{item.price_sale}đ</strong>
                                                        <div className="d-flex">
                                                            <del className="price-del">{item.price}đ</del>
                                                            <span className="product-discount">-{discount}%</span>
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

                    </div>
                </div></section>
        </div >
    )
}

export default Product

