import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, notification, Tag } from "antd";
import {
  useGetProductsQuery,
  useUpdateProductStatusMutation,
} from "../../../services/product.service";
import { IProducts } from "../../../types/product2";
import { Link } from "react-router-dom";
import { useGetBrandsQuery } from "../../../services/brand.service";
import Table, { ColumnsType } from "antd/es/table";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useRemoveProductMutation } from "../../../services/product.service";

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
  status: boolean;
}

const ProductView = () => {
  const { data: productData, isLoading } = useGetProductsQuery();
  const { data: brands } = useGetBrandsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] = useState<Array<DataType>>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories } = useGetBrandsQuery();
  const [removeProduct] = useRemoveProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  useEffect(() => {
    if (productData) {
      const filteredData = productData.filter((product: IProducts) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) && product.status === true
      );

      // Sort by creation date in descending order
      const sortedData = filteredData.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      const updatedDataSource = sortedData.map((product: IProducts) => ({
        key: product._id,
        name: product.name,
        brand_id: product.brand_id,
        images: product.images,
        price: product.price,
        price_sale: product.price_sale,
        description: product.description,
        content: product.content,
        status: product.status,
      }));

      setDataSource(updatedDataSource);
    }
  }, [productData, searchTerm]);


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
        status: product.status,
      }));

      setDataSource(updatedDataSource);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);

  const toggleProductStatus = async (id: number | string, status: boolean) => {
    try {
      console.log("Toggle Product Status - Start:", id, status);

      // Gửi mutation để cập nhật trạng thái trong cơ sở dữ liệu
      const result = await updateProductStatus({ id, status: !status });

      console.log("Update product status result:", result);

      notification.success({
        message: "Success",
        description: `Đã đưa sản phẩm vào kho!`,
      });

      const updatedData = dataSource.map((item) =>
        item.key === id ? { ...item, status: !status } : item
      );
      setDataSource(updatedData);

      // Cập nhật trạng thái sản phẩm trực tiếp trong state

      console.log("Toggle Product Status - End");
    } catch (error) {
      console.error("Error toggling product status", error);
    }
  };

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

      // Clear the selected product if it's the one being deleted
      if (selectedProduct && selectedProduct.key === id) {
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="right-wrapper" style={{ paddingTop: "100px" }}>
          <div className="spinnerIconWrapper">
            <div className="spinnerIcon"></div>
          </div>
          <div className="finished-text">Xin vui lòng chờ một chút 🥰🥰🥰</div>
        </div>
      </div>
    );
  }
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
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <span>
          {record.price?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },

    {
      title: "Giá bán sau giảm giá",
      dataIndex: "price_sale",
      key: "price_sale",
      render: (text, record) => (
        <span>
          {record.price_sale?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    // {
    //     title: 'Mô tả sản phẩm',
    //     dataIndex: 'description',
    //     key: 'description',
    // },
    // {
    //   title: "Nội dung sản phẩm",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: DataType) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Hoạt Động" : "Tắt"}
        </Tag>
      ),
    },
    {
      title: <a className="text-white" href="/admin/product/add">
        <button type="button" className="btn add-new btn-success m-1">
          Thêm Sản Phẩm
        </button>
      </a>,
      key: "action",
      render: ({ key: id, status }: any) => {
        return (
          <>
            <div>
              <Popconfirm
                title="Sản phẩm vào kho hàng!"
                description="Bạn có chắc chắn muốn cho sản phẩm này vào kho hàng?"
                onConfirm={() => toggleProductStatus(id, status)}
                okText="Đồng Ý"
                cancelText="Quay Lại"
              >
                <Button
                  className="text-light m-1"
                  style={{
                    background: "red",
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  <i className="ti ti-power m-1"></i> Trạng Thái
                </Button>
              </Popconfirm>
              <Link to={`${id}/edit`}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "blue",
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  <i className="ti ti-edit m-1"></i> Chi tiết
                </Button>
              </Link>
              <Link to={`detail/${id}`}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "green", // Change the color as needed
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  <i className="ti ti-eye m-1"></i> Chi tiết biến thể
                </Button>
              </Link>
              <Link to={`detail/add/${id}`}>
                <Button
                  className="bg-dark text-light"
                  style={{
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  <i className="ti ti-plus m-1"></i>Thêm biến thể
                </Button>
              </Link>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="">
      <div className="row">
        <div className="col-lg-12 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body mt-7">
              <h5 className="card-title fw-semibold mb-4">Sản Phẩm</h5>

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
                  <div className="mt-2 col-7">
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
                    className="col-2 p-2 btn btn-secondary mt-2"
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
                      <p style={{ margin: 0 }}>{record.content}</p>
                    ),
                    rowExpandable: (record: any) =>
                      record.firstName !== "Not Expandable",
                  }}
                  dataSource={dataSource}
                  pagination={{ pageSize: 10, showQuickJumper: true }}
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
