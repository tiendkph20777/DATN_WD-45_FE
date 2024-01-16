import React, { useState, useEffect } from "react";
import { Button, Table, notification, Tag } from "antd";
import { IVouchers } from "../../../types/voucher";
import {
  useGetVouchersQuery,
  useRemoveVoucherMutation,
  useUpdateVoucherStatusMutation,
} from "../../../services/voucher.service";
import { Link } from "react-router-dom";

const VoucherView: React.FC = () => {
  const { data: voucherData, isLoading } = useGetVouchersQuery();
  const [removeVoucher] = useRemoveVoucherMutation();
  const [updateVoucherStatus] = useUpdateVoucherStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] = useState<Array<any>>([]);

  const toggleVoucherStatus = async (id: any, status: boolean) => {
    try {
      const voucher = dataSource.find((item) => item.key === id);

      // Kiểm tra xem mã giảm giá có hết hạn không
      if (voucher && !status && isExpired(voucher.date_end)) {
        notification.warning({
          message: "Cảnh báo",
          description: "Mã giảm giá đã hết hạn. Vui lòng gia hạn để sử dụng!",
        });
        return;
      }

      // Gọi API để cập nhật trạng thái trong cơ sở dữ liệu
      const response = await updateVoucherStatus({ id, status });

      if (response.error) {
        console.error("Error updating voucher status:", response.error);
        // Hiển thị thông báo lỗi nếu cần
        notification.error({
          message: "Error",
          description: "Có lỗi xảy ra khi cập nhật trạng thái.",
        });
      } else {
        // Nếu mutation thành công, cập nhật dataSource
        const updatedData = dataSource.map((item) =>
          item.key === id ? { ...item, status: !status } : item
        );
        setDataSource(updatedData);

        notification.success({
          message: "Success",
          description: `Đã ${status ? "tắt" : "bật"} mã giảm giá thành công!`,
        });
      }
    } catch (error) {
      console.error("Error toggling voucher status", error);
    }
  };

  const isExpired = (date_end: string): boolean => {
    const currentDate = new Date();
    const expirationDate = new Date(date_end);
    return expirationDate <= currentDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleExpiredVouchers();
      updateDataSource();
    };

    fetchData();
  }, [voucherData, searchTerm]);

  const handleExpiredVouchers = async () => {
    try {
      if (dataSource) {
        const expiredVouchers = dataSource.filter(({ date_end }: IVouchers) => {
          const currentDate = new Date();
          const expirationDate = new Date(date_end);
          return expirationDate <= currentDate;
        });

        if (expiredVouchers.length > 0) {
          await Promise.all(
            expiredVouchers.map(async (voucher) => {
              await toggleVoucherStatus(voucher.key, voucher.status);
            })
          );
        }
      }
    } catch (error) {
      console.error("Lỗi khi xử lý mã giảm giá hết hạn:", error);
    }
  };

  const updateDataSource = () => {
    if (voucherData) {
      const updatedDataSource = voucherData
        .filter(({ date_end }: IVouchers) => {
          const currentDate = new Date();
          const expirationDate = new Date(date_end);
          return expirationDate > currentDate;
        })
        .map(
          ({
            _id,
            code,
            value,
            quantity,
            date_start,
            date_end,
            status,
          }: IVouchers) => ({
            key: _id,
            code,
            value,
            quantity,
            date_start,
            date_end,
            status: status || false,
          })
        );

      setDataSource(updatedDataSource);
    }
  };

  const confirm = async (id: any) => {
    try {
      // Gọi API xóa sản phẩm bất đồng bộ
      await removeVoucher(id);

      // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
      const updatedData = dataSource.filter((item) => item.key !== id);
      setDataSource(updatedData);

      // Hiển thị thông báo thành công
      notification.success({
        message: "Success",
        description: "Xóa voucher thành công!",
      });
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error("Error deleting product", error);
    }
  };

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

  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: number) => (
        <>
          <Tag
            className="py-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {value?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Tag>
        </>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "date_start",
      key: "date_start",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "date_end",
      key: "date_end",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: any) => (
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
          <Button onClick={() => toggleVoucherStatus(id, status)}>
            {status ? "Tắt" : "Bật"}
          </Button>
        </>
      ),
    },

    {
      render: ({ key: id }: { key: number | string }) => (
        <>
          <Link to={`/admin/voucher/${id}/edit`}>
            <Button>Update</Button>
          </Link>
          <Button onClick={() => confirm(id)}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body" style={{ paddingTop: "70px" }}>
              <h5 className="card-title fw-semibold ">Mã giảm giá</h5>
              <Link to="/admin/voucher/add">
                <button type="button" className="btn btn-success m-1">
                  Thêm
                </button>
              </Link>

              <div className="col-lg-12 d-flex align-items-stretch"></div>
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

export default VoucherView;
