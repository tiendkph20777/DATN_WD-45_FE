import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Select, Table, notification } from 'antd';
import { useFetchUserQuery, useRemoveUserMutation, useUpdateUserMutation } from '../../../services/user.service';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useFetchRoleQuery } from '../../../services/role.service';
import { Controller, useForm } from 'react-hook-form';
import MenuItem from 'antd/es/menu/MenuItem';
import { message as messageApi } from 'antd';



const App: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchText1, setSearchText1] = useState('');
    const { data: user, isLoading, isFetching } = useFetchUserQuery();
    const [removeUserMutation] = useRemoveUserMutation()
    const { data: roles } = useFetchRoleQuery()
    const [searchResult, setSearchResult] = useState([]);
    const [updateUsser] = useUpdateUserMutation()


    // update role
    const { handleSubmit, register, setValue, control } = useForm()
    const [rowStates, setRowStates] = useState<any>({});

    const handleButtonClick = (key: any) => {
        setRowStates((prevState: any) => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };



    // useEffect(() => {
    //     if (searchResult) {
    //         setValue('_id', searchResult?._id);
    //         setValue('email', searchResult?.email);
    //         setValue('userName', searchResult?.userName);
    //         setValue('fullName', searchResult?.fullName);
    //         setValue('gender', searchResult?.gender);
    //         setValue('address', searchResult?.address);
    //         setValue('password', searchResult?.password);
    //         setValue('aboutme', searchResult?.aboutme);
    //     }
    // }, [searchResult, setValue])

    const onSubmit = (roledata: any) => {
        const selectedGender = roledata.role;
        console.log('Dữ liệu đã lấy:', selectedGender);
        localStorage.setItem('successMessage', "Chúc mừng bạn đã update thành công 🎉🎉🎉");
        // setTimeout(() => {
        //     window.location.reload();
        // }, 0);
        updateUsser(selectedGender)
    };

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


    // hiển thị dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            if (!isFetching) {
                const userData = user || [];
                const rolesData = roles || [];
                const data: any = await Promise.all(
                    userData.map(async (item) => {
                        const roleName = rolesData.find(role => role?._id === item?.role_id)?.name;
                        return {
                            key: item._id,
                            userName: item.userName,
                            fullName: item.fullName,
                            role: roleName,
                            email: item.email,
                            gender: item.gender,
                            address: item.address,
                            tel: item.tel,
                            image: item.image,
                        };
                    })
                );
                setSearchResult(data);
            }
        };
        fetchData();
    }, [user, isFetching, roles]);


    // search
    const onSearch = (value: string) => {
        const filteredData: any = user?.filter((item) =>
            isValueInFields(value?.toLowerCase(), [item.email.toLowerCase()])
        );

        setSearchResult(filteredData);
        setSearchText(value);
    };
    const onSearch1 = (value: string) => {
        const filteredData: any = user?.filter((item) =>
            isValueInFields(value?.toLowerCase(), [item.userName.toLowerCase()])
        );

        setSearchResult(filteredData);
        setSearchText1(value);
    };

    const isValueInFields = (value: string, fields: string[]) => {
        return fields.some(field => field.includes(value));
    };

    // remove
    const removeProduct = async (id: string) => {
        try {
            const response = await removeUserMutation(id);
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
                notification.success({
                    message: 'Remove',
                    description: (
                        <span>
                            Người dùng <b>{user?.find((item) => item?._id === id)?.userName}</b> đã được xóa thành công!
                        </span>
                    ),
                });
                setSearchResult(searchResult.filter((item: any) => item.key !== id));
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm', error);
            notification.error({
                message: 'Xóa',
                description: 'Không thể xóa sản phẩm. Vui lòng thử lại sau.',
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const columns = [
        { title: 'User Name', dataIndex: 'userName', key: 'userName' },
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'Phone', dataIndex: 'tel', key: 'tel' },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: any, record: any) => (
                <div style={{ width: "" }}>
                    {rowStates[record.key] ? (
                        <span>
                            <form action="" onSubmit={handleSubmit(onSubmit)} className='row'>
                                <section className="col-7">
                                    <Controller
                                        render={({ field }) => (
                                            <Select {...field} style={{ width: "100%" }}>
                                                {roles && roles?.map((role) => (
                                                    <MenuItem value={role?._id}>
                                                        {role?.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                        name="role"
                                        control={control}
                                    />
                                </section>
                                <Button type='primary' className='col-5' htmlType="submit">
                                    Update
                                </Button>
                            </form>
                        </span>
                    ) : (
                        <span className='row'>
                            <Button className=''>
                                <span className='col-12'>{role}</span>
                            </Button>
                            {/* <Button type='primary' onClick={() => handleButtonClick(record.key)} className='col-5'>
                                Setting
                            </Button> */}
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: any) => <img src={image} alt="" style={{ maxWidth: '100px' }} />,
        },
        {
            title: <p><Link to={"add"}><Button type='primary'>Add New User</Button></Link></p>,
            dataIndex: '',
            key: 'action',
            render: (record: any) => (
                <span>
                    <Link to={record.key + '/edit'}>
                        <Button type='primary' >
                            <EditOutlined /> Update
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure to remove this item?"
                        onConfirm={() => {
                            removeProduct(record.key);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: 'red', margin: '4px', minWidth: '8em' }}>
                            <CloseOutlined /> Remove
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];


    return (
        <div style={{ paddingTop: "10%" }}>
            <div className='row' style={{ display: "flex", justifyContent: "center" }}>
                <div className='col-5'>
                    <Search placeholder="Search email user" value={searchText} onChange={(e) => onSearch(e.target.value)} enterButton />
                </div>
                <div className='col-5'>
                    <Search placeholder="Search name user" value={searchText1} onChange={(e) => onSearch1(e.target.value)} enterButton />
                </div>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record: any) => <p style={{ margin: 0 }}>{record.address}</p>,
                        rowExpandable: (record: any) => record.firstName !== 'Not Expandable',
                    }}
                    dataSource={searchResult.length > 0 ? searchResult : []}
                    pagination={{ pageSize: 5, showQuickJumper: true }}
                />
            </div>
        </div>
    );
};

export default App;
