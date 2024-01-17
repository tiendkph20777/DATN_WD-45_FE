import { useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { useGetProductsQuery } from "../../../services/product.service";
import { IProducts } from "../../../types/product2";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import { IProductDetail } from "../../../types/product";

const Index = () => {
  const { data: productData, isLoading } = useGetProductsQuery();
  const { data: productDTData } = useGetAllProductsDetailQuery();
  const { data: brandData } = useGetBrandsQuery();

  const [dataSourceToRender, setDataSourceToRender] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [dataDTToRender, setDataDTToRender] = useState<IProductDetail[]>([]);
  const [dataDTResult, setdataDThResult] = useState<IProductDetail[]>([]);

  useEffect(() => {
    if (productData) {
      // Sử dụng trạng thái trực tiếp từ dữ liệu sản phẩm
      const updatedDataSource = productData.map((product: IProducts) => ({
        ...product,
        status: product.status !== undefined ? product.status : true,
      }));

      // Ẩn các sản phẩm có trạng thái false
      const visibleProducts: any = updatedDataSource.filter(
        (product) => product.status
      );

      setDataSourceToRender(visibleProducts);
      setSearchResult(visibleProducts);
    }
  }, [productData]);

  useEffect(() => {
    if (productDTData) {
      const updatedDataDT = productDTData.map(({ ...IProductDetail }) => ({
        ...IProductDetail,
      }));
      setDataDTToRender(updatedDataDT);
      setdataDThResult(updatedDataDT);
    }
  }, [productDTData]);

  let DTData = (itemm: any) =>
    productDTData?.filter((item) => item.product_id === itemm._id);
  let filteredDataDT = dataDTToRender;
  let filteredData: any = dataSourceToRender;
  let setColor = [dataDTToRender?.map((item: any) => item.color)];
  let color = [...new Set(setColor[0])];
  let setSize = [dataDTToRender?.map((item: any) => item.size)];
  let Size = [...new Set(setSize[0])];

  const [role, setRole] = useState('');
  const [hehe, setHehe] = useState('color');
  const [huhu, setHuhu] = useState('size');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    filteredData = filteredData.filter(
      (itemm: any) =>
        itemm.brand_id == role &&
        DTData(itemm)?.find((itemd) => itemd.color == hehe) &&
        DTData(itemm)?.find((itemd: any) => itemd.size == huhu)
    );
    if (filteredData.length > 1) {
      setDataSourceToRender(filteredData);
    }
    else {
      filteredData = searchResult;
      filteredData = filteredData.filter(
        (itemm: any) =>
          itemm.brand_id == role &&
          DTData(itemm)?.find((itemd) => itemd.color == hehe) &&
          DTData(itemm)?.find((itemd: any) => itemd.size == huhu)
      );
      setDataSourceToRender(filteredData);
    }

    if (filteredData.length == 0) {
      alert('Sản phẩm không có vui lòng nhập lại')
      filteredData = searchResult;
      setDataSourceToRender(filteredData);
      setRole('Thương hiệu');
      setHehe('Màu sắc');
      setHuhu('Kích cỡ');
    }
  };

  const onHandleClick = (value: any) => {
    filteredData = filteredData.filter(
      (itemm: any) =>
        itemm.brand_id == value ||
        DTData(itemm)?.find((itemd) => itemd.color == value) ||
        DTData(itemm)?.find((itemd) => itemd.size == value)
    );
    if (filteredData.length > 1) {
    } else {
      filteredData = searchResult;
      filteredData = filteredData.filter(
        (itemm: any) =>
          itemm.brand_id == value ||
          DTData(itemm)?.find((itemd) => itemd.color == value) ||
          DTData(itemm)?.find((itemd) => itemd.size == value)
      );
    }

    filteredDataDT = filteredDataDT.filter(
      (itemm) => filteredData?.find((item: any) => item._id == itemm.product_id)?._id
    );
    if (filteredDataDT.length > 0) {
      setDataDTToRender(filteredDataDT);
    } else {
      filteredDataDT = dataDTResult;
      filteredDataDT = filteredDataDT.filter(
        (itemm) =>
          filteredData?.find((item: any) => item._id == itemm.product_id)?._id
      );
      setDataDTToRender(filteredDataDT);
    }

  };


  const handleReset = () => {
    filteredData = searchResult;
    setDataSourceToRender(filteredData);
    setRole('Thương hiệu');
    setHehe('Màu sắc');
    setHuhu('Kích cỡ');
  }
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
        <div className="container">
          <div>
            <div className="d-flex justify-content-between">
              <div className="mb-3 d-flex">
                <span
                  style={{ color: "black", fontSize: "20px", padding: "10px" }}
                >
                  Tìm kiếm theo
                  <form onSubmit={handleSubmit}>
                    <select
                      id="role"
                      name="role"
                      value={role}
                      style={{ width: '200px' }}
                      className="form-select-product"
                      onChange={(e) => {
                        setRole(e.target.value),
                          onHandleClick(e.target.value)
                      }}
                    >
                      <option selected >
                        Thương hiệu
                      </option>
                      {brandData?.map((item) => {
                        return <option value={item._id}>{item.name}</option>;
                      })}
                    </select>
                    <select
                      id="hehe"
                      name="hehe"
                      value={hehe}
                      className="form-select-product"
                      onChange={(e) => {
                        setHehe(e.target.value)
                          , onHandleClick(e.target.value)
                      }}
                    >
                      <option selected >
                        Màu sắc
                      </option>
                      {color?.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                    <select
                      id="huhu"
                      name="huhu"
                      value={huhu}
                      className="form-select-product"
                      onChange={(e) => {
                        setHuhu(e.target.value)
                          , onHandleClick(e.target.value)
                      }}
                    >
                      <option selected>
                        Kích cỡ
                      </option>
                      {Size?.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>


                    <button type="submit" className="btn btn-primary">Lọc</button>
                    <button onClick={handleReset} type="button" className="btn btn-info mx-3">Reset</button>
                  </form>
                </span>

              </div>
            </div>
            <br />
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3">
              {dataSourceToRender?.map((item: any) => {
                const brandName = brandData?.find(
                  (brand: any) => brand._id == item.brand_id
                )?.name;
                const discount = Math.round(
                  100 - (item.price_sale / item.price) * 100
                );
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
                            height="auto"
                            className=" inset-0 object-cover"
                          />
                        </div>
                        <div className="bg-white content-product w-100 p-2">
                          <div className="product-detail px-3 row ">
                            <div className="col-12 row px-2">
                              <div className="col-1 m-1 product-color color-1" />
                            </div>
                          </div>
                          <div className="product-vendor">{brandName}</div>
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
                                  -{discount}%
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
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Index;
