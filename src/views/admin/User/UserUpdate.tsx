import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useFetchOneUserQuery, useUpdateUserMutation } from '../../../services/user.service';
import { Button, Form } from 'antd';
import Input from 'antd/es/input/Input';

const YourFormComponent = () => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const { data } = useFetchOneUserQuery(id);
    const { control, handleSubmit, setValue } = useForm();
    const [updateUser] = useUpdateUserMutation();

    if (!id) {
        console.error('Id is undefined or null.');
        return null;
    }

    useEffect(() => {
        if (data) {
            setValue('_id', data._id);
            setValue('email', data.email);
            setValue('userName', data.userName);
            setValue('fullName', data.fullName);
            setValue('gender', data.gender);
        }
    }, [data, setValue]);

    const onSubmit = async (user: any) => {
        try {
            await updateUser(user);
            navigate("/admin/user");
        } catch (error) {
            console.error('Failed to update user', error);
        }
    };

    return (
        <div style={{ width: "70%", paddingLeft: "10%", paddingTop: "5%" }}>
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
                        defaultValue={data?._id || ''}
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
                        defaultValue={data?.username || ''}
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
                        defaultValue={data?.fullName || ''}
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
                        defaultValue={data?.email || ''}
                        render={({ field }) => <Input {...field} placeholder="email" />}
                    />
                </Form.Item>
                <Form.Item
                    label="gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please input your gender!' }]}
                >
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue={data?.gender || ''}
                        render={({ field }) => <Input {...field} placeholder="gender" />}
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
