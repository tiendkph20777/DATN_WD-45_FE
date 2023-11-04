import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useFetchOneUserQuery, useUpdateUserMutation } from '../../../services/user.service';
import { Button, Form, Select } from 'antd';
import Input from 'antd/es/input/Input';
import { message as messageApi } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { useFetchRoleQuery } from '../../../services/role.service';


const YourFormComponent = () => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const { data: user } = useFetchOneUserQuery(id);
    const { control, handleSubmit, setValue, watch } = useForm();
    const [updateUser] = useUpdateUserMutation();
    const { data: roles } = useFetchRoleQuery()

    if (!id) {
        console.error('Id is undefined or null.');
        return null;
    }
    // console.log(role_id)
    useEffect(() => {
        if (user) {
            setValue('_id', user._id);
            setValue('email', user.email);
            setValue('userName', user.userName);
            setValue('fullName', user.fullName);
            setValue('gender', user.gender);
            setValue('address', user.address);
            setValue('password', user.password);
            setValue('tel', user.tel);
            setValue('role_id', user.role_id);
        }
    }, [user, setValue]);
    console.log(user)
    const onSubmit = async (user: any) => {
        try {
            const response = await updateUser(user);
            // console.log(response)
            if (response.error) {
                messageApi.open({
                    type: 'error',
                    content: "Bạn không có quyền thực hiện chức năng này 😈😈😈",
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "20px",
                        lineHeight: "50px"
                    },
                });
            } else {
                messageApi.info({
                    type: 'error',
                    content: "Cập nhật user thành công 🎉🎉🎉",
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "20px",
                        lineHeight: "50px"
                    },
                });
                navigate("/admin/user");
            }
        } catch (error) {
            console.error('Failed to update user', error);
        }
    };

    return (
        <div style={{ width: "70%", paddingLeft: "10%", paddingTop: "100px" }}>
            <h1 style={{}}>Update User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Item
                    label="Username"
                    name="_id"
                    rules={[{ required: true, message: 'Please input your id!' }]}
                    style={{ display: 'none' }}
                >
                    <Controller
                        name="_id"
                        control={control}
                        defaultValue={user?._id || ''}
                        render={({ field }) => <Input {...field} placeholder="id" />}
                    />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Controller
                        name="userName"
                        control={control}
                        defaultValue={user?.username || ''}
                        render={({ field }) => <Input {...field} placeholder="Username" />}
                    />
                </Form.Item>
                <Form.Item
                    label="fullName"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your fullName!' }]}
                >
                    <Controller
                        name="fullName"
                        control={control}
                        defaultValue={user?.fullName || ''}
                        render={({ field }) => <Input {...field} placeholder="fullName" />}
                    />
                </Form.Item>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Controller
                        name="email"
                        control={control}
                        defaultValue={user?.email || ''}
                        render={({ field }) => <Input {...field} placeholder="email" />}
                    />
                </Form.Item>
                <Form.Item
                    label="gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please input your gender!' }]}
                >
                    <Controller
                        render={({ field }) => (
                            <Select {...field} style={{ width: "100%" }} className='form-control p-0'>
                                <MenuItem value={"Men"}>Men</MenuItem>
                                <MenuItem value={"Women"}>Women</MenuItem>
                            </Select>
                        )}
                        name="gender"
                        control={control}
                    />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="tel"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Controller
                        name="tel"
                        control={control}
                        defaultValue={user?.tel || ''}
                        render={({ field }) => <Input {...field} placeholder="tel" />}
                    />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Controller
                        name="address"
                        control={control}
                        defaultValue={user?.address || ''}
                        render={({ field }) => <Input {...field} placeholder="address" />}
                    />
                </Form.Item>
                <Form.Item
                    label="role_id"
                    name="role_id"
                    rules={[{ required: true, message: 'Please input your role_id!' }]}>
                    <Controller
                        render={({ field }) => (
                            <Select {...field} style={{ width: "100%" }} className='form-control p-0'>
                                {roles?.map(role => (
                                    <MenuItem key={role._id} value={role._id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                        name="role_id"
                        control={control}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </form>
        </div>
    );
};

export default YourFormComponent;
