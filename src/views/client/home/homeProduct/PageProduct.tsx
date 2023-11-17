import { useEffect, useState } from "react";
import { IProducts } from "../../../../types/product.service";
import { useGetProductsQuery } from "../../../../services/product.service";
import { useGetBrandsQuery } from "../../../../services/brand.service";
import { Pagination } from "antd";

const PageProduct = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: brandData } = useGetBrandsQuery();
    const brandName = (item: any) => brandData?.find((brand: any) => brand._id == item.brand_id)?.name
    const discount = (item: any) => Math.round(100 - (item.price_sale / item.price * 100))
    const [searchResult, setSearchResult] = useState<IProducts[]>([]);
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        if (productData) {
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const updatedDataSource = productData.slice(startIndex, endIndex).map(({ ...IProducts }) => ({
                ...IProducts,
            }));
            setDataSourceToRender(updatedDataSource);
            setSearchResult(updatedDataSource)
        }
    }, [productData, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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

    return (
        <div>
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
                    <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3">
                        {/* <div className="row row-cols-lg-5 g-2 g-lg-3"> */}
                        {dataSourceToRender.slice(0, 15).map((item) => {
                            return (
                                <div className="product border-2 p-2" key={item._id}>
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
                                                <h4 className="product-name ellipsis">
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
export default PageProduct;
