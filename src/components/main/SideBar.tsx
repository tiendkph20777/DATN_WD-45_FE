import React from 'react'
import { Link } from 'react-router-dom'
import '/public/AdminTemplate/src/assets/js/app.min'
import '/public/AdminTemplate/src/assets/js/dashboard'
import '/public/AdminTemplate/src/assets/js/sidebarmenu'


const SideBar = () => {
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <aside className="left-sidebar">
                {/* <!-- Sidebar scroll--> */}

                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <Link to="/" className="text-nowrap logo-img">
                        <img src="/src/assets/images/logo.png" width="180" alt="" />
                    </Link>
                    <div className="logo">
              
            </div>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
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
                                    <i className="ti ti-home"></i>
                                </span>
                                <span className="hide-menu">Trang Chủ</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin" aria-expanded="false">
                                <span>
                                    <i className="ti ti-chart-line"></i>
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
                                    <i className="ti ti-building-store"></i>
                                </span>
                                <span className="hide-menu">Quản lí sản phẩm</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/product/warehouse" aria-expanded="false">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.2 48.2 0 0 0 -36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z" /></svg>
                                </span>
                                <span className="hide-menu">Kho sản phẩm</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/category" aria-expanded="false">
                                <span>
                                    <i className="ti ti-list-details"></i>
                                </span>
                                <span className="hide-menu">Danh Mục sản phẩm</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/voucher" aria-expanded="false">
                                <span>
                                    <i className="ti ti-ticket"></i>
                                </span>
                                <span className="hide-menu">Mã giảm giá</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/comment" aria-expanded="false">
                                <span>
                                    <i className="ti ti-brand-hipchat"></i>
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
                                    <i className="ti ti-barcode"></i>
                                </span>
                                <span className="hide-menu">Quản Lý Đơn Hàng</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/historyOrder" aria-expanded="false">
                                <span>
                                    <i className="ti ti-history-toggle"></i>
                                </span>
                                <span className="hide-menu">Lịch Sử Đơn Hàng</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/abortOrder" aria-expanded="false">
                                <span>
                                    <i className="ti ti-truck-return"></i>
                                </span>
                                <span className="hide-menu">Đơn Hàng Bị Hủy</span>
                            </Link>
                        </li>
                        {/* <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/payment" aria-expanded="false">
                                <span>
                                    <i className="ti ti-mood-happy"></i>
                                </span>
                                <span className="hide-menu">Phương thức thanh toán</span>
                            </Link>
                        </li> */}
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Tài khoản</span>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/admin/user" aria-expanded="false">
                                <span>
                                    <i className="ti ti-users"></i>
                                </span>
                                <span className="hide-menu">Người dùng</span>
                            </Link>
                        </li>
                        {/* <li className="sidebar-item">
                            <Link className="sidebar-link" to="#" aria-expanded="false">
                                <span>
                                    <i className="ti ti-aperture"></i>
                                </span>
                                <span className="hide-menu">Danh Sách</span>
                            </Link>
                        </li> */}
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Lịch Sử Giao Dịch</span>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="#" aria-expanded="false">
                                <span>
                                    <i className="ti ti-mood-happy"></i>
                                </span>
                                <span className="hide-menu">Lịch Sử Nhận Hoa Hồng</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

            </aside>
        </div >
    )
}

export default SideBar