import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, message, notification } from 'antd';
import { useFetchUserQuery, useRemoveUserMutation } from '../../../services/user.service';
import { IAuth } from '../../../types/user.service';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

// const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const confirm = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    message.success('Click on Yes');
};


const App: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const { data: user, isLoading, isFetching } = useFetchUserQuery();
    const [removeUserMutation] = useRemoveUserMutation()

    useEffect(() => {
        if (!isFetching) {
            // Data is fetched and available
            const data = user?.map((item) => ({
                key: item._id,
                userName: item.userName,
                fullName: item.fullName,
                image: item.image,
                email: item.email,
                gender: item.gender,
            }));
            setSearchResult(data || []);
        }
    }, [user, isFetching]);

    const onSearch = (value: string) => {
        const filteredData = user?.filter((item) =>
            item.userName.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(filteredData || []);
        setSearchText(value);
    };

    // remove
    const removeProduct = async (id: number) => {
        // console.log(id);
        try {
            await removeUserMutation(id);
            notification.success({
                message: 'Remove',
                description: (
                    <span>
                        Product <b>{user?.find((item) => item._id === id)?.userName}</b> removed successfully!
                    </span>
                ),
            });
        } catch (error) {
            console.error('Failed to remove product', error);
            notification.error({
                message: 'Remove',
                description: 'Failed to remove product. Please try again later.',
            });
        }
    };

    // If data is loading, you can display a loading indicator or handle loading state accordingly
    if (isLoading) {
        return <div>Loading...</div>;
    }


    const columns = [
        { title: 'User Name', dataIndex: 'userName', key: 'userName' },
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Address', dataIndex: 'gender', key: 'gender' },

        // {
        //     title: 'Image',
        //     dataIndex: 'image',
        //     key: 'image',
        //     render: (image: string) => <img src={image} alt="Product image" width={100} />,
        // },
        // { title: 'Category', dataIndex: 'categoryId', key: 'categoryId' },

        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record: DataType) => (
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
                <Search placeholder="Search product" value={searchText} onChange={(e) => onSearch(e.target.value)} enterButton />
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record: DataType) => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: (record: DataType) => record.firstName !== 'Not Expandable',
                    }}
                    dataSource={searchResult.length > 0 ? searchResult : []}
                    pagination={{ pageSize: 5, showQuickJumper: true }}
                />
            </div>
        </div>
    );
};

export default App;
