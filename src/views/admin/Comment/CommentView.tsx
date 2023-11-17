import { useEffect, useState } from 'react';
import { Select, Table } from 'antd';
import { Button, Input, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined } from '@ant-design/icons';
import { useFetchUserQuery } from '../../../services/user.service';
import { message as messageApi } from 'antd';
import { useFetchCommentQuery, useRemoveCommentMutation } from '../../../services/comment.service';
import { useGetProductsQuery } from '../../../services/product.service';

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
    const [Product_Remove] = useRemoveCommentMutation();
    const { data: dataPro } = useGetProductsQuery();
    const { data: dataUser } = useFetchUserQuery();
    const { data: dataCmt } = useFetchCommentQuery();
    const { Search } = Input;
    useEffect(() => {
        if (dataCmt && dataPro && dataUser) {
            const updatedDataSource = dataCmt.map(
                ({ _id, content, id_product, id_user, rate }: DataType, key: string) => ({
                    key,
                    _id,
                    content,
                    rate,
                    id_product: dataPro?.find((role) => role?._id === id_product)?.name,
                    id_user: dataUser?.find((role) => role?._id === id_user)?.fullName
                })
            );
            setDataSourceToRender(updatedDataSource);
        }
    }, [dataCmt && dataPro && dataUser]);

    const onSearch = (value: string | number) => {
        let filteredData = dataSourceToRender;
        filteredData = filteredData.filter((item) => {
            return (
                item.id_product == value || item.id_user == value || item.rate == value
            );
        }
        );
        if (filteredData.length == 0) {
            messageApi.error({
                type: 'error',
                content: "Không có bình luận nào cả ",
                className: 'custom-class',
                style: {
                    marginTop: '0',
                    fontSize: "15px",
                    lineHeight: "50px"
                },
            });
        }
        setSearchResult(filteredData);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Người dùng',
            dataIndex: 'id_user',
            key: '1'
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
                        title="Xóa bình luận này!"
                        description="Bạn có chắc chắn muốn xóa bình luận này ?"
                        onConfirm={() => Product_Remove({ id })}
                        okText="Xóa"
                        cancelText="Hủy"
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
        <div style={{ paddingTop: "70px" }}>
            <Search
                placeholder="Tìm kiếm"
                onSearch={onSearch}
                style={{ width: 200, marginLeft: 10 }} />

            <Select
                style={{ width: 200, marginBottom: 8, marginLeft: 10 }}
                placeholder="Chọn sản phẩm"
                onChange={onSearch}
                options={dataPro?.map((item) =>
                (
                    {
                        value: item.name,
                        label: item.name
                    }
                ))} />
            <Select
                style={{ width: 200, marginBottom: 8, marginLeft: 10 }}
                placeholder="Chọn người dùng"
                onChange={onSearch}
                options={dataUser?.map((item) => (
                    {
                        value: item.fullName,
                        label: item.fullName
                    }
                ))} />
            <Select
                style={{ width: 200, marginBottom: 8, marginLeft: 10 }}
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
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.content}</p>,
                    rowExpandable: (record) => record.content !== 'Not Expandable',
                }}
                dataSource={searchResult.length > 0 ? searchResult : dataSourceToRender}
                pagination={{ pageSize: 10, showQuickJumper: true }} />
        </div>

    );
}
