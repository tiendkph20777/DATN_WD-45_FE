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
                console.log('Đăng nhập thành công 🎉🎉🎉');
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
                                    <Link className="primary-btn" to={"/signup"}>Create an Account</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner container">
                                <h3>Log in to enter</h3>
                                <form
                                    className="row login_form"
                                    action="contact_process.php"
                                    method="post"
                                    id="contactForm"
                                    // noValidate="novalidate"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="username"
                                            placeholder="Nhập email người dùng"
                                            {...register("email")}
                                        />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Nhập mật khẩu"
                                            {...register('password')}
                                        />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <input type="checkbox" id="f-option2" name="selector" />
                                            <label htmlFor="f-option2">Keep me logged in</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="primary-btn">
                                            Log In
                                        </button>
                                        <a href="#">Forgot Password?</a>
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
            </section>
        </div>
    )
}

export default Signin
