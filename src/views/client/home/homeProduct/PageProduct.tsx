import { useEffect, useState } from "react";
import { IProducts } from "../../../../types/product2";
import {
  useGetProductsQuery,
  useUpdateProductStatusMutation,
} from "../../../../services/product.service";
import { useGetBrandsQuery } from "../../../../services/brand.service";

const PageProduct = () => {
  const { data: productData, isLoading } = useGetProductsQuery();
  const { data: brandData } = useGetBrandsQuery();
  const brandName = (item: any) =>
    brandData?.find((brand: any) => brand._id == item.brand_id)?.name;
  const discount = (item: any) =>
    Math.round(100 - (item.price_sale / item.price) * 100);
  const [searchResult, setSearchResult] = useState([]);
  const [dataSourceToRender, setDataSourceToRender] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [productStatus, setProductStatus] = useState<Record<string, boolean>>(
    {}
  );
  const [updateProductStatus] = useUpdateProductStatusMutation();

  useEffect(() => {
    // Lấy trạng thái sản phẩm từ Server khi component được tải
    if (productData) {
      const updatedDataSource = productData.map((product: IProducts) => ({
        ...product,
        status:
          productStatus[product._id] !== undefined
            ? productStatus[product._id]
            : true,
      }));

      // Ẩn các sản phẩm có trạng thái false
      const visibleProducts = updatedDataSource.filter(
        (product) => product.status
      );

      setDataSourceToRender(visibleProducts);
      setSearchResult(visibleProducts);
    }
  }, [productData, productStatus]);

  useEffect(() => {
    if (productData) {
      // Sort products by the creation date in descending order (newest first)
      const sortedProductData = [...productData].sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const updatedDataSource = sortedProductData
        .slice(startIndex, endIndex)
        .map(({ ...IProducts }) => ({
          ...IProducts,
        }));

      setDataSourceToRender(updatedDataSource);
      setSearchResult(updatedDataSource);
    }
  }, [productData, currentPage, productsPerPage]);
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
      <section className="our-team position-relative">
        <div className="container_home">
          <div className="d-flex pb-5">
            <div className="fs-5 text-uppercase fw-bold">- SẢN PHẨM MỚI</div>
            <div>
              <div className="d-flex flex-row mx-4 w-full">
                {brandData?.map((item) => {
                  return (
                    <div className="brandIcon" key={item._id}>
                      <div onClick={() => onHandleClick(item._id)}>
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3">
            {dataSourceToRender.slice(0, 17).map((item) => {
              if (item.status) {
                return (
                  <div className="product border-2 p-2" key={item._id}>
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
                            height="300"
                            className=" inset-0 object-cover"
                          />
                        </div>
                        <div className="bg-white content-product w-100 p-2 pt-4">
                          <div className="product-detail px-3 row ">
                            <div className="col-12 row px-2">
                              {/* <div className="col-1 m-1 product-color " style={{ backgroundColor: color }} /> */}
                              <div className="col-1 m-1 product-color color-2" />
                              <div className="col-1 m-1 product-color color-3" />
                            </div>
                          </div>
                          <div className="product-vendor">
                            {brandName(item)}
                          </div>
                          <h4 className="product-name ellipsis">{item.name}</h4>
                          {item.price_sale > 0 ? (
                            <div className="product-price row">
                              <strong className="col-12">
                                {item.price_sale.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </strong>
                              <div className="d-flex">
                                <del className="price-del">
                                  {item.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </del>
                                <span className="product-discount">
                                  -{discount(item)}%
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="product-price row">
                              <strong className="col-12">
                                {item.price.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </strong>
                            </div>
                          )}
                        </div>
                        <div className="product-action pt-5 row text-center justify-content-center">
                          <div className="col-6">
                            <img src="/src/assets/icons/read.svg" alt="" />
                          </div>
                          <div className="col-6">
                            <img src="/src/assets/icons/cart.svg" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default PageProduct;
