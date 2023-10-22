import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IAuth } from '../../../types/user.service';
import { useFetchUserQuery, useSignUpMutation } from '../../../services/user.service';
import { message as messageApi } from 'antd';
import axios from 'axios';

const Signup = () => {
    const [createUserSignup, { isLoading, isError }] = useSignUpMutation();
    const navigate = useNavigate();
    const { data: users } = useFetchUserQuery();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IAuth>();

    const [image, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (event) => {
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
            // Handle success or error response from your API
            if (response.error) {
                console.log(response.error.data.message);
                messageApi.open({
                    type: 'error',
                    content: response.error.data.message,
                    className: 'custom-class',
                    style: {
                        marginTop: '15vh',
                        fontSize: "20px",
                        lineHeight: "100px"
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
                            marginTop: '15vh',
                            fontSize: "20px",
                            lineHeight: "100px"
                        },
                    });
                } else {
                    console.log("đăng ký thành công 🎉🎉🎉")
                    localStorage.setItem("user", JSON.stringify(response.data))
                    console.log(response)
                    messageApi.info({
                        type: 'error',
                        content: "Hello,chào mừng bạn mới hãy mua sắm với chúng tôi nào 🎉🎉🎉",
                        className: 'custom-class',
                        style: {
                            marginTop: '0',
                            fontSize: "20px",
                            lineHeight: "50px"
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
        <div className="">
            <div className="row">
                <div className="col-lg-6 col-md-12" style={{ marginLeft: '%', height: "cove" }}>
                    <img
                        src="https://i.pinimg.com/736x/85/50/7e/85507e032ba4276637784e04bf2510ad--nike.jpg"
                        alt="Hình ảnh"
                        className="img-fluid"
                        style={{ height: 'cove', width: 'cove' }}
                    />
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center fs-2 mb-4">Sing up</h3>
                                <form onSubmit={handleSubmit(submitSignup)}>
                                    <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
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
                                                <p><img style={{ width: "100px", height: "100px", textAlign: "center", borderRadius: "50%" }} src={image} alt="" /></p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className="mb-3" style={{ width: "45%" }}>
                                            <label htmlFor="fullName" className="form-label">
                                                Full name
                                                {errors.fullName && <span className="error-message" style={{ color: "red" }}> *</span>}
                                            </label>
                                            <input type="text" className="form-control" id="fullName" placeholder="Nhập full name" {...register("fullName", { required: true })} />
                                        </div>
                                        <div className="mb-3" style={{ width: "45%" }}>
                                            <label htmlFor="userName" className="form-label">
                                                Last name
                                                {errors.userName && <span className="error-message" style={{ color: "red" }}> *</span>}
                                            </label>
                                            <input type="text" className="form-control" id="userName" placeholder="Nhập last name" {...register("userName", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label">
                                            Address
                                            {errors.gender && <span className="error-message" style={{ color: "red" }}> *</span>}
                                        </label>
                                        <input type="text" className="form-control" id="gender" placeholder="Nhập address" {...register("gender", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                            {errors.email && <span className="error-message" style={{ color: "red" }}> *</span>}

                                        </label>
                                        <input type="email" className="form-control" id="email" placeholder="Nhập email" {...register("email", { required: true })} />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <div className="mb-3" style={{ width: "45%" }}>
                                            <label htmlFor="password" className="form-label">
                                                Password
                                                {errors.password && <span className="error-message" style={{ color: "red" }}> *</span>}
                                            </label>
                                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register("password", { required: true })} />
                                        </div>
                                        <div className="mb-3" style={{ width: "45%" }}>
                                            <label htmlFor="password" className="form-label">
                                                ConfirPassword
                                                {errors.confirmPassword && <span className="error-message" style={{ color: "red" }}> *</span>}
                                            </label>
                                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register("confirmPassword", { required: true })} />
                                        </div>
                                    </div>
                                    <div>
                                        <input type="checkbox" /> <label htmlFor=""> Remeber me</label>
                                        <span style={{ float: "right" }}>Already have an account? Login <Link to={"/signin"}>here</Link></span>
                                    </div>
                                    <div className="text-center">
                                        <p id='loi'></p>
                                        <button type="submit" className="btn btn-primary">Sing up</button>
                                    </div>
                                    <div className='text-center'>
                                        <p style={{ marginBottom: "-5px" }}>or</p>
                                        <Link to={''} style={{ paddingRight: "50px" }}><svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg></Link>
                                        <Link to={''}><svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup