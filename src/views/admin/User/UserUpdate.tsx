import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useFetchOneUserQuery } from '../../../services/user.service';

const YourFormComponent = () => {
    const { id } = useParams();
    const { data } = useFetchOneUserQuery(id);
    const { control, handleSubmit, setValue, errors } = useForm();

    useEffect(() => {
        // Đặt dữ liệu từ API vào form khi nó đã được lấy
        if (data) {
            setValue('email', data.email);
            setValue('password', data.password);
            setValue('confirmPassword', data.confirmPassword);
            setValue('userName', data.userName);
            setValue('fullName', data.fullName);
            setValue('gender', data.gender);
        }
    }, [data, setValue]);

    const onSubmit = (formData) => {
        // Xử lý submit form (ví dụ: gửi dữ liệu lên server)
        console.log('Submitted data:', formData);
    };

    const styles = {
        container: {
            width: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
        },
        heading: {
            marginBottom: '10px',
        },
        inputGroup: {
            marginBottom: '10px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '3px',
            backgroundColor: '#3498db',
            color: '#fff',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Form Title</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Username</label>
                    <Controller
                        name="userName"
                        control={control}
                        defaultValue={data?.userName || ''}
                        render={({ field }) => <input {...field} style={styles.input} placeholder="Username" />}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Full Name</label>
                    <Controller
                        name="fullName"
                        control={control}
                        defaultValue={data?.fullName || ''}
                        render={({ field }) => <input {...field} style={styles.input} placeholder="Full Name" />}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue={data?.email || ''}
                        render={({ field }) => <input {...field} style={styles.input} placeholder="Email" />}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue={data?.password || ''}
                        render={({ field }) => <input {...field} style={styles.input} placeholder="Password" />}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Confirm Password</label>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue={data?.confirmPassword || ''}
                        render={({ field }) => <input {...field} style={styles.input} placeholder="Confirm Password" />}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Gender</label>
                    <Controller
                        name="gender"
                        control={control}
                        defaultValue={data?.gender || ''}
                        render={({ field }) => <input {...field} style={styles.input} placeholder="Gender" />}
                    />
                </div>

                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

export default YourFormComponent;
