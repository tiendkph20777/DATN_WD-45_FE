import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, message, notification } from 'antd';
import { useFetchUserQuery, useRemoveUserMutation } from '../../../services/user.service';
import { IAuth } from '../../../types/user.service';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useFetchOneRoleQuery, useFetchRoleQuery } from '../../../services/role.service';


interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}


const App: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const { data: user, isLoading, isFetching } = useFetchUserQuery();
    const [removeUserMutation] = useRemoveUserMutation()
    const { data: roles } = useFetchRoleQuery()
    const [searchResult, setSearchResult] = useState([]);


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
                            image: item.image,
                        };
                    })
                );
                setSearchResult(data);
            }
        };
        fetchData();
    }, [user, isFetching, roles]);

    const onSearch = (value: string) => {
        const filteredData: any = user?.filter((item) =>
            isValueInFields(value?.toLowerCase(), [item.email.toLowerCase()])
        );

        setSearchResult(filteredData);
        setSearchText(value);
    };

    const isValueInFields = (value: string, fields: string[]) => {
        return fields.some(field => field.includes(value));
    };

    // remove
    const removeProduct = async (id: string) => {
        try {
            await removeUserMutation(id);
            notification.success({
                message: 'Remove',
                description: (
                    <span>
                        Sản phẩm <b>{user?.find((item) => item?._id === id)?.userName}</b> đã được xóa thành công!
                    </span>
                ),
            });
            setSearchResult(searchResult.filter((item: any) => item.key !== id));
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
        { title: 'Address', dataIndex: 'gender', key: 'gender' },
        { title: 'Role', dataIndex: 'role', key: 'role', },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: any) => <img src={image} alt="" style={{ maxWidth: '100px' }} />,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record: any) => (
                <span>
                    <Button type='primary' >
                        <Link to={record.key + '/edit'}>
                            <EditOutlined /> Update
                        </Link>
                    </Button>
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
            <div>
                <Search placeholder="Search email user" value={searchText} onChange={(e) => onSearch(e.target.value)} enterButton />
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record: any) => <p style={{ margin: 0 }}>{record.description}</p>,
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
