import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserMutation, useFetchUserQuery, useSignUpMutation } from '../../../services/user.service';
import { message as messageApi } from 'antd';
import axios from 'axios';
import { IAuth } from '../../../types/user';

const UserAdd = () => {
    const [createUser, { isLoading, isError }] = useCreateUserMutation();
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
        console.log(formData)
        try {
            console.log(formData)
            const response = await createUser({ ...formData, image });
            if (response.error) {
                console.log(response.error.data.message);
                messageApi.open({
                    type: 'error',
                    content: response.error.data.message,
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "20px",
                        lineHeight: "50px"
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
                            lineHeight: "50px"
                        },
                    });
                } else {
                    console.log("Thêm tài khoản mới thành công 🎉🎉🎉")
                    messageApi.info({
                        type: 'error',
                        content: "Thêm tài khoản mới thành công 🎉🎉🎉",
                        className: 'custom-class',
                        style: {
                            marginTop: '0',
                            fontSize: "20px",
                            lineHeight: "50px"
                        },
                    });
                    navigate("/admin/user")
                }
            }
        } catch (error) {
            console.error('Sign up failed:', error);
        }
    };

    return (
        <div style={{ paddingTop: "50px", width: "90%" }}>
            <section className="login_box_area section_gap">
                <div className="">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="login_form_inner" style={{ padding: 5 }}>
                                <h3 className='m-3'>Thêm mới người dùng</h3>
                                <form
                                    className="row login_form"
                                    action="contact_process.php"
                                    method="post"
                                    id="contactForm"
                                    // noValidate="novalidate"
                                    onSubmit={handleSubmit(submitSignup)}
                                >
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.image && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
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
                                    <div className="col-md-5 form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName"
                                            placeholder="Nhập tên đầy đủ"
                                            {...register("fullName", { required: true })}
                                        />
                                    </div>
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.userName && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
                                    <div className="col-md-5 form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="userName"
                                            placeholder="Nhập tên người dùng"
                                            {...register("userName",
                                                { required: true })}
                                        />
                                    </div>
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.address && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
                                    <div className="col-md-8 form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Nhập Địa Chỉ"
                                            {...register("address",
                                                { required: true })}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            {...register("gender")}
                                            defaultValue="Gender"
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </div>
                                    <label htmlFor="fullName" className="form-label col-md-1 ">
                                        {errors.email && <span className="error-message" style={{ color: "red", lineHeight: "60px", paddingLeft: "20px" }}>*</span>}
                                    </label>
                                    <div className="col-md-6 form-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Nhập email người dùng"
                                            {...register("email", { required: true })}
                                        />
                                    </div>
                                    <div className="col-md-5 form-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tel"
                                            placeholder="Số điện thoại"
                                            {...register("tel")}
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
                                            {...register('password', { required: true })}
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
                                    <div className="form-group mb-2" style={{ width: "200px", marginLeft: "40%" }}>
                                        <button type="submit" value="submit" className="primary-btn">
                                            Đăng ký
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UserAdd
