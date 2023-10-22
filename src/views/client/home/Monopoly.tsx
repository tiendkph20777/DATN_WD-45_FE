import React from 'react'

const Monopoly = () => {
    return (
        <div>
            <section className="section-bg-icons position-relative">
                {/*--------------------------*/}
                {/*- Our Team Section Start--*/}
                {/*--------------------------*/}
                <section className="our-team position-relative">
                    <div className="container">
                        <h5 className="fs-5 section-subheading text-uppercase text-center fw-500" style={{ padding: "30px" }}>Tin Tức</h5>
                        <div className="fs-2 section-heading text-uppercase fw-bold text-center" style={{ marginBottom: "50px" }}>
                            Tin Tức Mới Nhất
                        </div>
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <div className="post-entry-alt">
                                    <a href="single.html" className="img-link"><img src="https://media.gq.com/photos/646fd8dc1fa990bc7018eb25/3:4/w_640,c_limit/Layer_17.jpg" alt="Image" className="img-fluid" /></a>
                                    <div className="excerpt">
                                        <h2><a href="single.html">Startup vs corporate: What job suits you best?</a></h2>
                                        <div className="post-meta align-items-center text-left clearfix">
                                            <figure className="author-figure mb-0 me-3 float-start"><img src="https://media.gq.com/photos/646fd8dc1fa990bc7018eb25/3:4/w_640,c_limit/Layer_17.jpg" alt="Image" className="img-fluid" /></figure>
                                            <span className="d-inline-block mt-1">By <a href="#">David Anderson</a></span>
                                            <span>&nbsp;-&nbsp; July 19, 2019</span>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor
                                            laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo,
                                            aliquid, dicta beatae quia porro id est.</p>
                                        <p><a href="#" className="read-more">Continue Reading</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="post-entry-alt">
                                    <a href="single.html" className="img-link"><img src="https://media.gq.com/photos/646fd8dc1fa990bc7018eb25/3:4/w_640,c_limit/Layer_17.jpg" alt="Image" className="img-fluid" /></a>
                                    <div className="excerpt">
                                        <h2><a href="single.html">Startup vs corporate: What job suits you best?</a></h2>
                                        <div className="post-meta align-items-center text-left clearfix">
                                            <figure className="author-figure mb-0 me-3 float-start"><img src="https://media.gq.com/photos/646fd8dc1fa990bc7018eb25/3:4/w_640,c_limit/Layer_17.jpg" alt="Image" className="img-fluid" /></figure>
                                            <span className="d-inline-block mt-1">By <a href="#">David Anderson</a></span>
                                            <span>&nbsp;-&nbsp; July 19, 2019</span>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor
                                            laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo,
                                            aliquid, dicta beatae quia porro id est.</p>
                                        <p><a href="#" className="read-more">Continue Reading</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="post-entry-alt">
                                    <a href="single.html" className="img-link"><img src="https://media.gq.com/photos/646fd8dc1fa990bc7018eb25/3:4/w_640,c_limit/Layer_17.jpg" alt="Image" className="img-fluid" /></a>
                                    <div className="excerpt">
                                        <h2><a href="single.html">Startup vs corporate: What job suits you best?</a></h2>
                                        <div className="post-meta align-items-center text-left clearfix">
                                            <figure className="author-figure mb-0 me-3 float-start"><img src="https://media.gq.com/photos/646fd8dc1fa990bc7018eb25/3:4/w_640,c_limit/Layer_17.jpg" alt="Image" className="img-fluid" /></figure>
                                            <span className="d-inline-block mt-1">By <a href="#">David Anderson</a></span>
                                            <span>&nbsp;-&nbsp; July 19, 2019</span>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor
                                            laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo,
                                            aliquid, dicta beatae quia porro id est.</p>
                                        <p><a href="#" className="read-more">Continue Reading</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </section>
            </section>
            {/*---------------------------*/}
            {/* Blog Section End */}
            {/*---------------------------*/}
            <section className="contact position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                            <h5 className="fs-5 section-subheading text-uppercase fw-500" style={{ paddingBottom: "10px" }}>Liên Hệ Ngay</h5>
                            <div className="fs-2 section-heading text-uppercase fw-bold" style={{ lineHeight: "90px" }}>
                                Bạn gặp vấn đề?<br /> Liên hệ ngay với chúng tôi tại đây
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                            <form>
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label text-uppercase fs-6 mb-3">Họ và tên</label>
                                            <input type="text" className="form-control border-0" placeholder="Enter your name" />
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label text-uppercase mb-3">Email</label>
                                            <input type="email" className="form-control border-0" placeholder="Enter your email" />
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label text-uppercase fs-6 mb-3">Số điện thoại</label>
                                            <input type="text" className="form-control border-0" placeholder="Enter your phone no" />
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="form-group">
                                            <label className="form-label text-uppercase mb-3">Vấn đề gặp phải</label>
                                            <select className="form-control border-0">
                                                <option selected disabled>[vấn đề]</option>
                                                <option>Sửa giày</option>
                                                <option>Báo cáo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xxl-12 col-xl-12 col-12">
                                        <div className="mb-xxl-4 mb-xl-4 mb-lg-4 mb-md-4 mb-sm-3 mb-3">
                                            <label className="form-label text-uppercase mb-3">Nội dung</label>
                                            <textarea className="form-control border-0" placeholder="Enter your message" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                        {/* <div class="g-recaptcha" data-sitekey="6Lel4Z4UAAAAAOa8LO1Q9mqKRUiMYl_00o5mXJrR"></div>*/}
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 d-flex justify-content-end">
                                        <button className="btn btn-primary btn-hover-secondery text-capitalize mt-2 w-100">Gửi</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Monopoly
