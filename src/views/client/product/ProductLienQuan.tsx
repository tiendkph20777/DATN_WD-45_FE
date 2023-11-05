import React, { useState, useEffect } from "react";
import {
    useGetProductByIdQuery,
    useGetProductsQuery,
} from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import "./styles.css";
import { IProducts } from "../../../types/product.service";
import { useParams } from "react-router-dom";

const ProductLienQuan = () => {
    const { data: productData } = useGetProductsQuery();
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

    return (
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <h1>Sản Phẩm Liên Quan</h1>
                    <div className="row ourteam-row position-relative">
                        <div className="row col-xxl-9 border-2 col-xl-9 col-lg-9 col-sm-12 col-12 p-2">
                            {dataSourceToRender?.map((item) => {
                                if (item.brand_id === prodetailData?.brand_id) {
                                    const brandName = brandData?.find(
                                        (brand: any) => brand._id === item.brand_id
                                    )?.name;
                                    const discount = Math.round(
                                        100 - (item.price_sale / item.price) * 100
                                    );
                                    return (
                                        <div
                                            className="product col-xxl-4 border-2 col-xl-4 col-lg-4 col-sm-6 col-12 p-2"
                                            key={item._id}
                                        >
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
                                                            className="inset-0 object-cover"
                                                        />
                                                        <div className="product-hot" />
                                                    </div>
                                                    <div className="bg-white content-product w-100 p-2">
                                                        <div className="product-vendor">{brandName}</div>
                                                        <h4 className="product-name">{item.name}</h4>
                                                        {item.price_sale > 0 ? (
                                                            <div className="product-price row">
                                                                <strong className="col-12">
                                                                    {item.price_sale}đ
                                                                </strong>
                                                                <div className="d-flex">
                                                                    <del className="price-del">
                                                                        {item.price}đ
                                                                    </del>
                                                                    <span className="product-discount">
                                                                        -{discount}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="product-price row">
                                                                <strong className="col-12">
                                                                    {item.price}đ
                                                                </strong>
                                                            </div>
                                                        )}
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductLienQuan
