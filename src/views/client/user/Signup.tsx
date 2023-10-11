import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { IAuth } from '../../../types/user.service'
import { useSignUpMutation } from '../../../services/user.service'
import axios from 'axios'

const Signup = () => {
    const [createUserSignup, { isLoading, isError }] = useSignUpMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IAuth>()

    const cloudinaryConfig = {
        cloudName: 'dwipssyox',
        apiKey: '294931296355453',
        apiSecret: 'jB6_ZmbxpJWoqZLndzjjPDbxPSI',
    };

    const submitSignup = async (formData: IAuth) => {
        try {
            const response = await createUserSignup(formData);
            // console.log(response.data.message)

            if (response.error) {
                console.log(response.error.data.message);
                const element = document.getElementById('loi');
                element.innerHTML = '<p style="color: red;">' + response.error.data.message + '</p>';
                // element.innerHTML = response.error.data.message
            } else {
                console.log("đăng nhập thành công 🎉🎉🎉")
                localStorage.setItem("user", JSON.stringify(response.data))
                // console.log(response)
                // navigate("/")
            }
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        // Tạo formData để đính kèm tệp
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Thay YOUR_UPLOAD_PRESET bằng upload preset của bạn

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                auth: {
                    username: cloudinaryConfig.apiKey,
                    password: cloudinaryConfig.apiSecret,
                }
            });
            console.log('File uploaded to Cloudinary. Public ID:', response.data.public_id);
        } catch (error) {
            console.error('Error uploading file to Cloudinary:', error);
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
                        style={{ height: '680px', width: '100%' }}
                    />
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                {/* <h3 className="card-title text-center fs-2 mb-4">Sing up to continue shopping for shoes </h3> */}
                                <form onSubmit={handleSubmit(submitSignup)}>
                                    <div className="mb-3" style={{}}>
                                        <label htmlFor="image" className="form-label" style={{ float: "left", lineHeight: "30px", padding: "10px" }}>Thêm ảnh đại diện</label>
                                        <input type="file" className="form-control" id="image" placeholder="Image" accept="image/*" onChange={handleImageUpload} style={{ width: "50%" }} />
                                    </div>
                                    <div className="mb-3" style={{ float: "left" }}>
                                        {/* <label htmlFor="fullName" className="form-label">Full name</label> */}
                                        <input type="text" className="form-control" style={{ width: "120%" }} id="fullName" placeholder="Nhập full name" {...register("fullName", { required: true })} />
                                    </div>
                                    <div className="mb-3" style={{ float: "right" }}>
                                        {/* <label htmlFor="username" className="form-label">Last name</label> */}
                                        <input type="text" className="form-control" style={{ width: "100%" }} id="username" placeholder="Nhập lase name" {...register("userName", { required: true })} />
                                    </div>
                                    <div style={{ clear: "both" }}></div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="gender" className="form-label">Address</label> */}
                                        <input type="text" className="form-control" id="gender" placeholder="Nhập address" {...register("gender", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="email" className="form-label">Email</label> */}
                                        <input type="email" className="form-control" id="email" placeholder="Nhập email" {...register("email", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="password" className="form-label">Password</label> */}
                                        <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register("password", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="password" className="form-label">ConfirPassword</label> */}
                                        <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register("confirmPassword", { required: true })} />
                                    </div>
                                    <div>
                                        {/* <input type="checkbox" /> <label htmlFor=""> Remeber me</label> */}
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
