const Discover = () => {
  return (
    <div>
      <section className="section-bg-icons position-relative">
        <section className="awasome-feature position-relative pt-2">
          <div className="container">
            <h5
              className="fs-5 section-subheading text-uppercase fw-500 text-center"
              style={{ paddingBottom: "20px" }}
            >
              Đặc Quyền Độc Quyền
            </h5>
            <div
              className="fs-3 section-heading text-uppercase fw-bold text-center"
              style={{ lineHeight: "50px" }}
            >
              Hãy cùng tôi khám phá những ưu đãi độc quyền chỉ có tại{" "}
              <div className="text-logo">ShiftOes</div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-xxl-3 col-xl-3 col-md-3 col-sm-6 col-12 text-center">
                <div className="feature-card">
                  <img src="/src/assets/images/features/e-commerce.svg" />
                  <h4 className="text-uppercase fw-bold text-secondary pt-4">
                    Nhiều Ưu Đãi Hấp Dẫn
                  </h4>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-md-3 col-sm-6 col-12 text-center">
                <div className="feature-card">
                  <img src="/src/assets/images/features/responsive-design.svg" />
                  <h4 className="text-uppercase fw-bold text-secondary pt-4">
                    Voucher lên tới
                    <br /> 22%
                  </h4>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-md-3 col-sm-6 col-12 text-center">
                <div className="feature-card">
                  <img src="/src/assets/images/features/freindly-support.svg" />
                  <h4 className="text-uppercase fw-bold text-secondary pt-4">
                    Thông Tin Được Bảo Mật
                  </h4>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-md-3 col-sm-6 col-12 text-center">
                <div className="feature-card">
                  <img src="/src/assets/images/features/creative.svg" />
                  <h4 className="text-uppercase fw-bold text-secondary pt-4">
                    Nhiều Ưu Đãi Khác
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="our-portfolio position-relative">
          {/* <div className="container">
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-center">
                                <a href="#" className="btn btn-primary btn-hover-secondery text-capitalize fw-normal">Đăng ký
                                    ngay</a>
                            </div>
                        </div>
                    </div> */}
          <div className="">
            <img
              src="/src/assets/images/our-portfolio/waves.svg"
              className="w-100 position-relative wave"
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Discover;
