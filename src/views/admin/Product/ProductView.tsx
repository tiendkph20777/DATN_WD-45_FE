import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, notification, Tag } from "antd";
import { useGetProductsQuery } from "../../../services/product.service";
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
  status:boolean
}

const ProductView = () => {
  const { data: productData, isLoading } = useGetProductsQuery();
  // console.log(productData)
  const { data: brands } = useGetBrandsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories } = useGetBrandsQuery();
  const [removeProduct] = useRemoveProductMutation();
  const [productStatus, setProductStatus] = useState<Record<string, boolean>>(
    {}
  );

  const toggleProductStatus = async (id: number | string, status: boolean) => {
    try {
      const updatedData = dataSource.map((item) =>
        item.key === id ? { ...item, status: !status } : item
      );
      setDataSource(updatedData);

      notification.success({
        message: "Success",
        description: `Đã ${status ? "tắt" : "bật"} sản phẩm thành công!`,
      });

      saveProductStatusToLocalStorage(id, !status);
    } catch (error) {
      console.error("Error toggling product status", error);
    }
  };

  const getProductStatusFromLocalStorage = (id: number | string) => {
    const storedData = JSON.parse(localStorage.getItem("productStatus")) || {};
    return storedData[id] || false; // Nếu không có trạng thái, trả về false
  };

  const saveProductStatusToLocalStorage = (
    id: number | string,
    status: boolean
  ) => {
    const storedData = JSON.parse(localStorage.getItem("productStatus")) || {};
    storedData[id] = status;
    localStorage.setItem("productStatus", JSON.stringify(storedData));
  };

  const restoreProductStatusFromLocalStorage = () => {
    const updatedData = dataSource.map((item) => ({
      ...item,
      status: getProductStatusFromLocalStorage(item.key),
    }));

    setDataSource(updatedData);
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
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };
  useEffect(() => {
    if (productData) {
      const filteredData = productData.filter((brand: IProducts) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        status: getProductStatusFromLocalStorage(product._id),
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
        status: getProductStatusFromLocalStorage(product._id),
      }));
      setDataSource(updatedDataSource);
    }
  };
  useEffect(() => {
    restoreProductStatusFromLocalStorage();
  }, []);
  //
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
    {
      title: "Nội dung sản phẩm",
      dataIndex: "description",
      key: "description",
    },
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
      title: "Hành động",
      render: ({
        key: id,
        status,
      }: {
        key: number | string;
        status: boolean;
      }) => (
        <>
          <Button onClick={() => toggleProductStatus(id, status)}>
            {status ? "Tắt" : "Bật"}
          </Button>
        </>
      ),
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
              <Link to={`detail/${id}`}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "green", // Change the color as needed
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  Chi tiết màu size
                </Button>
              </Link>
              <Link to={`detail/add/${id}`}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "green", // Change the color as needed
                    margin: "4px",
                    minWidth: "4em",
                  }}
                >
                  Thêm màu size
                </Button>
              </Link>
            </div>
          </>
        );
      },
    },
  ];
  // const data = productData?.map((product: any) => {
  //   return {
  //     key: product._id,
  //     ...product,
  //   };
  // });
  return (
    <div className="">
      <div className="row">
        <div className="col-lg-12 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body mt-7">
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
