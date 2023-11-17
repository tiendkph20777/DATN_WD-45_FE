import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, notification } from "antd";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../services/product.service";
import { IProducts } from "../../../types/product.service";
import { Link } from "react-router-dom";
import { useGetBrandsQuery } from "../../../services/brand.service";
import Table, { ColumnsType } from "antd/es/table";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useRemoveProductMutation } from "../../../services/product.service";
import { useParams } from "react-router-dom";

interface DataType {
  key: string | number;
  name: string;
  brand_id: string;
  images: string;
  price: number;
  price_sale: number;
  rate: string;
  description: string;
  content: string;
}

const ProductView = () => {
  const { id:idProduct } = useParams();
  const { data: productData } = useGetProductsQuery();
  const { data: productDetailData } = useGetProductByIdQuery();
  // console.log(productData)
  const { data: brands } = useGetBrandsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories } = useGetBrandsQuery();
  const [removeProduct] = useRemoveProductMutation();
  // const [dataSourceToRenders, setDataSourceToRenders] = useState<DataType[]>([]);

  const confirm = async (id: number | string) => {
    try {
      // Gọi API xóa sản phẩm bất đồng bộ
      await removeProduct(id);

      // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
      const updatedDataSource = dataSource.filter((item) => item.key !== id);
      setDataSource(updatedDataSource);

      notification.success({
        message: "Success",
        description: "Xóa sản phẩm thành công!",
      });
    } catch (error) {
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
        const productNameMatches = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const categoryMatches =
          selectedCategory === "" || product.brand_id === selectedCategory;
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "brand_id",
      key: "brand_id",
      render: (brandId: number | string) => {
        // Find the brand name based on the brand_id
        const brand = brands?.find((brand) => brand._id === brandId);
        return brand ? brand.name : "";
      },
    },

    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      width: 200,
      render: (images: string) => (
        <img
          className="images"
          src={images[0]}
          alt="images of product"
          width={100}
        />
      ),
    },
    {
      title: "Giá niêm yết",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Giá bán",
      dataIndex: "price_sale",
      key: "price_sale",
    },
    // {
    //     title: 'Mô tả sản phẩm',
    //     dataIndex: 'description',
    //     key: 'description',
    // },
    {
      title: "Nội dung sản phẩm",
      dataIndex: "content",
      key: "content",
    },

    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: any) => {
        return (
          <>
            <div>
              <Popconfirm
                title="Xóa sản phẩm này!"
                description="Bạn có chắc chắn muốn xóa sản phẩm này ?"
                onConfirm={() => confirm(id)}
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
              <Link to={`detail/${id}`}>
                {/* Modify the Link component above to include the correct path */}
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "green", // Change the color as needed
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  Chi tiết
                </Button>
              </Link>
              <Link to={`detail/add/${id}`}>
                {/* Modify the Link component above to include the correct path */}
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "green", // Change the color as needed
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  Thêm Chi tiết
                </Button>
              </Link>
              <Link to={`${id}/edit`}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "blue",
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  <EditOutlined />
                </Button>
              </Link>

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
                <button type="button" className="btn btn-success m-1">
                  Thêm
                </button>
              </a>
              <div className="col-lg-12 d-flex align-items-stretch">
                <form onSubmit={handleSearch} action="" className="row w-100">
                  <div className="mt-2 col-3">
                    <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      id="disabledSelect"
                    >
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
                  <button
                    type="submit"
                    className="col-4 p-2 btn btn-secondary mt-2"
                  >
                    Tìm kiếm
                  </button>
                </form>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  expandable={{
                    expandedRowRender: (record: any) => (
                      <p style={{ margin: 0 }}>{record.description}</p>
                    ),
                    rowExpandable: (record: any) =>
                      record.firstName !== "Not Expandable",
                  }}
                  dataSource={dataSource}
                  pagination={{ pageSize: 5, showQuickJumper: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
