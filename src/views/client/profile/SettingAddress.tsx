import React, { useEffect, useState } from 'react'
import { useFetchOneUserQuery, useUpdateUserMutation } from '../../../services/user.service'
import { Controller, useForm } from 'react-hook-form'
import { Form, Input } from 'antd'
import { message as messageApi } from 'antd';
import MyComponent from './Adress';


const SettingAddress = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!)
    const idUs = profileUser?.user
    const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs)
    const [form1, setForm1] = useState(true);
    const handleButtonClick = () => {
        setForm1(!form1);
    };
    const [updateUser] = useUpdateUserMutation();

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
        console.log(information);
        localStorage.setItem('successMessage', "Chúc mừng bạn đã Cập nhật thành công 🎉🎉🎉");
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
            {/* Address */}
            <div className="row align-items-center">
                <div className="col-8">
                    <h3 className="heading-small text-muted mb-4">Thông tin liên lạc</h3>
                </div>
                <div className="col-4 text-right">
                    <button className="btn btn-sm btn-primary" onClick={handleButtonClick}>Chỉnh sửa</button>
                </div>
            </div>
            {form1 ? (
                <div className="pl-lg-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-address">Địa chỉ</label>
                                <input id="input-address" className="form-control form-control-alternative l" placeholder="Địa chỉ" defaultValue={usersOne?.address} readOnly />
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-4">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-city">Thành phố</label>
                                <input type="text" id="input-city" className="form-control form-control-alternative " placeholder="Thành phố" readOnly />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group focused">
                                <label className="form-control-label" htmlFor="input-country">Quốc gia</label>
                                <input type="text" id="input-country" className="form-control form-control-alternative " placeholder="Quốc gia" readOnly />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="input-country">Mã bưu điện</label>
                                <input type="number" id="input-postal-code" className="form-control form-control-alternative " placeholder="Mã bưu điện" readOnly />
                            </div>
                        </div>
                    </div> */}
                </div>
            ) : (
                <div className="pl-lg-4">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-address">Địa chỉ</label>
                                    <input id="input-address" className="form-control form-control-alternative l text-black" placeholder="Địa chỉ" defaultValue={usersOne?.address} readOnly />
                                </div>
                            </div>
                            {/* <div className="col-md-12">
                                <div className="form-group focused">
                                    <label className="form-control-label" htmlFor="input-address">Địa chỉ</label>
                                    <Form.Item
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                        className='form-control form-control-alternative form-control-label p-2'
                                    >
                                        <Controller
                                            name="address"
                                            control={control}
                                            defaultValue={usersOne?.address || ''}
                                            render={({ field }) => <Input {...field} placeholder="Địa chỉ" />}
                                        />
                                    </Form.Item>
                                </div>
                            </div> */}
                        </div>
                        <MyComponent />
                        <div className="col-lg-7 text-right">
                            <button className="btn btn-sm btn-info">Cập nhật</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default SettingAddress
