import React from 'react'

const SaleWeek = () => {
    return (
        <div>
            <section className="our-team position-relative">
                <div className="container">
                    <div className="fs-2 section-heading text-uppercase fw-bold text-center">
                        Giảm Giá Tuần Này
                    </div>
                    <h5 className="fs-7 section-subheading text-uppercase text-center fw-500">Thương Hiệu</h5>
                    <div className="row ourteam-row position-relative container">
                        <div className="row ">
                            <div className="col-xxl-2 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <a href="#" className="d-block overflow-hidden no-underline m-2">
                                        <div className="position-relative overflow-hidden">
                                            <img src="/src/assets/images/sales/brand/skechers.png" alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xxl-2 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative overflow-hidden m-2">
                                            <img src="/src/assets/images/sales/brand/nike.png" alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xxl-2 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative overflow-hidden m-2">
                                            <img src="/src/assets/images/sales/brand/converse.png" alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xxl-2 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative overflow-hidden m-2">
                                            <img src="/src/assets/images/sales/brand/puma.png" alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xxl-2 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative overflow-hidden m-2">
                                            <img src="/src/assets/images/sales/brand/adidas.png" alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xxl-2 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative overflow-hidden m-2">
                                            <img src="/src/assets/images/sales/brand/fila.png" alt="" width="100%" height="100px" style={{ marginTop: '10%' }} className=" inset-0 object-cover" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ourteam-row w-100 position-relative ">
                        <div className="fs-2 section-heading p-5 text-uppercase fw-bold text-center">
                            Sản phẩm đang giảm giá
                        </div> {/* <div class="col-xxl-8 col-xl-8 col-lg-8 col-sm-8 col-12"> */}
                        <div className="row">
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1900327270_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-30" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
                                            <div className="product-detail pt-2 row text-center">
                                                <div className="col-6 d-flex">
                                                </div>
                                                <div className="col-6 row justify-content-end">
                                                    <div className="col-3 m-1 product-color color-1" />
                                                    <div className="col-3 m-1 product-color color-2" />
                                                    <div className="col-3 m-1 product-color color-3" />
                                                    {/* <div class="col-3 m-1 product-color color-4"></div> */}
                                                </div>
                                            </div>
                                            <div className="product-vendor">Nike</div>
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1900327070_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-50" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
                                            <div className="product-vendor">Nike</div>
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
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1900327270_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-20" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
                                            <div className="product-vendor">Nike</div>
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
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1902721070_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-30" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
                                            <div className="product-vendor">Nike</div>
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
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1902725970_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-50" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
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
                                            <div className="product-vendor">Nike</div>
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1902727070_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-30" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
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
                                            <div className="product-vendor">Nike</div>
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1922837270_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-50" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
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
                                            <div className="product-vendor">Nike</div>
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            <div className="product col-xxl-3 border-2 col-xl-3 col-lg-6 col-sm-6 col-12 p-2">
                                <div className="card product-main">
                                    <a href="#" className="d-block overflow-hidden no-underline">
                                        <div className="position-relative product-image overflow-hidden">
                                            <img src="/src/assets/images/products/1922861070_main.jpg" alt="" width="100%" height="auto" className=" inset-0 object-cover" />
                                            <div className="product-sale-30" />
                                            {/* <div class="product-category"></div> */}
                                        </div>
                                        <div className="bg-white content-product w-100 p-2">
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
                                            <div className="product-vendor">Nike</div>
                                            <h4 className="product-name">
                                                1 Nike ACG "Air Mada" shoes
                                            </h4>
                                            <div className="product-price row">
                                                <strong className="col-12">18.000.000đ</strong>
                                                <div className="d-flex">
                                                    <del className="price-del">23.000.000đ</del>
                                                    <span className="product-discount">-20%</span>
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
                            {/* </div> */}
                        </div>
                    </div>
                </div></section>
        </div>
    )
}

export default SaleWeek
