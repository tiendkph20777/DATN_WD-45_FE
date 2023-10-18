import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, Select } from "antd";
import { IProduct } from "../interface/product";
import { Link } from "react-router-dom";
import Search from "antd/es/transfer/search";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

import {
  useGetProductsQuery,
  useRemoveProductsMutation,
} from "../../services/product.service";

interface DataType {
  key: React.Key;
  size: number;
  color: string;
  quantity: number;
  categoryId: number;
}

const { Option } = Select;

const dashboard = (props: Props) => {
  const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  // const uniqueSizes = Array.from(
  //   new Set(dataSourceToRender.map((item) => item.size))
  // );
  // const uniqueSizes = Array.from(new Set(dataSourceToRender.map((item) => item.size)));

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<DataType[]>([]);

  const { data: productData } = useGetProductsQuery();
  const [removeProduct] = useRemoveProductsMutation();
  const confirm = (id) => {
    console.log(id);
    removeProduct(id);
    window.location.reload();
  };
  console.log("Unique sizes:", uniqueSizes);
  console.log("Selected size:", selectedSize);
  console.log("Data source to render:", dataSourceToRender);
  useEffect(() => {
    if (productData) {
      // Update dataSourceToRender when productData changes
      const updatedDataSource = productData.map(
        ({ _id, size, color, quantity, id_product }: IProduct) => ({
          key: _id,
          size,
          color,
          quantity,
          id_product,
        })
      );
      setDataSourceToRender(updatedDataSource);

      // Update uniqueSizes based on updatedDataSource
      const updatedUniqueSizes = Array.from(
        new Set(updatedDataSource.map((item) => item.size))
      );
      setUniqueSizes(updatedUniqueSizes);
    }
  }, [productData]);
  // const onSearch = (value: string) => {
  //   const filteredData = dataSource.filter((item) =>
  //     item.color.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setSearchResult(filteredData);
  //   setSearchText(value);
  // };

  const onSearch = (value: string) => {
    let filteredData = dataSourceToRender;
    // Lọc Theo màu
    if (selectedColor) {
      filteredData = filteredData.filter((item) =>
        item.color.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }
    //Lọc Theo từ khóa
    // if (value) {
    //   filteredData = filteredData.filter((item) =>
    //     item.name.toLowerCase().includes(value.toLowerCase())
    //   );
    // }
    // Lọc theo kích thước
    if (selectedSize) {
      // Kiểm tra kiểu dữ liệu trước khi chuyển đổi thành chữ thường
      filteredData = filteredData.filter(
        (item) => item.size === parseInt(selectedSize)
      );
    }

    setSearchResult(filteredData);
    setSearchText(value);
  };

  useEffect(() => {
    onSearch(searchText);
  }, [selectedColor, productData]);

  // const dataSourceToRender = dataSource || [];
  // console.log(dataSourceToRender);

  const columns = [
    {
      title: "Product_id",
      dataIndex: "id_product",
      key: "id_product",
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
        return size; // Nếu không phải số, hiển thị nguyên bản
      }
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

              <Button
                type="primary"
                style={{
                  backgroundColor: "blue",
                  margin: "4px",
                  minWidth: "4em",
                }}
              >
                <Link to={`edit/${id}`}>
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
    <div>
      <Search
        placeholder="Search product"
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
        enterButton
        style={{ marginBottom: 8 }}
      />
      <Select
        style={{ width: 200, marginBottom: 8 }}
        placeholder="Chọn Màu"
        value={selectedColor}
        onChange={(value) => setSelectedColor(value)}
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
        style={{ width: 200, marginBottom: 8 }}
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
      {/* <Button
        type="primary"
        style={{ backgroundColor: "gray", margin: "10px" }}
        onClick={handleColorReset}
      >
        Reset Color
      </Button> */}
      <Button
        type="primary"
        style={{ backgroundColor: "green", margin: "10px" }}
      >
        <Link to={"add"}>
          <EditOutlined />
          Add Product
        </Link>
      </Button>
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

export default dashboard;
