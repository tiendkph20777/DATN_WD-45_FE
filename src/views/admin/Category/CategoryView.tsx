import React, { useState, useEffect } from 'react';
import { Button, Table, Input, notification, Popconfirm } from 'antd';
import { IBrands } from "../../../types/brand";
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
    const { data: brandData, isLoading } = useGetBrandsQuery();
    const [removeBrand] = useRemoveBrandMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);

    const confirm = async (id: number | string) => {
        try {
            // Gọi API xóa sản phẩm bất đồng bộ
            await removeBrand(id);

            // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
            const updatedDataSource = dataSource.filter((item) => item.key !== id);
            setDataSource(updatedDataSource);
            // Hiển thị thông báo thành công
            notification.success({
                message: "Success",
                description: "Xóa sản phẩm thành công!",
            });
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error("Error deleting product", error);
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

    if (isLoading) {
        return <div>
            <div className="right-wrapper" style={{ paddingTop: "100px" }}>
                <div className="spinnerIconWrapper">
                    <div className="spinnerIcon"></div>
                </div>
                <div className="finished-text">
                    Xin vui lòng chờ một chút 🥰🥰🥰
                </div>
            </div>
        </div>;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Thương Hiệu',
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
            title: 'Mô tả ',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: <a className="text-white" href="/admin/category/add">
            <button type="button" className="btn add-new btn-success m-1">Thêm</button>
        </a>,
            key: "action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div className='row'>
                            <Popconfirm
                            className='col-6'
                                title="Xóa thương hiệu"
                                description="Bạn có chắc chắn muốn xóa thương Hiệu này ?"
                                onConfirm={() => confirm(id)}
                                okText="Xóa"
                                cancelText="Quay Lại"
                            >
                                <Button
                                className='bg-danger text-light'
                                    // type="primary"
                                    // style={{
                                    //     backgroundColor: "red",
                                    //     margin: "4px",
                                    //     minWidth: "4em",
                                    // }}
                                >
                                    <i className="ti ti-power"></i>
                                </Button>
                            </Popconfirm>

                            <Button
                            className='col-6'
                                type="primary"
                                // style={{
                                //     backgroundColor: "blue",
                                //     margin: "4px",
                                //     minWidth: "4em",
                                // }}
                            >
                                <Link to={`${id}/edit`} >
                                <i className="ti ti-edit"></i>
                                </Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },

    ];
    const data = brandData?.map((brand: any) => {
        return {
            key: brand._id,
            ...brand,
        };
    });
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body mt-5" >
                            <h5 className="card-title add-new p-4 border-1 fw-semibold mb-4">Thương Hiệu</h5>
                            
                            <div className="col-lg-12 d-flex align-items-stretch">
                                <form onSubmit={handleSearch} className="d-flex w-100" method='POST'>
                                    <div className="m-2 w-75">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên thương hiệu cần tìm"
                                            name="searchTerm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="p-2 w-25 btn btn-secondary m-2">Tìm kiếm</button>
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