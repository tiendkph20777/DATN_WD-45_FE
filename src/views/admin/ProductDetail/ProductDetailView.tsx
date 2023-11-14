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
import { Link, useParams } from "react-router-dom"; // Import thêm useParams
import {
  SearchOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  useGetProductDetailQuery,
  useGetAllProductsDetailQuery,
  useRemoveProductsDetailMutation,
  useGetProductDetailByIdQuery,
} from "../../../services/productDetail.service";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../services/product.service";

const { Option } = Select;

interface DataType {
  key: React.Key;
  size: number;
  color: string;
  quantity: number;
  product_id: string;
}

const Dashboard = (props: Props) => {
  const { id } = useParams();
  console.log("ID:", id);
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
  const { data: productData, refetch: refetchProductData } =
    useGetAllProductsDetailQuery();
  const { data: productDetailData } = useGetProductByIdQuery(id);

  const [removeProduct] = useRemoveProductsDetailMutation();

  const confirm = async (id: any) => {
    try {
      await removeProduct(id);
      const updatedData = dataSourceToRender.filter((item) => item.key !== id);
      setDataSourceToRender(updatedData);
      notification.success({
        message: "Success",
        description: "Xóa sản phẩm thành công!",
      });
    } catch (error) {
      console.error("Error deleting product", error);
      notification.error({
        message: "Error",
        description: "Xóa sản phẩm không thành công. Vui lòng thử lại!",
      });
    }
  };
  useEffect(() => {
    if (productDetailData) {
      if (product) {
        const productIdToFind = id;

        const filteredProducts = productData?.filter(
          (product) => product.product_id === productIdToFind
        );

        console.log(filteredProducts);

        const updatedDataSource = filteredProducts?.map(
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
          new Set(updatedDataSource?.map((item) => item.size))
        );
        setUniqueSizes(updatedUniqueSizes);
      }
    }
  }, [productDetailData, product, productData]);

  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearchProductId(inputValue);

    let filteredData = dataSourceToRender;

    if (selectedColor) {
      filteredData = filteredData.filter(
        (item) =>
          item.color &&
          item.color.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    if (selectedSize) {
      filteredData = filteredData.filter(
        (item) => item.size === parseInt(selectedSize)
      );
    }

    if (searchProductId) {
      filteredData = filteredData.filter((item) => {
        return (
          item &&
          item.product_id &&
          item.product_id.toLowerCase().includes(searchProductId.toLowerCase())
        );
      });
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

  const handleAddProduct = async (newProduct) => {
    // Gọi API hoặc thực hiện thêm sản phẩm tại đây
    // Sau khi thêm sản phẩm thành công, gọi lại dữ liệu để cập nhật danh sách sản phẩm
    await refetchProductData();
    notification.success({
      message: "Success",
      description: "Thêm sản phẩm thành công!",
    });
  };

  const columns = [
    {
      title: "Tên Sản phẩm",
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
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Hành động",
      key: "action",
<<<<<<< HEAD
      render: ({ key: id }: any) => {
        return (
          <>
            <div>
              <Popconfirm
                title="Xóa sản phẩm này"
                description="Bạn có chắc chắn muốn xóa sản phẩm này ?"
                onConfirm={() => confirm(id)}
                okText="Xóa"
                cancelText="Hủy"
<<<<<<< HEAD
=======
      render: ({ key: id }: any) => (
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
>>>>>>> b30b4e1 (color)
=======
>>>>>>> 92fa84a4ba63ed6b25b67ab6988fe8906e08ca52
              >
                <CloseOutlined />
              </Button>
            </Popconfirm>
            <Link to={`edit/${id}`}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "blue",
                  margin: "4px",
                  minWidth: "4em",
                }}
              >
                <EditOutlined /> Sửa
              </Button>
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <div style={{ paddingTop: "70px" }}>
      {showNoProductsAlert && (
        <Alert
          message="Không tìm thấy sản phẩm"
          type="info"
          showIcon
          style={{
            marginTop: "20px",
            backgroundColor: "red",
          }}
        />
      )}
      <div className="search-bar">
        <Input
          placeholder="Tìm kiếm sản phẩm"
          value={searchProductId}
          onChange={(e) => setSearchProductId(e.target.value)}
        />
        <Select
          style={{ width: 200, marginRight: 8 }}
          placeholder="Chọn Màu"
          value={selectedColor}
          onChange={(value) => setSelectedColor(value)}
          style={{ marginBottom: "20px", marginTop: "40px" }}
        >
          <Option value={undefined}>Tất cả màu sắc</Option>
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
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
>>>>>>> b30b4e1 (color)
=======
>>>>>>> 92fa84a4ba63ed6b25b67ab6988fe8906e08ca52
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
        pagination={{ pageSize: 10, showQuickJumper: true }}
      />
    </div>
  );
};

export default Dashboard;
