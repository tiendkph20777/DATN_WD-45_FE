import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchUserQuery, useSignUpMutation } from '../../../services/user.service';
import { message as messageApi } from 'antd';
import axios from 'axios';
import { IAuth } from '../../../types/user';

const Signup = () => {
    const [createUserSignup] = useSignUpMutation();
    const navigate = useNavigate();
    const { data: users } = useFetchUserQuery();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IAuth>();

    const [image, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            const CLOUD_NAME = 'dwipssyox';
            const PRESET_NAME = 'file-image-cv';
            const POLDER_NAME = 'DATN';
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

            const formData = new FormData();
            formData.append('upload_preset', PRESET_NAME);
            formData.append('folder', POLDER_NAME);
            formData.append('file', file);

            try {
                const response = await axios.post(api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const imageUrl = response.data.secure_url;
                setImageUrl(imageUrl);
                setUploading(false);
            } catch (error) {
                console.error('Lỗi khi tải lên ảnh lên Cloudinary:', error);
                setUploading(false);
            }
        }
    };

    const submitSignup = async (formData: IAuth) => {
        try {
            const response = await createUserSignup({ ...formData, image });
            if (response.error) {
                console.log(response.error.data.message);
                messageApi.open({
                    type: 'error',
                    content: response.error.data.message,
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "20px",
                        lineHeight: "30px"
                    },
                });
            } else {
                const isEmailExist = users?.some((user) => user.email.toLowerCase() === formData.email.toLowerCase());
                if (isEmailExist) {
                    messageApi.open({
                        type: 'error',
                        content: "Email đã tồn tại vui lòng nhập email khác!!!",
                        className: 'custom-class',
                        style: {
                            marginTop: '0',
                            fontSize: "20px",
                            lineHeight: "30px"
                        },
                    });
                } else {
                    console.log("đăng ký thành công 🎉🎉🎉")
                    localStorage.setItem("user", JSON.stringify(response?.data))
                    console.log(response)
                    messageApi.info({
                        type: 'error',
                        content: "Hello,chào mừng bạn mới hãy mua sắm với chúng tôi nào 🎉🎉🎉",
                        className: 'custom-class',
                        style: {
                            marginTop: '0',
                            fontSize: "20px",
                            lineHeight: "30px"
                        },
                    });
                    navigate("/")
                }
            }
        } catch (error) {
            console.error('Sign up failed:', error);
        }
    };

    return (
        <div>
            <section className="login_box_area section_gap">
                <div className="">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_box_img">
                                <img className="img-fluid" src="https://we25.vn/media/uploads/2016/08/converse-chuck-ii-shield-hi-white-trainers.jpg" alt="" />
                                <div className="hover">
                                    <h4>New to our website?</h4>
                                    <p>
                                        There are advances being made in science and technology everyday,
                                        and a good example of this is the
                                    </p>
                                    <Link className="primary-btn" to={"/signin"}>Đăng nhập</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner" style={{ padding: 5 }}>
                                <h3 className='m-3'>ĐĂNG KÝ</h3>
                                <form
                                    className="row login_form"
                                    action="contact_process.php"
                                    method="post"
                                    id="contactForm"
                                    // noValidate="novalidate"
                                    onSubmit={handleSubmit(submitSignup)}
                                >
                                    <div className=" col-md-11 " style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className="form-group mb-3" style={{ width: "50%" }}>
                                            <label htmlFor="project-image">Thêm ảnh đại diện cho bạn </label>
                                            <input
                                                type="file"
                                                id="project-image"
                                                className="form-control"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                        <div style={{ width: "50%", textAlign: "center" }}>
                                            {uploading ? (
                                                <p>Đang tải lên...</p>
                                            ) : image ? (
                                                <p><img style={{ width: "100px", height: "80px", textAlign: "center", borderRadius: "50%" }} src={image} alt="" /></p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.fullName && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
                                    <div className="col-md-11 form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName"
                                            placeholder="Nhập tên đầy đủ"
                                            {...register("fullName", { required: true })}
                                        />
                                    </div>
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.email && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
                                    <div className="col-md-11 form-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="username"
                                            placeholder="Nhập email người dùng"
                                            {...register("email")}
                                        />
                                    </div>
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.password && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
                                    <div className="col-md-5 form-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            {...register('password')}
                                        />
                                    </div>
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.confirmPassword && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
                                    <div className="col-md-5 form-group mb-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Nhập lại mật khẩu"
                                            {...register("confirmPassword",
                                                { required: true })}
                                        />
                                    </div>
                                    <label htmlFor="" className='col-md-1'></label>
                                    <div className="col-md-11 form-group mb-2">
                                        <div className="creat_account">
                                            <input type="checkbox" id="f-option2" name="selector" />
                                            <label htmlFor="f-option2">Luôn đăng nhập</label>
                                        </div>
                                    </div>
                                    <label htmlFor="" className='col-md-1'></label>
                                    <div className="col-md-11 form-group mb-2">
                                        <button type="submit" value="submit" className="primary-btn">
                                            Đăng ký
                                        </button>
                                        <a href="#">Quên mật khẩu?</a>
                                    </div>
                                    <div className='text-center'>
                                        <p style={{ marginBottom: "-5px" }}>Hoặc</p>
                                        <Link to={''} style={{ paddingRight: "50px" }}><svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg></Link>
                                        <Link to={''}><svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg></Link>
                                    </div>
                                </form>
                            </div >
                        </div >
                    </div >
                </div >
            </section >
        </div >
    )
}

export default Signup
