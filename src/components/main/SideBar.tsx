import React from 'react'
import { Link } from 'react-router-dom'
import '/public/AdminTemplate/src/assets/js/app.min'
import '/public/AdminTemplate/src/assets/js/dashboard'
import '/public/AdminTemplate/src/assets/js/sidebarmenu'


const SideBar = () => {
    return (
        <aside className="left-sidebar">
            {/* <!-- Sidebar scroll--> */}
            <div className="brand-logo d-flex align-items-center justify-content-between">
                {/* <Link to="/" className="text-nowrap logo-img">
                    <img src="" width="180" alt="" />
                </Link>
                <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                    <i className="ti ti-x fs-8"></i>
                </div> */}
                <div className="logo">
                    <a className="navbar-brand py-0 me-0" href="#"><img src="/src/assets/images/logo.png" width="auto"
                        height="70px" alt="" /></a>
                </div>
            </div>
            {/* <!-- Sidebar navigation--> */}
            <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                <ul id="sidebarnav">
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">Admin</span>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/" aria-expanded="false">
                            <span>
                                <i className="ti ti-layout-dashboard"></i>
                            </span>
                            <span className="hide-menu">Quay lại trang chủ</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin" aria-expanded="false">
                            <span>
                                <i className="ti ti-layout-dashboard"></i>
                            </span>
                            <span className="hide-menu">Tổng Quan</span>
                        </Link>
                    </li>
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">Sản Phẩm</span>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/product" aria-expanded="false">
                            <span>
                                <i className="ti ti-alert-circle"></i>
                            </span>
                            <span className="hide-menu">Quản lí sản phẩm</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/category" aria-expanded="false">
                            <span>
                                <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Danh Mục sản phẩm</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/voucher" aria-expanded="false">
                            <span>
                                <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Mã giảm giá</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/comment" aria-expanded="false">
                            <span>
                                <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Bình luận</span>
                        </Link>
                    </li>
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">Đơn Hàng</span>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/orderManagement" aria-expanded="false">
                            <span>
                                <i className="ti ti-mood-happy"></i>
                            </span>
                            <span className="hide-menu">Quản Lý Đơn Hàng</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/historyOrder" aria-expanded="false">
                            <span>
                                <i className="ti ti-mood-happy"></i>
                            </span>
                            <span className="hide-menu">Lịch Sử Đơn Hàng</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/abortOrder" aria-expanded="false">
                            <span>
                                <i className="ti ti-mood-happy"></i>
                            </span>
                            <span className="hide-menu">Đơn Hàng Bị Hủy</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/payment" aria-expanded="false">
                            <span>
                                <i className="ti ti-mood-happy"></i>
                            </span>
                            <span className="hide-menu">Phương thức thanh toán</span>
                        </Link>
                    </li>
                    <li className="nav-small-cap">
                        <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                        <span className="hide-menu">Tài khoản</span>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="/admin/user" aria-expanded="false">
                            <span>
                                <i className="ti ti-mood-happy"></i>
                            </span>
                            <span className="hide-menu">Người dùng</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="#" aria-expanded="false">
                            <span className="hide-menu"></span>
                        </Link>
                    </li>
                    <li className="nav-small-cap">
                        <span className="hide-menu"></span>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-link" to="#" aria-expanded="false">
                            <span className="hide-menu"></span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar