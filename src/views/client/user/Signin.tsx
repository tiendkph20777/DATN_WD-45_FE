import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../services/user.service';
import { message as messageApi } from 'antd';
import { IAuth } from '../../../types/user';
import GoogleAuth from './GoogleAuth';


const Signin = () => {
    const navigate = useNavigate();
    const [createUser, { isLoading }] = useSignInMutation();
    // const [showConfirmation, setShowConfirmation] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAuth>();

    const onSubmit = async (formData: IAuth) => {
        try {
            const response = await createUser(formData);
            // console.log(formData)
            if (response?.error) {
                messageApi.open({
                    type: 'error',
                    content: response?.error.data.message,
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "20px",
                        lineHeight: "30px"
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
                        lineHeight: "30px"
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
                                    <h4>Bạn lần đầu đến trang web của chúng tôi?</h4>
                                    <p>
                                        Khoa học công nghệ ngày càng tiến bộ,
                                        và một ví dụ điển hình về điều này là
                                    </p>
                                    <Link className="primary-btn" to={"/signup"}>Tạo tài khoản</Link>
                                </div >
                            </div >
                        </div >
                        <div className="col-lg-6">
                            <div className="login_form_inner container">
                                <h3>ĐĂNG NHẬP</h3>
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
                                            <label htmlFor="f-option2">Luôn đăng nhập</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="primary-btn">
                                            Đăng nhập
                                        </button>
                                        <a href="#">Quên mật khẩu?</a>
                                    </div>
                                    <div className='text-center'>
                                        <p style={{ marginBottom: "" }}>Hoặc</p>
                                        <GoogleAuth />
                                        0                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </section >
        </div >
    )
}

export default Signin
