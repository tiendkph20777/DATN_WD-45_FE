import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useFetchOneUserQuery, useUpdateUserMutation } from '../../../services/user.service';
import { Button, Form } from 'antd';
import Input from 'antd/es/input/Input';
// import bcrypt from "bcryptjs";

const YourFormComponent = () => {
    const { id } = useParams();
    // console.log(id);
    const { data } = useFetchOneUserQuery(id);
    console.log(data);
    const { control, handleSubmit, setValue, errors } = useForm();
    const [updateUser] = useUpdateUserMutation()

    if (!id) {
        console.error('Id is undefined or null.');
        return null;
    }

    useEffect(() => {
        if (data) {
            setValue('_id', data._id);
            setValue('email', data.email);
            // setValue('password', data.password);
            setValue('userName', data.userName);
            setValue('fullName', data.fullName);
            setValue('gender', data.gender);
        }
    }, [data, setValue]);

    const onSubmit = (user) => {

        console.log(user);

        updateUser(user);

    };

    return (
        <div style={{ width: "70%", paddingLeft: "10%", paddingTop: "5%" }}>
            <h1 style={{}}>Update User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Form.Item
                    label="Username"
                    name="_id"
                    rules={[{ required: true, message: 'Please input your id!' }]}
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
                {/* <Form.Item
                    label="password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Controller
                        name="password"
                        control={control}
                        defaultValue={data?.password || ''}
                        render={({ field }) => <Input {...field} placeholder="password" />}
                    />
                </Form.Item> */}

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


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useFetchOneUserQuery, useUpdateUserMutation } from '../../../services/user.service';
// import { useParams } from 'react-router-dom';

// const schema = yup.object().shape({
//     fullName: yup.string().required('Họ và tên không được bỏ trống'),
//     userName: yup.string().required('Tên người dùng không được bỏ trống'),
//     email: yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
//     gender: yup.string().required('Giới tính không được bỏ trống'),
// });

// const UserUpdateForm = () => {
//     const { id } = useParams()
//     const { register, handleSubmit, setValue, errors } = useForm({
//         resolver: yupResolver(schema),
//     });
//     const { data: user, error, isLoading } = useFetchOneUserQuery(id);
//     const [updateUser] = useUpdateUserMutation();

//     console.log(user)

//     const onSubmit = async (formData) => {
//         try {
//             console.log(formData)
//             await updateUser({ _id: id, ...formData });
//             // Xử lý thành công, ví dụ: hiển thị thông báo thành công
//         } catch (error) {
//             // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
//         }
//     };

//     if (isLoading) {
//         return <div>Đang tải...</div>;
//     }

//     if (error) {
//         return <div>Lỗi: {error.message}</div>;
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <label>
//                 Họ và tên:
//                 <input
//                     type="text"
//                     defaultValue={user?.fullName}
//                     {...register('fullName')}
//                 />
//                 {/* <span style={{ color: 'red' }}>{errors.fullName?.message}</span> */}
//             </label>

//             <label>
//                 Tên người dùng:
//                 <input
//                     type="text"
//                     defaultValue={user?.userName}
//                     {...register('userName')}
//                 />
//                 {/* <span style={{ color: 'red' }}>{errors.userName?.message}</span> */}
//             </label>

//             <label>
//                 Email:
//                 <input
//                     type="email"
//                     defaultValue={user?.email}
//                     {...register('email')}
//                 />
//                 {/* <span style={{ color: 'red' }}>{errors.email?.message}</span> */}
//             </label>

//             <label>
//                 Giới tính:
//                 <select defaultValue={user?.gender} {...register('gender')}>
//                     <option value="male">Nam</option>
//                     <option value="female">Nữ</option>
//                     <option value="other">Khác</option>
//                 </select>
//                 {/* <span style={{ color: 'red' }}>{errors.gender?.message}</span> */}
//             </label>

//             <button type="submit">Cập nhật thông tin</button>
//         </form>
//     );
// };

// export default UserUpdateForm;
