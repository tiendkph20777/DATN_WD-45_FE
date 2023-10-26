import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const TheHeader = () => {
    useEffect(() => {
        // Sử dụng sự kiện cuộn trong React để thêm hoặc loại bỏ lớp "sticky" cho tiêu đề.
        const handleScroll = () => {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            }
        };

        // Gắn sự kiện cuộn vào cửa sổ.
        window.addEventListener('scroll', handleScroll);

        // Xoá sự kiện cuộn khi component bị hủy.
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);
    return (
        <div>
            <header className="main-header position-fixed w-100">
                <div className="" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                    <nav className="navbar navbar-expand-xl py-0">
                        <a className="d-inline-block d-lg-block d-xl-none d-xxl-none  nav-toggler text-decoration-none"
                            data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">
                            <i className="ti ti-menu-2"></i>
                        </a>
                        <div className="logo">
                            <a className="navbar-brand py-0 me-0" href="/"><img src="/src/assets/images/logo.png" width="auto"
                                height="70px" alt="" /></a>
                        </div>
                        <a className="d-inline-block d-lg-block d-xl-none d-xxl-none nav-toggler text-decoration-none text-capitalize mr-5"
                            style={{ paddingTop: 8 }} href="cart.html">
                            <img src="/src/assets/images/cart.svg" alt="" className="cart-icon" />
                            <span className="count-cart">15</span>
                        </a>
                        <form action="" method="" className="form form-search d-flex w-25">
                            <input type="text" placeholder="Tìm kiếm sản phẩm, thương hiệu.." />
                            <i className="ti ti-search"></i>
                        </form>
                        <style>
                            {`
                                .form-search {
                                padding: 15px 10px;
                                box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
                                border-radius: 100px;
                                background: #fff;
                                margin-left: 2em;
                                }
                                .form-search input {
                                margin-left: 10px;
                                width: 100%;
                                border: none;
                                outline: none;
                                line-height: 20px;
                                }
                                .form-search i {
                                line-height: 20px;
                                }
                            `}
                        </style>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link to="/" className='nav-link'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/product" className='nav-link'>Sản Phẩm</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className='nav-link'>Giới Thiệu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className='nav-link'>Tin Tức</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className='nav-link'>Liên Hệ</Link>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center">
                                <Link to={"/cart"} className="cart">
                                    <img src="/src/assets/images/cart.svg" alt="" className="cart-icon" />
                                    <span className="count-cart">15</span>
                                </Link>
                                <Link className="btn btn-signin btn-primary m-2 btn-hover-secondery text-capitalize"
                                    to="/signin">Đăng Nhập
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <div className="logo">
                            <a className="navbar-brand py-0 me-0" href="#"><img width="100%" height="auto"
                                src="" alt="" /></a>
                        </div>
                        <button type="button" className="btn-close text-reset  ms-auto" data-bs-dismiss="offcanvas"
                            aria-label="Close"><i className="ti ti-x"></i></button>
                    </div>
                    <div className="offcanvas-body pt-0">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Trang Chủ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Giới Thiệu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sản Phẩm</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Tin Tức</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Khuyến Mại</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Liên Hệ</a>
                            </li>
                        </ul>
                        <div className="login d-block align-items-center">
                            <a className="btn btn-primary text-capitalize w-100" href="#">Đăng Nhập</a>
                        </div>
                    </div>
                </div>
            </header>
        </div>

    )
}

export default TheHeader
