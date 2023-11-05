import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFetchOneRoleQuery } from '../../services/role.service';
import { useFetchOneUserQuery } from '../../services/user.service';
import { useForm } from 'react-hook-form';
import { useGetProductsQuery } from '../../services/product.service';

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

    const navigate = useNavigate()
    const storedStatus = JSON.parse(localStorage.getItem('user')!)
    const isLoggedIn1 = !!storedStatus;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRoles, setIRole] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    // const [roleid, setroleid] = useState()
    const id = storedStatus?.user
    const { data: user } = useFetchOneUserQuery(id)
    // console.log(user)
    const idrole = user?.role_id
    const { data: role } = useFetchOneRoleQuery(idrole)

    useEffect(() => {
        if (role && role?.name === 'Admin') {
            setIRole(true);
        } else {
            setIRole(false);
        }
    }, [role]);

    useEffect(() => {
        if (isLoggedIn1 === true) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const { data: dataPro } = useGetProductsQuery();
    const { handleSubmit, register } = useForm<any>();
    const onHandleSubmit = ({ product }: any) => {
        const id_product = dataPro?.find((role) => role?.name === product)?._id
        if (id_product) {
            navigate("/product/" + id_product + "/detail")
        }
    };
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
                        <form onSubmit={handleSubmit(onHandleSubmit)} className="form form-search d-flex w-25">
                            <input type="text" placeholder="Tìm kiếm sản phẩm" list="name_product" {...register('product')} />

                            <datalist id="name_product" >
                                {dataPro?.map((item) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>
                                    )
                                })}
                            </datalist >

                            <button type="submit" className="ti ti-search border border-0 "></button>
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
                                    <Link to="/blog" className='nav-link'>Giới Thiệu</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="#" className='nav-link'>Tin Tức</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link to="#" className='nav-link'>Liên Hệ</Link>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center">
                                <Link to={"/cart"} className="cart">
                                    <img src="/src/assets/images/cart.svg" alt="" className="cart-icon" />
                                    <span className="count-cart">15</span>
                                </Link>
                                <div className="login d-block align-items-center" id="sing">
                                    {isLoggedIn ? (
                                        <div className="dropdown">
                                            <button className="btn btn1">{user?.userName}</button>
                                            <div className="dropdown-content" style={{ width: "100px", borderRadius: "10px" }}>
                                                <Link to="/profile" className='link1'>Profile</Link>
                                                {isRoles ? (
                                                    <Link to="/admin" className='link1'>Admin</Link>

                                                ) : (
                                                    <span></span>
                                                    // <Link to="/admin" className='link1'></Link>
                                                )}
                                                <button onClick={handleLogout} className='link1-btn'>Đăng xuất</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to="/signin" className='nav-link '><button className="btn btn-primary">Đăng nhập</button></Link>
                                    )}
                                </div>
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
                        <div className="login d-block align-items-center" id='sing'>
                            <a className="btn btn-primary text-capitalize w-100" href="#" >Đăng Nhập</a>
                        </div>
                    </div>
                </div>
            </header>
            <style dangerouslySetInnerHTML={{ __html: "\n/* Style The Dropdown Button */\n.dropbtn {\n  background-color: #4CAF50;\n  color: white;\n  padding: 16px;\n  font-size: 16px;\n  border: none;\n  cursor: pointer;\n}\n\n/* The container <div> - needed to position the dropdown content */\n.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n/* Dropdown Content (Hidden by Default) */\n.dropdown-content {\n  display: none;\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n  z-index: 1;\n}\n\n/* Links inside the dropdown */\n.dropdown-content a {\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n}\n\n/* Change color of dropdown links on hover */\n.dropdown-content a:hover {background-color: #f1f1f1}\n\n/* Show the dropdown menu on hover */\n.dropdown:hover .dropdown-content {\n  display: block;\n}\n\n/* Change the background color of the dropdown button when the dropdown content is shown */\n.dropdown:hover .dropbtn {\n  background-color: #3e8e41;\n}\n" }} />
        </div>
    )
}

export default TheHeader
