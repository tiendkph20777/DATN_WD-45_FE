import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchUserQuery, useSignInMutation } from '../../../services/user.service';
import { IAuth } from '../../../types/user.service';
import { message as messageApi } from 'antd';

const Signin = () => {
    const navigate = useNavigate();
    const [createUser, { isLoading }] = useSignInMutation();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAuth>();

    const onSubmit = async (formData: IAuth) => {
        try {
            const response = await createUser(formData);
            if (response.error) {
                const element = document.getElementById('loi');
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
                // console.log('Đăng nhập thành công 🎉🎉🎉');
                localStorage.setItem('user', JSON.stringify(response.data));
                messageApi.info({
                    type: 'error',
                    content: "Hello,chào mừng bạn quay trở lại 🎉🎉🎉",
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "20px",
                        lineHeight: "50px"
                    },
                });
                navigate("/");
            }
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    };
    return (
        <div className="" >
            <div className="row">
                < div className="col-lg-6 col-md-12" style={{ marginLeft: '%', height: "cove" }}>
                    <img
                        src="https://i.pinimg.com/736x/85/50/7e/85507e032ba4276637784e04bf2510ad--nike.jpg"
                        alt="Hình ảnh"
                        className="img-fluid"
                        style={{ height: '670px', width: '100%' }}
                    />
                </div >
                <div className="col-lg-6 col-md-12">
                    <div className="container mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center fs-2 mb-4">Log in to continue shopping for shoes </h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            Email {errors.email && <span style={{ color: "red" }}> - Email is required</span>}
                                        </label>
                                        <input type="email" className="form-control" id="username" placeholder="Nhập tên người dùng" {...register("email", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Mật khẩu {errors.password && <span style={{ color: "red" }}> - Password is required</span>}
                                        </label>
                                        <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register('password', { required: true })} />
                                    </div>
                                    <div>
                                        <input type="checkbox" /> <label htmlFor=""> Remeber me</label>
                                        <span style={{ float: "right" }}>Don't have an account? Signup <Link to={"/signup"}>here</Link></span>
                                    </div>
                                    <div className="text-center mt-2 ">
                                        <span id='loi'></span>
                                        <button type="submit" className="btn btn-primary">Log in</button>
                                    </div>
                                    <div className='text-center'>
                                        <p style={{ marginBottom: "-5px" }}>or</p>
                                        <Link to={''} style={{ paddingRight: "50px" }}><svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg></Link>
                                        <Link to={''}><svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg></Link>
                                    </div>
                                </form>
                                {showConfirmation && (
                                    <div className="confirmation-message" style={{ "display": "block", "position": "fixed", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "padding": "20px", "backgroundColor": "#28a745", "color": "#fff", "fontSize": "1.2rem", "borderRadius": "5px", "boxShadow": "0 0 10px rgba(0, 0, 0, 0.2)", "zIndex": "9999" }}>
                                        Sign up successful! Redirecting in 3 seconds...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Signin

