import React, { useState, useEffect } from 'react';
import { Button, Table, Input, notification, Popconfirm } from 'antd';
import { IBrands } from "../../../types/brand.service";
import { useGetBrandsQuery, useRemoveBrandMutation } from '../../../services/brand.service';
import { Link } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string | number;
    name: string,
    image: string,
    description: string,

}
const CategoryView: React.FC = () => {
    const { data: brandData } = useGetBrandsQuery();
    const [removeBrand] = useRemoveBrandMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);

    const confirm = async (id) => {
        try {
            // Gọi API xóa danh mục bất đồng bộ
            await removeBrand(id);

            // Cập nhật dữ liệu sau khi xóa danh mục thành công
            const updatedBrand = dataSource.filter((item) => item.key !== id);
            setDataSource(updatedBrand);

            // Hiển thị thông báo thành công
            notification.success({
                message: "Success",
                description: "Xóa danh mục thành công!",
            });
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error("Error deleting brand", error);
        }
    };
    useEffect(() => {
        if (brandData) {
            const filteredData = brandData.filter((brand: IBrands) =>
                brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const updatedDataSource = filteredData.map((brand: IBrands) => ({
                key: brand._id,
                name: brand.name,
                image: brand.image,
                description: brand.description
            }));
            setDataSource(updatedDataSource);
        }
    }, [brandData, searchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Khi người dùng nhấn Enter để tìm kiếm
        // useEffect sẽ được gọi và cập nhật dataSource
    };

    // const handleDelete = (id?: number | string) => {
    //     if (id) {
    //         removeBrand(id);

    //     }
    // };
    const data = brandData?.map((brand: any) => {
        return {
            key: brand._id,
            ...brand,
        };
    });
    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <img className="image" src={image} alt="image of product" width={100} />
            ),
        },
        {
            title: 'Mô tả sản phẩm',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: "Hành động",
            key: "action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div>
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this product ?"
                                onConfirm={() => confirm(id)}
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

                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "blue",
                                    margin: "4px",
                                    minWidth: "4em",
                                }}
                            >
                                <Link to={`${id}/edit`} >
                                    <EditOutlined />
                                </Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },

    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body mt-5" >
                            <h5 className="card-title fw-semibold mb-4">Danh Mục</h5>
                            <a className="text-white" href="/admin/category/add">
                                <button type="button" className="btn btn-success m-1">Thêm</button>
                            </a>
                            <div className="col-lg-12 d-flex align-items-stretch">
                                <form onSubmit={handleSearch} className="d-flex w-100" method='POST'>
                                    <div className="m-2 w-75">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên sản phẩm cần tìm"
                                            name="searchTerm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="p-2 btn btn-secondary m-2">Tìm kiếm</button>
                                </form>
                            </div>
                            <div className="table-responsive">
                                <Table dataSource={dataSource} columns={columns} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryView;