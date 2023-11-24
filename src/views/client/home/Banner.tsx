import React from 'react'


const Banner = () => {


    return (
        <div>
            <section className="hero-banner position-relative">
                <div className="hero-bg-icons" />
                <div className="left-white-overlay position-relative" />
                <div className="right-white-overlay position-relative" />
                <div className="container position-relative">
                    <div className="left-icon">
                        <img src="/src/assets/images/hero/shoe01.png" className="img-fluid position-absolute" />
                    </div>
                    <div className="right-icon">
                        <img src="/src/assets/images/hero/shoe02.png" className="img-fluid position-absolute" />
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-12 col-sm-12 col-12 text-center">
                            <div className="hero-title fs-1 fw-bold text-uppercase">
                                {/* Dịch vụ chuyên nghiệp sửa chữa, làm mới, và giặt giày toàn quốc<br> */}
                                <div className="highlight-hero-title position-relative">
                                    <div className="highlight-hero-title-inner">
                                        ShiftOes
                                    </div>
                                </div>
                                Dịch vụ vô tận
                            </div>
                            <p className="hero-subtitle fs-5 fw-normal mx-auto mb-0">ShiftOes ra đời vào năm 2023, với tâm huyết và
                                đam mê về việc cung cấp dịch vụ bán, sửa giày cho người dùng trên khắp
                                cả nước.</p>
                            <div className="hero-action d-flex flex-wrap justify-content-center gap-3">
                                {/* <a href="#" className="btn btn-primary btn-hover-secondery text-capitalize fw-normal">Đọc thêm &gt;</a> */}
                                <a href="tel:0332573175" className="btn btn-outline-primary btn-hover-outline-secondery text-capitalize fw-normal">Liên
                                    Hệ</a>
                            </div>
                            <div className="scrollspy-icon d-inline-block">
                                <a href="#feature-of-design">
                                    <div className="pulse-animation">
                                        <div className="pulse position-relative mx-auto">
                                            <div className="ring" />
                                            <div className="ring" />
                                            <div className="ring" />
                                            <div className="ring" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner
