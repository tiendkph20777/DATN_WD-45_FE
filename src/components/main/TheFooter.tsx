import React from 'react'
import '/public/HomeTemplate/dist/js/jquery.min'
import '/public/HomeTemplate/dist/js/bootstrap.min'
import '/public/HomeTemplate/dist/js/custom'

const TheFooter = () => {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 col-xxl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="footer-logo-col">
                                <a href="#"><img width="auto" height="120px" src="/src/assets/images/logo.png" /></a>
                                {/* <p className="copyrights fs-5 mb-0">Thiết kế bởi @ Laxus <span id="autodate" /></p> */}
                                <ul className="social-icons list-unstyled mb-0 pl-0 pt-4 d-flex align-items-center">
                                    <li><a href="#" className="rounded-circle"><img src="/src/assets/images/footer/icon_facebook.svg" /><img src="../assets/images/footer/icon_facebook_white.svg" /></a></li>
                                    <li><a href="#" className="rounded-circle"><img src="/src/assets/images/footer/icon_twitter.svg" /><img src="../assets/images/footer/icon_twitter_white.svg" /></a></li>
                                    <li><a href="#" className="rounded-circle"><img src="/src/assets/images/footer/icon_google_plus.svg" /><img src="../assets/images/footer/icon_google_plus_white.svg" /></a></li>
                                    <li><a href="#" className="rounded-circle"><img src="/src/assets/images/footer/icon_linkdin.svg" /><img src="../assets/images/footer/icon_linkdin_white.svg" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xxl-3 col-lg-3 col-md-4 col-sm-12 col-12">
                            <h5 className="text-secondary fw-bold fs-4">Danh Mục</h5>
                            <ul className="list-unstyled mb-0 pl-0">
                                <li><a href="#" className="text-capitalize fs-6 text-decoration-none">Trang Chủ</a></li>
                                <li><a href="#" className="text-capitalize fs-6 text-decoration-none">Giới Thiệu</a></li>
                                <li><a href="#" className="text-capitalize fs-6 text-decoration-none">Sản Phẩm</a></li>
                                <li><a href="#" className="text-capitalize fs-6 text-decoration-none">Tin Tức</a></li>
                                <li><a href="#" className="text-capitalize fs-6 text-decoration-none">Khuyến Mại</a></li>
                                <li><a href="#" className="text-capitalize fs-6 text-decoration-none">Liên Hệ</a></li>
                            </ul>
                        </div>
                        <div className="col-xxl-5 col-xxl-5 col-lg-5 col-md-8 col-sm-12 col-12">
                            <h5 className="text-secondary fw-bold fs-4">Tin Tức</h5>
                            <div className="blog mb-3">
                                <p className="mb-0 fs-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum nulla
                                    architecto, obcaecati natus consequatur fugiat, nostrum vero molestiae modi illo optio
                                    sunt
                                    neque accusantium delectus suscipit corrupti. Omnis, impedit mollitia!</p>
                                <p className="mt-2 fs-6">16 Mar,2021</p>
                            </div>
                            {/* <div className="blog mb-3">
                                <p className="mb-0 fs-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
                                    aliquid,
                                    quae delectus eum facere expedita distinctio in unde! Ipsa repellendus, quae quam error
                                    beatae eaque ratione perferendis. Quis, excepturi tenetur.</p>
                                <p className="mt-2 fs-6">16 Mar,2021</p>
                            </div> */}
                            <div className="blog">
                                <a href="#" className="text-decoration-none text-primary text-capitalize fs-6">Đọc Thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default TheFooter


