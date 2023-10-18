import React, { useState, useEffect } from 'react';
import { Button, Table, Input } from 'antd';
import { IBrands } from "../../../types/brand.service";
import { useGetBrandsQuery, useRemoveBrandMutation } from '../../../services/brand.service';
import { Link } from 'react-router-dom';

const CategoryView: React.FC = () => {
    const { data: brandData } = useGetBrandsQuery();
    const [removeBrand] = useRemoveBrandMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);

    useEffect(() => {
        if (brandData) {
            const filteredData = brandData.filter((brand: IBrands) =>
                brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const updatedDataSource = filteredData.map((brand: IBrands) => ({
                key: brand._id,
                name: brand.name,
            }));
            setDataSource(updatedDataSource);
        }
    }, [brandData, searchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Khi người dùng nhấn Enter để tìm kiếm
        // useEffect sẽ được gọi và cập nhật dataSource
    };

    const handleDelete = (id?: number | string) => {
        if (id) {
            removeBrand(id);

        }
    };

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            render: ({ key: id }: { key: number | string }) => {
                return (
                    <>
                        <Button>
                            <Link to={`/admin/category/${id}/edit`}>Sửa</Link>
                        </Button>
                        <Button onClick={() => handleDelete(id)} type='primary' danger className='ml-2'>Xóa</Button>
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
                        <div className="card-body mt-5" style={{ height: "100vh" }}>
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