import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Select,
  Table,
  Tag,
  Space,
  Input,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useFetchCheckoutQuery,
  useIncreaseProductMutation,
  useUpdateCheckoutMutation,
} from "../../../../services/checkout.service";
import OrderDetails from "./OrderDetails";
import { message as messageApi } from "antd";
import TopUserPurchase from "../../../../components/main/TopUserPurchase";
import { useFetchOneUserQuery } from "../../../../services/user.service";
import ProductSale from "../../home/homeProduct/ProductSale";

const Purchase: React.FC = () => {
  /////// modal chi tiết
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  // model hủy hàng
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  ///////
  const profileUser = JSON.parse(localStorage.getItem("user")!);
  const idUs = profileUser?.user;
  const { data: usersOne } = useFetchOneUserQuery(idUs);

  const { data: orderDa, isLoading, isFetching } = useFetchCheckoutQuery();
  const [updateCheck] = useUpdateCheckoutMutation();
  const [roleMane, setRoleMane] = useState<any>({});
  const [searchResult, setSearchResult] = useState<any>([]);
  const [increaseProduct] = useIncreaseProductMutation();

  const handleEditClick = (id: string) => {
    const productToEdit = orderDa?.find((item) => item?._id === id);
    setRoleMane(productToEdit);
    showModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(orderDa)

  const [searchFullName, setSearchFullName] = useState<string | undefined>(
    undefined
  );

  // const handleFullNameSearchChange = (value: string) => {
  //     setSearchFullName(value.toLowerCase());
  // };
  // console.log(dateCreateArray);

  const nonSuccessfulOrder = orderDa?.map((order: any, index: number) => {
    const date = new Date(order?.dateCreate)?.toLocaleDateString("en-US");
    const totals = order.products.reduce(
      (acc: number, product: any) => acc + (product.total || 0),
      0
    );
    return {
      ...order,
      index: index + 1,
      date: date,
      totals,
    };
  });


  const [cancellationOrderId, setCancellationOrderId] = useState<string | null>(
    null
  );
  const [cancellationOrderStatus, setCancellationOrderStatus] = useState<
    string | null
  >(null);

  const nonSuccessfulOrders = nonSuccessfulOrder
    ?.filter((order) => order.user_id === usersOne?._id)
    ?.filter((order: any) => order.status === "Đang xác nhận đơn hàng")
    ?.filter(
      (order) =>
        !searchFullName || order.fullName.toLowerCase().includes(searchFullName)
    )
    ?.sort(
      (a, b) =>
        new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime()
    )
    ?.map((order, index) => ({ ...order, index: index + 1 }));

  console.log(nonSuccessfulOrders)

  const onFinish = async (values: any, id: string) => {
    try {
      const updatedData = {
        _id: id,
        status: values.status,
      };

      if (values.status === "Hủy đơn hàng") {
        setIsModalOpen(true);
        setCancellationOrderId(id);
        setCancellationOrderStatus(values?.status);
      }
      hideModal();
    } catch (error) {
      console.error("Error updating checkout status:", error);
    }
  };
  // modal xóa
  const onFinish1 = (value: any) => {
    const orderId = cancellationOrderId;
    const increase = orderDa?.find((item: any) => item?._id === orderId);
    const noteDe = {
      _id: orderId,
      noteCancel: value?.note,
      status: cancellationOrderStatus,
    };
    increase?.products.map((item: any) => increaseProduct(item));
    updateCheck(noteDe).unwrap();
    setIsModalOpen(false);
    messageApi.error({
      type: "error",
      content: "Đơn hàng đã bị hủy ",
      className: "custom-class",
      style: {
        marginTop: "0",
        fontSize: "15px",
        lineHeight: "50px",
      },
    });
  };
  // 
  useEffect(() => {
    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
      messageApi.info({
        type: 'error',
        content: successMessage,
        className: 'custom-class',
        style: {
          marginTop: '0',
          fontSize: "20px",
          lineHeight: "50px"
        }
      });
      localStorage.removeItem('successMessage');
    }
  }, []);

  // bảng dữ liệu
  if (isLoading) {
    return (
      <div>
        <div className="right-wrapper">
          <div className="spinnerIconWrapper">
            <div className="spinnerIcon"></div>
          </div>
          <div className="finished-text">Xin vui lòng chờ một chút 🥰🥰🥰</div>
        </div>
      </div>
    );
  }
  const columns: ColumnsType<any> = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (_id: any) => <span className="container">{_id}</span>,
    },
    {
      title: "Tổng tiền đơn hàng",
      dataIndex: "total",
      key: "total",
      render: (_, { total }) => (
        <>
          <Tag
            className="py-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {total?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Tag>
        </>
      ),
    },
    {
      title: "Ngày mua hàng",
      dataIndex: "date",
      key: "date",
      render: (date: any) => <span className="container">{date}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, { status, _id }) => (
        <>
          <Form
            name="complex-form"
            onFinish={(values) => onFinish(values, _id)}
            initialValues={{ status: status }}
            style={{ display: "flex", justifyContent: "right" }}
          >
            <Form.Item label="">
              <Space.Compact>
                <Form.Item
                  name={"status"}
                  noStyle
                  rules={[{ required: true, message: "Province is required" }]}
                >
                  <Input
                    placeholder="Enter status"
                    style={{ width: "250px" }}
                    readOnly
                  />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      title: "Xem chi tiết",
      dataIndex: "",
      key: "action",
      render: (record: any) => (
        <span>
          <Button type="primary" onClick={() => handleEditClick(record?._id)}>
            Chi Tiết
          </Button>

          {/* </Link> */}
        </span>
      ),
    },
    {
      title: "Hủy đơn",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, { status, _id }) => (
        <>
          <Popconfirm
            title="Bạn có chắc muốn hủy đơn hàng không?"
            onConfirm={() => onFinish({ status: "Hủy đơn hàng" }, _id)}
            okText="OK"
            cancelText="Hủy"
          >
            <Button type="primary" danger>
              Hủy đơn
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <section className="our-team position-relative">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div
            className="page-wrapper"
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
          >
            <TopUserPurchase />
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={
              searchResult.length > 0 ? searchResult : nonSuccessfulOrders
            }
          />
          {/* modal chi tiết hàng */}
          <Modal
            title="Chi tiết đơn hàng"
            open={open}
            onOk={hideModal}
            onCancel={hideModal}
            okText="ok"
            cancelText="cancel"
            width={1000}
            style={{ top: 20 }}
          >
            <OrderDetails roleMane={roleMane} />
          </Modal>
          {/* modal hủy hàng */}
          <Modal
            title="Lý do hủy đơn hàng"
            open={isModalOpen}
            onOk={onFinish1}
            onCancel={handleCancel}
          >
            <Form
              name="nest-messages"
              onFinish={onFinish1}
              style={{ maxWidth: 600, paddingTop: 60, paddingBottom: 20 }}
            >
              <Form.Item
                name={"note"}
                rules={[
                  {
                    required: true,
                    message: "Please enter the reason for cancellation!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  placeholder="Nhập lý do hủy đơn hàng ..."
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <ProductSale />
      </div>
    </section>
  );
};

export default Purchase;
