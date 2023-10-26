import React, { useEffect, useState } from 'react'
import Banner from '../home/Banner'
// import Modal from '../profile/Model';
import { useGetBrandsQuery } from '../../../services/brand.service';
import { useGetProductsQuery } from '../../../services/product.service';
import { IProducts } from '../../../types/product.service';
const Index = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: brandData } = useGetBrandsQuery();
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const [searchResult, setSearchResult] = useState<IProducts[]>([]);
    useEffect(() => {
        if (productData) {
            const updatedDataSource = productData.map(({ ...IProducts }) => ({ ...IProducts }));
            setDataSourceToRender(updatedDataSource);
        }
    }, [productData]);

    const onSearch = (value: string | number) => {
        let filteredData = dataSourceToRender;
        filteredData = filteredData.filter((item) => {
            return (
                item.id_product == value || item.id_user == value || item.rate == value
            );
        }
        );
        if (filteredData.length == 0) {
            alert('Không có bình luận nào cả!');
        }
        setSearchResult(filteredData);
    };
    return (
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <div className="row ourteam-row position-relative">
                        {/* <div class="col-xxl-8 col-xl-8 col-lg-8 col-sm-8 col-12"> */}
                        <div className="col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-12 col-12 p-2">
                            <div className="card ">
                                <div className="card-body top-0">
                                    <form>
                                        <fieldset>
                                            <legend>Tìm kiếm</legend>

                                            <div className="mb-3">
                                                <input type="text" id="disabledTextInput" className="form-control" placeholder="Tên sản phẩm" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="disabledSelect" className="form-label">Chọn thương hiệu</label>
                                                <select id="disabledSelect" className="form-select">
                                                    <option selected disabled>Chọn thương hiệu</option>
                                                    {brandData?.map((item) => {
                                                        return (
                                                            <option>{item.name}</option>
                                                        )
                                                    })
                                                    }

                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" />
                                                    <label className="form-check-label" htmlFor="disabledFieldsetCheck">
                                                        Giảm Giá
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Màu sắc:</label>
                                                <div className="form-color row">
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="colorRed" />
                                                        <label className="form-check-label" htmlFor="colorRed">Đỏ</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="colorBlue" />
                                                        <label className="form-check-label" htmlFor="colorBlue">Xanh</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="colorWhile" />
                                                        <label className="form-check-label" htmlFor="colorBlue">Trắng</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="colorBlack" />
                                                        <label className="form-check-label" htmlFor="colorBlue">Đen</label>
                                                    </div>
                                                </div>
                                                {/* Thêm thêm màu sắc theo mẫu tương tự */}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Kích cỡ:</label>
                                                <div className="form-size row">
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="sizeSmall" />
                                                        <label className="form-check-label" htmlFor="sizeSmall">35</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="sizeSmall" />
                                                        <label className="form-check-label" htmlFor="sizeSmall">36</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="sizeSmall" />
                                                        <label className="form-check-label" htmlFor="sizeSmall">37</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="sizeSmall" />
                                                        <label className="form-check-label" htmlFor="sizeSmall">38</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="sizeSmall" />
                                                        <label className="form-check-label" htmlFor="sizeSmall">39</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="sizeSmall" />
                                                        <label className="form-check-label" htmlFor="sizeSmall">40</label>
                                                    </div>
                                                    <div className="col-6 form-check">
                                                        <input className="form-check-input" type="checkbox" id="sizeSmall" />
                                                        <label className="form-check-label" htmlFor="sizeSmall">41</label>
                                                    </div>
                                                </div>
                                                {/* Thêm thêm kích cỡ theo mẫu tương tự */}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Giá cả:</label>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="priceUnder300" />
                                                    <label className="form-check-label" htmlFor="priceUnder50">Dưới 300.000đ
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="price300to1000" />
                                                    <label className="form-check-label" htmlFor="price50to100">300.000đ - 1.000.000đ
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="price1000to5000" />
                                                    <label className="form-check-label" htmlFor="priceOver100">1.000.000đ -
                                                        5.000.000đ
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="price5000to10000" />
                                                    <label className="form-check-label" htmlFor="priceOver100">5.000.000đ -
                                                        20.000.000đ
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="priceOver20000000" />
                                                    <label className="form-check-label" htmlFor="priceOver100">Trên 20.000.000đ
                                                    </label>
                                                </div>
                                                {/* Thêm thêm các khoảng giá khác theo mẫu tương tự */}
                                            </div>
                                            <input type="range" className="form-range" id="priceRange" min={0} max={20000000} />
                                            Khoảng giá từ 0 đến <span id="priceValue" />
                                        </fieldset>
                                        <button type="submit" className="btn btn-primary">Tìm kiếm</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row col-xxl-9 border-2 col-xl-9 col-lg-9 col-sm-12 col-12 p-2">
                            {dataSourceToRender?.map((item) => {
                                const brandName = brandData?.find((brand: any) => brand._id == item.brand_id)?.name
                                const discount = Math.round(100 - (item.price_sale / item.price * 100))
                                return (
                                    <div className="product col-xxl-4 border-2 col-xl-4 col-lg-4 col-sm-6 col-12 p-2">
                                        <div className="card product-main">
                                            <a href={"/product/" + item._id + "/detail"} className="d-block overflow-hidden no-underline">
                                                <div className="position-relative product-image overflow-hidden">
                                                    <img src={item.images[0]} alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                                    {/* <div class="product-sale-30"></div> */}
                                                    <div className="product-hot" />
                                                    {/* <div class="product-category"></div> */}
                                                </div>
                                                <div className="product-detail p-2 row text-center">
                                                    <div className="col-6 d-flex">
                                                    </div>
                                                    <div className="col-6 row justify-content-end">
                                                        <div className="col-3 m-1 product-color color-1" />
                                                        <div className="col-3 m-1 product-color color-2" />
                                                        <div className="col-3 m-1 product-color color-3" />
                                                        {/* <div class="col-3 m-1 product-color color-4"></div> */}
                                                    </div>
                                                </div>
                                                <div className="bg-white content-product w-100 p-2">
                                                    <div className="product-vendor">{brandName}</div>
                                                    <h4 className="product-name">
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
                            {/* </div> */}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </section>
        </div>
    )
}
export default Index