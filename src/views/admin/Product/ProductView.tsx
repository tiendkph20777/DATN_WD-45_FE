import React, { useEffect, useState } from 'react'
import { Button, Input, Popconfirm, notification } from 'antd';
import { useGetProductsQuery } from '../../../services/product.service';
import { IProducts } from "../../../types/product.service";
import { Link } from 'react-router-dom';
import { useGetBrandsQuery } from '../../../services/brand.service';
import Table, { ColumnsType } from 'antd/es/table';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useRemoveProductMutation } from '../../../services/product.service';

interface DataType {
    key: string | number;
    name: string,
    brand_id: string,
    images: string,
    price: number,
    price_sale: number,
    rate: string,
    description: string,
    content: string,
}

const ProductView = () => {
    const { data: productData } = useGetProductsQuery();
    // console.log(productData)
    const { data: brands } = useGetBrandsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { data: categories } = useGetBrandsQuery();
    // const text = <span>Edit</span>;
    const [removeProduct] = useRemoveProductMutation();
    // const [dataSourceToRenders, setDataSourceToRenders] = useState<DataType[]>([]);

    const confirm = async (id) => {
        try {
            // Gọi API xóa sản phẩm bất đồng bộ
            await removeProduct(id);

            // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
            const updatedData = dataSource.filter((item) => item.key !== id);
            setDataSource(updatedData);

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
                description: product.description,
                content: product.content,
            }));
            setDataSource(updatedDataSource);

        }
    }, [productData, searchTerm]);

    // lọc theo danh mục
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (productData) {
            const filteredData = productData.filter((product: IProducts) => {
                const productNameMatches = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                const categoryMatches = selectedCategory === '' || product.brand_id === selectedCategory;
                return productNameMatches && categoryMatches;
            });
            const updatedDataSource = filteredData.map((product: IProducts) => ({
                key: product._id,
                name: product.name,
                brand_id: product.brand_id,
                images: product.images,
                price: product.price,
                price_sale: product.price_sale,
                description: product.description,
                content: product.content,
            }));
            setDataSource(updatedDataSource);
        }
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tên thương hiệu',
            dataIndex: 'brand_id',
            key: 'brand_id',
            render: (brandId: number | string) => {
                // Find the brand name based on the brand_id
                const brand = brands?.find((brand) => brand._id === brandId);
                return brand ? brand.name : '';

            }
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <img src={image} alt="image" width={100} />,
        },

        {
            title: "Ảnh",
            dataIndex: "images",
            key: "images",
            render: (images: string) => (
                <img className="images" src={images} alt="images of product" width={100} />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Giá bán',
            dataIndex: 'price_sale',
            key: 'price_sale',
        },
        {
            title: 'Mô tả sản phẩm',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Nội dung sản phẩm',
            dataIndex: 'content',
            key: 'content',
        },

        {
            title: "Hành động",
            key: "action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <Link to={`/admin/product/${id}/edit`}>
                            <Button>
                                Sửa
                            </Button>
                        </Link>
                        <Button onClick={() => handleDelete(id)} type='primary' danger className='ml-2'> Xóa</Button>
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
    const data = productData?.map((product: any) => {
        return {
            key: product._id,
            ...product,
        };
    });
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
                                        <select
                                            className="form-select"
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            id="disabledSelect" >
                                            <option value="">Tất cả danh mục</option>
                                            {categories?.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
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
                                <Table columns={columns}
                                    dataSource={dataSource}
                                />
                                {/* pagination={{ pageSize: 5 }} */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView
