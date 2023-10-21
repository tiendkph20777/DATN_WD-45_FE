import { useEffect, useState } from 'react';
import { InputNumber, Select, Table } from 'antd';
import { Button, Input, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined } from '@ant-design/icons';
import { useFetchCommentQuery, useFetchProductQuery, useRemoveCommentMutation } from "../../../services/product.service";
import { useFetchUserQuery } from '../../../services/user.service';
interface DataType {
    _id: string;
    content: string;
    id_product: string;
    id_user: string;
    rate: number;
}
export default function CommentView() {

    const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const { data: dataCmt } = useFetchCommentQuery();
    const [Product_Remove] = useRemoveCommentMutation();
    const { data: dataPro } = useFetchProductQuery();
    const { data: dataUser } = useFetchUserQuery();
    const { Search } = Input;
    useEffect(() => {
        if (dataCmt) {
            const updatedDataSource = dataCmt.map(
                ({ _id, content, id_product, id_user, rate }: DataType) => ({
                    _id,
                    content,
                    id_product,
                    id_user,
                    rate,
                })
            );
            setDataSourceToRender(updatedDataSource);
        }
    }, [dataCmt]);

    const onSearch = (value: string | number) => {
        let filteredData = dataSourceToRender;
        filteredData = filteredData.filter((item) => {
            return (
                item.id_product == value || item.id_user == value || item.rate == value
            );
        }
        );
        if (filteredData.length == 0) {
            alert('Không có bình luận nào cả!');
        }
        setSearchResult(filteredData);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Người dùng',
            dataIndex: 'id_user',
            key: 'id_user'
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'id_product',
            key: 'id_product'
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rate',
            key: 'rate'
        },
        {
            title: "",
            key: 'x',
            render: ({ _id: id }: any) => {
                return (
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this product ?"
                        onConfirm={() => Product_Remove({ id })}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: "red",
                                margin: "4px",
                                minWidth: "4em",
                            }}
                        >
                            <CloseOutlined />
                        </Button>
                    </Popconfirm>
                );
            },
        }
    ];
    return (
        <div className='pt-6'>
            <Search
                placeholder="Tìm kiếm"
                onSearch={onSearch}
                style={{ width: 200 }} />

            <Select
                style={{ width: 200, marginBottom: 8 }}
                placeholder="Chọn sản phẩm"
                onChange={onSearch}
                options={dataPro?.map((item) => (
                    {
                        value: item._id,
                        label: item.name
                    }
                ))} />
            <Select
                style={{ width: 200, marginBottom: 8 }}
                placeholder="Chọn người dùng"
                onChange={onSearch}
                options={dataUser?.map((item) => (
                    {
                        value: item._id,
                        label: item.name
                    }
                ))} />
            <Select
                style={{ width: 200, marginBottom: 8 }}
                placeholder="Chọn đánh giá"
                onChange={onSearch}
                options={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 },
                    { value: 5, label: 5 },
                ]} />
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.content}</p>
                }}
                dataSource={searchResult.length > 0 ? searchResult : dataSourceToRender}
                pagination={{ pageSize: 7, showQuickJumper: true }} />
        </div>

    );
}
