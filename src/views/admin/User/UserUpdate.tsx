import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { IAuth } from '../../../types/user.service'

const UserUpdate = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const submitUserUpdate = (formData: IAuth) => {
        console.log(formData)
    }
    return (
        <div className="">
            <div className="row" style={{ paddingTop: "5%" }}>
                <div className="">
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                {/* <h3 className="card-title text-center fs-2 mb-4">Sing up to continue shopping for shoes </h3> */}
                                <form onSubmit={handleSubmit(submitUserUpdate)}>
                                    <div className="mb-3" style={{ float: "left" }}>
                                        <label htmlFor="fullName" className="form-label">Full name</label>
                                        <input type="text" className="form-control" style={{ width: "120%" }} id="fullName" placeholder="Nhập full name" {...register("fullName", { required: true })} />
                                    </div>
                                    <div className="mb-3" style={{ float: "right" }}>
                                        <label htmlFor="username" className="form-label">Last name</label>
                                        <input type="text" className="form-control" style={{ width: "100%" }} id="username" placeholder="Nhập lase name" {...register("userName", { required: true })} />
                                    </div>
                                    <div style={{ clear: "both" }}></div>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="gender" placeholder="Nhập address" {...register("gender", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Nhập email" {...register("email", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register("password", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">ConfirPassword</label>
                                        <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register("confirmPassword", { required: true })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Image</label>
                                        <input type="file" className="form-control" id="password" placeholder="Nhập mật khẩu" {...register("image", { required: true })} />
                                    </div>
                                    <div className="text-center">
                                        <p id='loi'></p>
                                        <button type="submit" className="btn btn-primary">Sing up</button>
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

export default UserUpdate
