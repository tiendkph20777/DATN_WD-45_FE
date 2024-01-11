import { useEffect, useState } from "react";
import { useFetchCheckoutQuery } from "../../../services/checkout.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import { useFetchUserQuery } from "../../../services/user.service";
import { format } from "date-fns";
import Bieudo from "./Bieudoo";
const Dashboard = () => {
    const { data: dataUser } = useFetchUserQuery();
    const { data: orderDa, isLoading } = useFetchCheckoutQuery();
    const { data: dataProduct } = useGetAllProductsDetailQuery()


    const nonSuccessfulOrder = orderDa?.map((order: any, index) => {
        const date = new Date(order?.dateCreate)?.toLocaleDateString('en-US');
        const datehis = new Date(order?.updatedAt)?.toLocaleDateString('en-US');
        const totals = order.products.reduce((acc: number, product: any) => acc + (product.total || 0), 0);
        return {
            ...order,
            index: index + 1,
            totals,
            date: date,
            datehis: datehis,
        };
    });

    const successfulOrders = nonSuccessfulOrder?.filter((order: any) => order.status === 'Giao hàng thành công');




    //// Tất cả
    let fullTotal = 0;
    successfulOrders?.forEach((item: any) => fullTotal = fullTotal + item.total);

    let fullTotal1 = 0;
    successfulOrders?.forEach((item: any) => fullTotal1 = fullTotal1 + item.totals);

    const fullTotal2 = fullTotal1 - fullTotal;

    let TotalSuccessfulOrder = 0;

    successfulOrders?.map((item) => item.products?.map((item_product: any) => {
        return (TotalSuccessfulOrder = TotalSuccessfulOrder + item_product.quantity)
    }))

    let TotalProduct = 0;
    dataProduct?.map((item: any) => TotalProduct = TotalProduct + item.quantity)
    ///////////



    const currentTime = new Date();
    ////// Theo ngày

    const filteredDayOrders = successfulOrders?.filter((item) => item.datehis === format(currentTime, 'MM/d/yyyy') || item.datehis === format(currentTime, 'M/d/yyyy'));

    let fullTotal1Day = 0;
    filteredDayOrders?.forEach((item) => (fullTotal1Day += item.totals));

    let fullTotalDay = 0;
    filteredDayOrders?.forEach((item) => (fullTotalDay += item.total));
    const fullTotal2Day = fullTotal1Day - fullTotalDay;

    let TotalSuccessfulOrderDay = 0;
    filteredDayOrders?.map((item) => item.products?.map((item_product: any) => {
        return (TotalSuccessfulOrderDay = TotalSuccessfulOrderDay + item_product.quantity)
    }))
    ///////



    ////// Theo tháng
    const filteredMonthOrders = successfulOrders?.filter((item) => format(new Date(item.datehis), "MM/yyyy") === format(currentTime, "MM/yyyy"))
    let fullTotal1Month = 0;
    filteredMonthOrders?.forEach((item) => (fullTotal1Month += item.totals));

    let fullTotalMonth = 0;
    filteredMonthOrders?.forEach((item) => (fullTotalMonth += item.total));
    const fullTotal2Month = fullTotal1Month - fullTotalMonth;

    let TotalSuccessfulOrderMonth = 0;
    filteredMonthOrders?.map((item) => item.products?.map((item_product: any) => {
        return (TotalSuccessfulOrderMonth = TotalSuccessfulOrderMonth + item_product.quantity)
    }))
    ///////




    const lengthAllData = (content: any) => {
        return nonSuccessfulOrder?.filter((order: any) => order.status === content)?.length
    }

    const lengthDayData = (content: any) => {
        return nonSuccessfulOrder?.filter((order: any) => order.status === content && (order.datehis === format(currentTime, 'MM/d/yyyy') || order.datehis === format(currentTime, 'M/d/yyyy')))?.length
    }

    const lengthMonthData = (content: any) => {
        return nonSuccessfulOrder?.filter((order: any) => order.status === content && format(new Date(order.datehis), "MM/yyyy") === format(currentTime, "MM/yyyy"))?.length
    }

    const [datadd, setData]: any = useState(0);
    const [dataCt, setataCt]: any = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Thực hiện công việc bất đồng bộ ở đây
                const DataLength = await huhu.map((item) => item.lengthAll);
                const DataContent = await huhu.map((item) => item.contentAll);
                // Cập nhật state khi dữ liệu đã được lấy về thành công
                setData(DataLength);
                setataCt(DataContent)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [lengthAllData('Hủy đơn hàng')]);

    const handleClickAll = () => {
        setData(huhu.map((item) => item.lengthAll));
        setataCt(huhu.map((item) => item.contentAll));

    };
    const handleClickDay = () => {
        setData(huhu.map((item) => item.lengthDay));
        setataCt(huhu.map((item) => item.contentDay));
    };
    const handleClickMonth = () => {
        setData(huhu.map((item) => item.lengthMonth));
        setataCt(huhu.map((item) => item.contentMonth));
    };

    let i = 0;
    let j = 0;
    const huhu = [
        {
            content: dataCt[i],

            contentAll: 'Số người dùng',
            contentDay: 'Số người dùng',
            contentMonth: 'Số người dùng',

            length: datadd[j],

            lengthAll: dataUser?.length,
            lengthDay: dataUser?.length,
            lengthMonth: dataUser?.length,
            color: 'red',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Tổng tiền bán được',
            contentDay: 'Tổng tiền bán được theo ngày',
            contentMonth: 'Tổng tiền bán được theo tháng',

            length: datadd[j += 1],

            lengthAll: fullTotal1?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            lengthDay: fullTotal1Day?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            lengthMonth: fullTotal1Month?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            color: 'blue',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Tổng tiền sau khuyến mại',
            contentDay: 'Tổng tiền sau khuyến mại theo ngày',
            contentMonth: 'Tổng tiền sau khuyến mại theo tháng',

            length: datadd[j += 1],

            lengthAll: fullTotal?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            lengthDay: fullTotalDay?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            lengthMonth: fullTotalMonth?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            color: 'green',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Tổng tiền khuyến mại',
            contentDay: 'Tổng tiền khuyến mại theo ngày',
            contentMonth: 'Tổng tiền khuyến mại theo tháng',

            length: datadd[j += 1],

            lengthAll: fullTotal2?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            lengthDay: fullTotal2Day?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            lengthMonth: fullTotal2Month?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            color: 'gray',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Số sản phẩm đã bán được',
            contentDay: 'Số sản phẩm đã bán được theo ngày',
            contentMonth: 'Số sản phẩm đã bán được theo tháng',

            length: datadd[j += 1],

            lengthAll: TotalSuccessfulOrder,
            lengthDay: TotalSuccessfulOrderDay,
            lengthMonth: TotalSuccessfulOrderMonth,
            color: 'black',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Sô sản phẩm còn lại trong kho',
            contentDay: 'Sô sản phẩm còn lại trong kho theo ngày',
            contentMonth: 'Sô sản phẩm còn lại trong kho theo tháng',

            length: datadd[j += 1],

            lengthAll: TotalProduct,
            lengthDay: TotalProduct,
            lengthMonth: TotalProduct,
            color: 'violet',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Số đơn hàng giao thành công',
            contentDay: 'Số đơn hàng giao thành công theo ngày',
            contentMonth: 'Số đơn hàng giao thành công theo tháng',

            length: datadd[j += 1],

            lengthAll: lengthAllData('Giao hàng thành công'),
            lengthDay: lengthDayData('Giao hàng thành công'),
            lengthMonth: lengthMonthData('Giao hàng thành công'),
            color: 'pink',

        },
        {
            content: dataCt[i += 1],

            contentAll: 'Số đơn hàng đang chờ xác nhận',
            contentDay: 'Số đơn hàng đang chờ xác nhận theo ngày',
            contentMonth: 'Số đơn hàng đang chờ xác nhận theo tháng',

            length: datadd[j += 1],

            lengthAll: lengthAllData('Đang xác nhận đơn hàng'),
            lengthDay: lengthDayData('Đang xác nhận đơn hàng'),
            lengthMonth: lengthMonthData('Đang xác nhận đơn hàng'),
            color: 'green',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Số đơn đã tiếp nhận',
            contentDay: 'Số đơn đã tiếp nhận theo ngày',
            contentMonth: 'Số đơn đã tiếp nhận theo tháng',

            length: datadd[j += 1],

            lengthAll: lengthAllData('Tiếp nhận đơn hàng'),
            lengthDay: lengthDayData('Tiếp nhận đơn hàng'),
            lengthMonth: lengthMonthData('Tiếp nhận đơn hàng'),
            color: 'blue',
        },
        {
            content: dataCt[i += 1],

            contentAll: 'Số đơn đã giao cho đơn vị vận chuyển',
            contentDay: 'Số đơn đã giao cho đơn vị vận chuyển theo ngày',
            contentMonth: 'Số đơn đã giao cho đơn vị vận chuyển theo tháng',

            length: datadd[j += 1],

            lengthAll: lengthAllData('Đã giao cho đơn vị vận chuyển'),
            lengthDay: lengthDayData('Đã giao cho đơn vị vận chuyển'),
            lengthMonth: lengthMonthData('Đã giao cho đơn vị vận chuyển'),
            color: 'black',
        },
        {
            content: dataCt[i += 1],

            contentAll: ' Số đơn hàng đang trên đường giao',
            contentDay: ' Số đơn hàng đang trên đường giao theo ngày',
            contentMonth: ' Số đơn hàng đang trên đường giao theo tháng',

            length: datadd[j += 1],

            lengthAll: lengthAllData('Đang giao hàng'),
            lengthDay: lengthDayData('Đang giao hàng'),
            lengthMonth: lengthMonthData('Đang giao hàng'),
            color: 'gray',

        },
        {
            content: dataCt[i += 1],

            contentAll: 'Số đơn hàng đã bị hủy',
            contentDay: 'Số đơn hàng đã bị hủy theo ngày',
            contentMonth: 'Số đơn hàng đã bị hủy theo tháng',

            length: datadd[j += 1],

            lengthAll: lengthAllData('Hủy đơn hàng'),
            lengthDay: lengthDayData('Hủy đơn hàng'),
            lengthMonth: lengthMonthData('Hủy đơn hàng'),
            color: 'red',

        }
    ];



    if (isLoading) {
        return <div style={{ paddingTop: "70px" }}>
            <div className="right-wrapper">
                <div className="spinnerIconWrapper">
                    <div className="spinnerIcon"></div>
                </div>
                <div className="finished-text">
                    Xin vui lòng chờ một chút 🥰🥰🥰
                </div>
            </div>
        </div>
    }
    return (
        <div style={{ paddingTop: "70px" }}>
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid text-center">
                            <div className="row">


                                <div className="col-xl-12 col-md-6 mb-4">
                                    <button
                                        style={{
                                            width: "150px",
                                            fontSize: "15px",
                                            padding: "5px 10px",
                                            margin: "10px 10px",
                                        }}
                                        className="btn btn-warning"
                                        onClick={() => handleClickAll()}
                                    >
                                        Xem theo tất cả
                                    </button>
                                    <button
                                        style={{
                                            width: "150px",
                                            fontSize: "15px",
                                            padding: "5px 10px",
                                            margin: "10px 10px",
                                        }}
                                        className="btn btn-warning"
                                        onClick={() => handleClickDay()}
                                    >
                                        Xem theo ngày
                                    </button>
                                    <button
                                        style={{
                                            width: "150px",
                                            fontSize: "15px",
                                            padding: "5px 10px",
                                            margin: "10px 10px",
                                        }}
                                        className="btn btn-warning"
                                        onClick={() => handleClickMonth()}
                                    >
                                        Xem theo tháng
                                    </button>
                                </div>

                                {huhu.map((item) => {
                                    return (
                                        <div className="col-xl-3 col-md-6 mb-4">
                                            <div className="card border-left-warning shadow h-100 py-2">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold  text-uppercase mb-1" style={{ color: item.color }} >
                                                                {item.content}
                                                            </div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                                {item.length}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div>
                                <Bieudo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
