import React from 'react'

const ProductDetail = () => {
    return (
        <div>
            <div className="product_image_area">
                <div className="container">
                    <div className="row s_product_inner">
                        <div className="col-lg-5 offset-lg-1">
                            {/* <div className="s_Product_carousel"> */}
                            <div className="single-prd-item">
                                <img className="img-fluid" src="https://media.gq.com/photos/63e2b84fc3e6ea31f7c7dd30/3:2/w_1686,h_1124,c_limit/best-shoe-brands-nike-asics-celine.jpg" alt="" />
                            </div>
                            <div className="image-carosell d-flex p-2">
                                <div className="single-prd-item col-3 p-2">
                                    <img className="img-fluid" src="https://media.gq.com/photos/63e2b84fc3e6ea31f7c7dd30/3:2/w_1686,h_1124,c_limit/best-shoe-brands-nike-asics-celine.jpg" alt="" />
                                </div>
                                <div className="single-prd-item col-3 p-2">
                                    <img className="img-fluid" src="https://media.gq.com/photos/63e2b84fc3e6ea31f7c7dd30/3:2/w_1686,h_1124,c_limit/best-shoe-brands-nike-asics-celine.jpg" alt="" />
                                </div>
                                <div className="single-prd-item col-3 p-2">
                                    <img className="img-fluid" src="https://media.gq.com/photos/63e2b84fc3e6ea31f7c7dd30/3:2/w_1686,h_1124,c_limit/best-shoe-brands-nike-asics-celine.jpg" alt="" />
                                </div>
                                <div className="single-prd-item col-3 p-2">
                                    <img className="img-fluid" src="https://media.gq.com/photos/63e2b84fc3e6ea31f7c7dd30/3:2/w_1686,h_1124,c_limit/best-shoe-brands-nike-asics-celine.jpg" alt="" />
                                </div>

                            </div>
                            {/* </div> */}
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="s_product_text">
                                <h3>Adidas Ultra Boost 20</h3>
                                <h2>1.499.999 <span>VND</span></h2>

                                <ul className="list">
                                    <li><a className="active" href="#"><span>Danh Mục</span> : Household</a></li>
                                    <li> <i>Sự Kết Hợp Hoàn Hảo Giữa Thể Thao và Thời Trang</i></li>
                                </ul>
                                <p className='description-product'>Giày Adidas Ultra Boost 20 là một sản phẩm giày thể thao cao cấp, đem lại sự kết hợp hoàn hảo giữa hiệu suất thể thao và phong cách thời trang. Được ra mắt bởi thương hiệu nổi tiếng Adidas, đây là một sản phẩm giày đáng chú ý dành cho những người yêu thể thao và thời trang.</p>

                                <div className="product-detail d-flex">
                                    <div className="product-size w-25">
                                        <p>Kích Cỡ</p>
                                        <select className='product-detail-size' name="" id="">
                                            <option value="">A</option>
                                            <option value="">B</option>
                                            <option value="">C</option>
                                        </select>
                                    </div>
                                    <div className="product__filter-item  w-75">
                                        <p>Màu Sắc</p>
                                        <div className="product-color-main d-flex">
                                            <div className="filter__form-item">
                                                <input type="radio" id="productBand1" name="productBand" value="adidas" />
                                                <label className="productColor-red" for="productBand1"></label>
                                            </div>
                                            <div className="filter__form-item">
                                                <input type="radio" id="productBand2" name="productBand" value="converse" />
                                                <label className="productColor-blue" for="productBand2"></label>
                                            </div>
                                            <div className="filter__form-item">
                                                <input type="radio" id="productBand3" name="productBand" value="mlb" />
                                                <label className="productColor-black" for="productBand3"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product_count">
                                    <label className='quantity'>Số Lượng:</label>
                                    <input type="number" minLength={1} maxLength={999} />
                                </div>
                                <div className="product_count m-4">
                                    <label className='quantity'>Số lượng trong kho:</label>
                                    <input type="number" disabled value={9} minLength={1} maxLength={999} />
                                </div>

                                <div className="card_area d-flex align-items-center">
                                    <a className="primary-btn" href="#">Add to Cart</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail