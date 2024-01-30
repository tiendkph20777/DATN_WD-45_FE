import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { subDays, startOfDay, format, subMonths, startOfMonth } from "date-fns";
import { useFetchCheckoutQuery } from "../../../services/checkout.service";

interface ChartData {
  time: string;
  value: number;
  date: Date;
}
const ChartViewToggle: React.FC<{ onViewChange: (mode: string) => void }> = ({
  onViewChange,
}) => {
  return (
    <div>
      <button
        className="btn btn-warning btn_dashboard"
        onClick={() => onViewChange("day")}
      >
        Doanh thu theo tuần
      </button>
      <button
        className="btn btn-warning btn_dashboard"
        onClick={() => onViewChange("month")}
      >
        Doanh thu theo tháng
      </button>
    </div>
  );
};

const Bieudo = () => {
  const { data: orderDa } = useFetchCheckoutQuery();
  const [viewMode, setViewMode] = useState("day"); // Mặc định là xem theo ngày
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7));
  const nonSuccessfulOrder = orderDa?.map((order: any, index) => {
    const date = new Date(order?.dateCreate)?.toLocaleDateString("en-US");
    const datehis = new Date(order?.updatedAt)?.toLocaleDateString("en-US");
    const totals = order.products.reduce(
      (acc: number, product: any) => acc + (product.total || 0),
      0
    );
    return {
      ...order,
      index: index + 1,
      totals,
      date: date,
      datehis: datehis,
    };
  });
  const successfulOrders = nonSuccessfulOrder?.filter(
    (order: any) => order.status === "Giao hàng thành công"
  );

  useEffect(() => {
    setStartDate(subDays(new Date(), 7));
  }, [viewMode]); // Chạy khi chế độ xem thay đổi

  const toggleViewMode = (mode: string) => {
    setViewMode(mode);
  };

  const generateData = (): ChartData[] => {
    const currentTime = new Date();
    const endDate =
      viewMode === "day" ? currentTime : startOfMonth(currentTime);

    const dateRange = Array.from(
      { length: viewMode === "day" ? 7 : 12 },
      (_, index) =>
        viewMode === "day"
          ? startOfDay(subDays(endDate, index))
          : startOfMonth(subMonths(endDate, index))
    );
    const data = dateRange.map((date) => {
      //Theo ngày
      const filteredDayOrders = successfulOrders?.filter(
        (item) =>
          item.datehis === format(date, "MM/d/yyyy") ||
          item.datehis === format(date, "M/d/yyyy")
      );

      let fullTotalDay = 0;
      filteredDayOrders?.forEach((item) => (fullTotalDay += item.totals));
      //Theo tháng
      const filteredMonthOrders = successfulOrders?.filter(
        (item) =>
          format(new Date(item.datehis), "MM/yyyy") === format(date, "MM/yyyy")
      );
      let fullTotalMonth = 0;
      filteredMonthOrders?.forEach((item) => (fullTotalMonth += item.totals));

      return {
        time: format(date, viewMode === "day" ? "MM/d/yyyy" : "MM/yyyy"),
        value: viewMode === "day" ? fullTotalDay : fullTotalMonth,
        date: date,
      };
    });

    // Sắp xếp mảng theo thời gian tăng dần
    data.sort((a, b) => a.date.getTime() - b.date.getTime());

    return data;
  };
  const newData = generateData();

  return (
    <div style={{ width: "100%" }}>
      <ChartViewToggle onViewChange={toggleViewMode} />
      <LineChart
        width={950}
        height={400}
        data={newData}
        style={{ width: "100%", paddingTop: "20px" }}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default Bieudo;
