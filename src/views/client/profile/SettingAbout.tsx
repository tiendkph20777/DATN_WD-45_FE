import React, { useEffect, useState } from 'react'
import { useFetchOneUserQuery, useUpdateUserMutation } from '../../../services/user.service'
import { Controller, useForm } from 'react-hook-form'
import { Form, Input } from 'antd'
import { message as messageApi } from 'antd';


const SettingAbout = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!)
    const idUs = profileUser?.user?._id
    const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs)
    const [updateUser] = useUpdateUserMutation();
    const [form1, setForm1] = useState(true);
    const handleButtonClick = () => {
        setForm1(!form1);
        return
    };

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
                    <h3 className="heading-small text-muted mb-4">About me</h3>
                </div>
                <div className="col-4 text-right">
                    <button className="btn btn-sm btn-primary" onClick={handleButtonClick}>Settings</button>
                </div>
            </div>
            {form1 ? (
                <div className="pl-lg-4">
                    <div className="form-group focused">
                        <label>About Me</label>
                        <textarea rows={4} className="form-control form-control-alternative" placeholder="A few words about you ..." defaultValue={usersOne?.aboutme} readOnly />
                    </div>
                </div>
            ) : (
                <div className="pl-lg-4">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group focused">
                            <label>About Me</label>
                            <Form.Item

                                name={['user', 'introduction']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your introduction!',
                                    },
                                ]}
                            >
                                <Controller

                                    name="aboutme"
                                    control={control}
                                    defaultValue={usersOne?.aboutme || ''}
                                    render={({ field }) => (
                                        <Input.TextArea
                                            className='form-control form-control-alternative form-control-label text-black'
                                            rows={5}
                                            placeholder="A few words about you ..."
                                            {...field}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </div>
                        <div className="col-lg-7 text-right">
                            <button className="btn btn-sm btn-info">Update</button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )
}

export default SettingAbout
