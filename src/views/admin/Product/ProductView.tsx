import React, { useEffect, useState } from 'react'
import { Button, Input, Table } from 'antd';
import { useGetProductsQuery, useRemoveProductMutation } from '../../../services/product.service';
import { IProducts } from "../../../types/product.service";
import { Link } from 'react-router-dom';

const ProductView: React.FC = () => {
    const { data: productData } = useGetProductsQuery();
    console.log(productData)
    const [removeProduct] = useRemoveProductMutation();

    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);

    useEffect(() => {
        if (productData) {
            const filteredData = productData.filter((brand: IProducts) =>
                brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const updatedDataSource = filteredData.map((product: IProducts) => ({
                key: product._id,
                name: product.name,
                brand_id: product.brand_id,
                images: product.images,
                price: product.price,
                price_sale: product.price_sale,
            }));
            setDataSource(updatedDataSource);

        }
    }, [productData, searchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Khi người dùng nhấn Enter để tìm kiếm
        // useEffect sẽ được gọi và cập nhật dataSource
    };
    const handleDelete = (id?: number | string) => {
        if (id) {
            removeProduct(id);
        }
    };
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tên thương hiệu',
            dataIndex: 'brand_id',
            key: 'brand_id',
            // render: (brandId: number | string) => {
            //     // Find the brand name based on the brand_id
            //     const brand = productData?.find((product: IProducts) => product.brand_id === brandId);
            //     return brand ? brand.name : '';

            // },

        },
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (image: string) => <img src={image} alt="Product image" width={100} />,

        },

        {
            title: 'Mã giảm giá',
            dataIndex: 'price_sale',
            key: 'price_sale',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: ({ key: id }: { key: number | string }) => {
                return (
                    <>

                        <Button>
                            <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
                        </Button>
                        <Button onClick={() => handleDelete(id)} type='primary' danger className='ml-2'> Xóa</Button>
                    </>
                )
            }
        },
    ];
    return (
        <div className="">
            <div className="row">

                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body mt-5">
                            <h5 className="card-title fw-semibold mb-4">Sản Phẩm</h5>
                            <a className="text-white" href="/admin/product/add">
                                <button type="button" className="btn btn-success m-1">Thêm</button>
                            </a>
                            <div className="col-lg-12 d-flex align-items-stretch">
                                <form onSubmit={handleSearch} action="" className="row w-100">
                                    <div className="mt-2 col-3">
                                        <select id="disabledSelect" className="form-select ">
                                            <option selected>Tìm theo danh mục</option>
                                            <option>Nike</option>
                                            <option>Nike</option>
                                        </select>
                                    </div>
                                    <div className="mt-2 col-5">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên sản phẩm cần tìm"
                                            name="searchTerm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="col-4 p-2 btn btn-secondary mt-2">Tìm kiếm</button>

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

export default ProductView