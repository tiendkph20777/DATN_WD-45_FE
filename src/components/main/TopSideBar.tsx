import React from 'react'
import '/public/AdminTemplate/src/assets/js/app.min'
import '/public/AdminTemplate/src/assets/js/dashboard'
import '/public/AdminTemplate/src/assets/js/sidebarmenu'
import { Link } from 'react-router-dom'

const TopSideBar = () => {
    return (
        <div>
            <header className="app-header">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item d-block d-xl-none">
                            <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse"
                                href="javascript:void(0)">
                                <i className="ti ti-menu-2"></i>
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link nav-icon-hover" href="javascript:void(0)">
                                <i className="ti ti-bell-ringing"></i>
                                <div className="notification bg-primary rounded-circle"></div>
                            </a>
                        </li> */}
                    </ul>
                    <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                            <li className="nav-item dropdown">
                                <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://cdn.futura-sciences.com/sources/images/dossier/773/01-intro-773.jpg" alt="" width="35" height="35"
                                        className="rounded-circle" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                                    aria-labelledby="drop2">
                                    <div className="message-body">
                                        <Link to="/signin" className='btn btn-outline-primary mx-3 mt-2 d-block'>Đăng xuất</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default TopSideBar