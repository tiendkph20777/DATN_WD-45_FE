import React, { useEffect, useState } from 'react'
import { useFetchOneUserQuery, useUpdateUserMutation } from '../../../services/user.service'
import { Controller, useForm } from 'react-hook-form'
import { Form, Input, Select } from 'antd'
import { message as messageApi } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';


const SettingInformation = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!)
    const idUs = profileUser?.user
    const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs)
    const [updateUser] = useUpdateUserMutation();
    const [form1, setForm1] = useState(true);
    const handleButtonClick = () => {
        setForm1(!form1);
        return
    };
    // console.log(usersOne)
    const { handleSubmit, register, setValue, control } = useForm()

    useEffect(() => {
        if (usersOne) {
            setValue('_id', usersOne?._id);
            setValue('email', usersOne?.email);
            setValue('userName', usersOne?.userName);
            setValue('fullName', usersOne?.fullName);
            setValue('gender', usersOne?.gender);
            setValue('address', usersOne?.address);
            setValue('password', usersOne?.password);
            setValue('aboutme', usersOne?.aboutme);
        }
    }, [usersOne, setValue])

    const onSubmit = (information: any) => {
        // console.log(information);
        localStorage.setItem('successMessage', "Chúc mừng bạn đã update thành công 🎉🎉🎉");
        setTimeout(() => {
            window.location.reload();
        }, 500);
        updateUser(information)
    }
    useEffect(() => {
        const successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            messageApi.info({
                type: 'error',
                content: successMessage,
                className: 'custom-class',
                style: {
                    marginTop: '0',
                    fontSize: "20px",
                    lineHeight: "50px"
                }
            });
            localStorage.removeItem('successMessage');
        }
    }, []);



    return (
        <div>
            <div className="row align-items-center">
                <div className="col-8">
                    <h3 className="heading-small text-muted mb-4">User information</h3>
                </div>
                <div className="col-4 text-right">
                    <button className="btn btn-sm btn-primary" onClick={handleButtonClick}>Settings</button>
                </div>
            </div>
            <div className="pl-lg-4">
                {form1 ? (
                    <div>
                        <form action="">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-username">Username</label>
                                        <input type="text" id="input-username" className="form-control form-control-alternative font-bold" placeholder="Username" defaultValue={usersOne?.userName} readOnly />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-first-name">First name</label>
                                        <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" defaultValue={usersOne?.fullName} readOnly />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-email">Gender</label>
                                        <input type="text" id="input-email" className="form-control form-control-alternative" placeholder="Gender" defaultValue={usersOne?.gender} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-email">Email address</label>
                                        <input type="email" id="input-email" className="form-control form-control-alternative" placeholder={usersOne?.email} readOnly />
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-email">Phone</label>
                                        <input type="text" id="input-email" className="form-control form-control-alternative" placeholder="Phone" defaultValue={usersOne?.tel} readOnly />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className='col-lg-5'>
                                    <label className="form-control-label" htmlFor="input-first-name">User name</label>
                                    <Form.Item
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        className='form-control form-control-alternative form-control-label text-black'
                                    >
                                        <Controller
                                            name="userName"
                                            control={control}
                                            defaultValue={usersOne?.username || ''}
                                            render={({ field }) => <Input {...field} placeholder="Username" />}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-first-name">First name</label>
                                        <Form.Item
                                            rules={[{ required: true, message: 'Please input your fullName!' }]}
                                            className='form-control form-control-alternative form-control-label p-2'
                                        >
                                            <Controller
                                                name="fullName"
                                                control={control}
                                                defaultValue={usersOne?.fullName || ''}
                                                render={({ field }) => <Input {...field} placeholder="fullName" />}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-email">Gender</label>
                                        <section className=' className="form-control form-control-alternative form-control-label'>
                                            <Controller
                                                render={({ field }) => (
                                                    <Select {...field} style={{ width: "100%" }} className='form-control p-2'>
                                                        <MenuItem value={"Men"}>Men</MenuItem>
                                                        <MenuItem value={"Women"}>Women</MenuItem>
                                                    </Select>
                                                )}
                                                name="gender"
                                                control={control}
                                            />
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-email">Email address</label>
                                        <Form.Item
                                            rules={[{ required: true, message: 'Please input your fullName!' }]}
                                            className='form-control form-control-alternative form-control-label p-2'
                                        >
                                            <Controller
                                                name="email"
                                                control={control}
                                                defaultValue={usersOne?.email || ''}
                                                render={({ field }) => <Input {...field} placeholder="email" />}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="form-group focused">
                                        <label className="form-control-label" htmlFor="input-email">Phone</label>
                                        <Form.Item
                                            rules={[{ required: true, message: 'Please input your fullName!' }]}
                                            className='form-control form-control-alternative form-control-label p-2'
                                        >
                                            <Controller
                                                name="tel"
                                                control={control}
                                                defaultValue={usersOne?.tel || ''}
                                                render={({ field }) => <Input {...field} placeholder="tel" />}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 text-right">
                                <button className="btn btn-sm btn-info">Update</button>
                            </div>
                        </form>
                    </div>
                )
                }
            </div >
        </div >
    )
}

export default SettingInformation
