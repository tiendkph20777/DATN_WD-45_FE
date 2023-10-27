import React, { useEffect, useState } from "react";
import {
  Table,
  Popconfirm,
  Button,
  Select,
  Alert,
  Input,
  notification,
} from "antd";
import { IProduct } from "../types/product";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  useGetProductDetailQuery,
  useGetAllProductsDetailQuery,
  useRemoveProductsDetailMutation
} from "../../../services/productDetail.service";

interface DataType {
  key: React.Key;
  size: number;
  color: string;
  quantity: number;
  product_id: string; // Change from id_product to match your data structure
}

const { Option } = Select;

const Dashboard = (props: Props) => {
  const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [searchProductId, setSearchProductId] = useState<string | undefined>(
    undefined
  );
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<DataType[]>([]);
  const [showNoProductsAlert, setShowNoProductsAlert] = useState(false);
  const { data: product } = useGetProductDetailQuery();
  const { data: productData } = useGetAllProductsDetailQuery();
  const [removeProduct] = useRemoveProductsDetailMutation();

  const confirm = async (id) => {
    try {
      // Gọi API xóa sản phẩm bất đồng bộ
      await removeProduct(id);

      // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
      const updatedData = dataSourceToRender.filter((item) => item.key !== id);
      setDataSourceToRender(updatedData);

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
      // Kiểm tra xem product đã được load
      if (product) {
        const updatedDataSource = productData.map(
          ({ _id, size, color, quantity, product_id }: IProduct) => ({
            key: _id,
            size,
            color,
            quantity,
            product_id: product.find((role) => role?._id === product_id)?.name,
          })
        );
        setDataSourceToRender(updatedDataSource);
  
        const updatedUniqueSizes = Array.from(
          new Set(updatedDataSource.map((item) => item.size))
        );
        setUniqueSizes(updatedUniqueSizes);
      }
    }
  }, [productData, product]); // Thêm product vào danh sách dependencies


  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearchProductId(inputValue);

    let filteredData = dataSourceToRender;

    if (selectedColor) {
      filteredData = filteredData.filter((item) =>
        item.color.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    if (selectedSize) {
      filteredData = filteredData.filter(
        (item) => item.size === parseInt(selectedSize)
      );
    }

    if (searchProductId) {
      filteredData = filteredData.filter((item) =>
        item.product_id.toLowerCase().includes(searchProductId.toLowerCase())
      );
    }

    setSearchResult(filteredData);
    setShowNoProductsAlert(filteredData.length === 0);
  };  

  const resetSearch = () => {
    setSelectedColor(undefined);
    setSelectedSize(undefined);
    setSearchProductId(undefined);
    setSearchResult([]);
    setSearchText("");
    setShowNoProductsAlert(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => {
        if (typeof size === "number") {
          return size;
        } else if (typeof size === "string" && !isNaN(Number(size))) {
          return Number(size);
        }
        return size;
      },
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
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
              <Link to={`${id}/edit`} >
              <Button
                type="primary"
                style={{
                  backgroundColor: "blue",
                  margin: "4px",
                  minWidth: "4em",
                }}
              >
                
                  <EditOutlined/> Sửa 
              </Button>
              </Link>

            </div>
          </>
        );
      },
    },
  ];

  return (
    <div style={{paddingTop:"100px"}}>
      {showNoProductsAlert && (
        <Alert message="Không tìm thấy sản phẩm" type="info" showIcon style={{
          marginTop: "20px", backgroundColor:"red"}}  />
      )}

      <div className="search-bar" style={{paddingTop:"100px"}}>
        <Input
          placeholder="Tìm kiếm sản phẩm"
          value={searchProductId}
          onChange={(e) => setSearchProductId(e.target.value)} // ấn để tìm kiếm
          // onChange={onSearch} // tìm kiếm luôn
        />
        <Select
          style={{ width: 200, marginRight: 8 }}
          placeholder="Chọn Màu"
          value={selectedColor}
          onChange={(value) => setSelectedColor(value)}
          style={{ marginBottom: "20px", marginTop: "40px" }}
        >
          <Option value={undefined}>All Color</Option>
          {dataSourceToRender && dataSourceToRender.length > 0 ? (
            dataSourceToRender.map((item) => (
              <Option key={item.color} value={item.color}>
                {item.color}
              </Option>
            ))
          ) : (
            <Option value={undefined}>No colors available</Option>
          )}
        </Select>
        <Select
          style={{ width: 200, marginRight: 8 }}
          placeholder="Chọn Kích Thước"
          value={selectedSize}
          onChange={(value) => setSelectedSize(value)}
        >
          <Option value={undefined}>Tất cả kích thước</Option>
          {uniqueSizes.map((size) => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={onSearch}
          style={{ backgroundColor: "#33CCFF" }}
        >
          Tìm Kiếm
        </Button>
        
        <Button
          type="primary"
          icon={<CloseOutlined />}
          onClick={resetSearch}
          style={{ backgroundColor: "#33CCFF" }}
        >
          Reset
        </Button>
        <Link to={`add`}>

        <Button
          type="primary"
          style={{
            backgroundColor: "blue",
            margin: "4px",
            minWidth: "4em",
          }}
        >
            <PlusOutlined /> Thêm Sản Phẩm
        </Button>
        </Link>

        
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={searchResult.length > 0 ? searchResult : dataSourceToRender}
        pagination={{ pageSize: 5, showQuickJumper: true }}
      />
    </div>
  );
};

export default Dashboard;
