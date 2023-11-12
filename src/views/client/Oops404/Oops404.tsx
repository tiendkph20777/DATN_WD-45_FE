import React from 'react'
import { Link } from 'react-router-dom'

const Oops404 = () => {
    return (
        <div className="not-found">
            <section className="login_box_area section_gap">
                <div className="">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="login_box_img">
                                <img className="img-fluid" src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png" alt="" />
                                <div className="hover">
                                    <Link className="primary-btn" to={"/"}>Quay lại trang chủ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Oops404
