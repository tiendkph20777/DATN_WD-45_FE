import React, { useEffect, useState } from "react";
import { IProducts } from "../../../../types/product.service";
import { useGetProductsQuery } from "../../../../services/product.service";
import { useGetBrandsQuery } from "../../../../services/brand.service";
import { Pagination } from "antd";

const Index = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: brandData } = useGetBrandsQuery();
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        if (productData) {
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const updatedDataSource = productData.slice(startIndex, endIndex).map(({ ...IProducts }) => ({
                ...IProducts,
            }));
            setDataSourceToRender(updatedDataSource);
        }
    }, [productData, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <div className="row ourteam-row position-relative">
                        <div className="fs-2 mb-4 mt-5 section-heading text-uppercase fw-bold">
                            Sản phẩm mới
                        </div>
                        <div className="row border-2 p-2">
                            {dataSourceToRender?.map((item) => {
                                const brandName = brandData?.find(
                                    (brand: any) => brand._id == item.brand_id
                                )?.name;
                                const discount = Math.round(
                                    100 - (item.price_sale / item.price) * 100
                                );
                                return (
                                    <div className="product col-xxl-3 border-2 col-xl-3 col-lg-3 col-sm-4 col-6 p-2">
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
                                                        className=" inset-0 object-cover"
                                                    />
                                                    {/* <div class="product-sale-30"></div> */}
                                                    <div className="product-hot" />
                                                    {/* <div class="product-category"></div> */}
                                                </div>
                                                <div className="product-detail p-2 row text-center">
                                                    <div className="col-6 d-flex"></div>
                                                    <div className="col-6 row justify-content-end">
                                                        <div className="col-3 m-1 product-color color-1" />
                                                        <div className="col-3 m-1 product-color color-2" />
                                                        <div className="col-3 m-1 product-color color-3" />
                                                        {/* <div class="col-3 m-1 product-color color-4"></div> */}
                                                    </div>
                                                </div>
                                                <div className="bg-white content-product w-100 p-2">
                                                    <div className="product-vendor">{brandName}</div>
                                                    <h4 className="product-name ellipsis">{item.name}</h4>
                                                    {item.price_sale > 0 ? (
                                                        <div className="product-price row">
                                                            <strong className="col-12">
                                                                {item.price_sale}đ
                                                            </strong>
                                                            <div className="d-flex">
                                                                <del className="price-del">{item.price}đ</del>
                                                                <span className="product-discount">
                                                                    -{discount}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="product-price row">
                                                            <strong className="col-12">{item.price}đ</strong>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="product-action pt-5 row text-center justify-content-center">
                                                    <div className="col-6">
                                                        <img
                                                            src="/src/assets/images/products/icons/read.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <img
                                                            src="/src/assets/images/products/icons/cart.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <Pagination
                        defaultCurrent={1}
                        total={productData?.length || 0}
                        pageSize={productsPerPage}
                        onChange={handlePageChange}
                        style={{ display: "flex", justifyContent: "center", fontSize: "24px", margin: "20px" }}
                    />

                </div>
            </section>
        </div>
    );
};
export default Index;
