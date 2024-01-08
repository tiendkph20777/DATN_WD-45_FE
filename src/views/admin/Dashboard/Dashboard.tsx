import { useFetchCheckoutQuery } from "../../../services/checkout.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import { useFetchUserQuery } from "../../../services/user.service";
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
    // 
    const successfulOrders = nonSuccessfulOrder?.filter((order: any) => order.status === 'Giao hàng thành công');
    const successfulOrders1 = nonSuccessfulOrder?.filter((order: any) => order.status === 'Đang xác nhận đơn hàng');
    const successfulOrders2 = nonSuccessfulOrder?.filter((order: any) => order.status === 'Tiếp nhận đơn hàng');
    const successfulOrders3 = nonSuccessfulOrder?.filter((order: any) => order.status === 'Đã giao cho đơn vị vận chuyển');
    const successfulOrders4 = nonSuccessfulOrder?.filter((order: any) => order.status === 'Đang giao hàng');
    const successfulOrders5 = nonSuccessfulOrder?.filter((order: any) => order.status === 'Hủy đơn hàng');

    // console.log(successfulOrders?.length)
    const leghth1 = successfulOrders?.length
    const leghth2 = successfulOrders1?.length
    const leghth3 = successfulOrders2?.length
    const leghth4 = successfulOrders3?.length
    const leghth5 = successfulOrders4?.length
    const leghth6 = successfulOrders5?.length

    // 
    let fullTotal = 0;
    successfulOrders?.forEach((item: any) => fullTotal = fullTotal + item.total);
    let fullTotal1 = 0;
    successfulOrders?.forEach((item: any) => fullTotal1 = fullTotal1 + item.totals);

    const fullTotal2 = fullTotal1 - fullTotal;
    console.log(fullTotal2)
    let TotalSuccessfulOrder = 0;
    successfulOrders?.map((item) => item.products?.map((item_product: any) => {
        return (TotalSuccessfulOrder = TotalSuccessfulOrder + item_product.quantity)
    }))

    let TotalProduct = 0;
    dataProduct?.map((item: any) => TotalProduct = TotalProduct + item.quantity)

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
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid" style={{ textAlign: "center" }}>
                            {/* Content Row */}
                            <div className="row">
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Số người dùng
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {dataUser?.length}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Tổng tiền bán được
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {fullTotal1?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Tổng tiền sau khuyến mại
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {fullTotal?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Tổng tiền khuyến mại
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {fullTotal2?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Earnings (Monthly) Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Số sản phẩm đã bán được
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {TotalSuccessfulOrder}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Pending Requests Card Example */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Sô sản phẩm còn lại trong kho
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {TotalProduct}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Số đơn hàng giao thành công
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {leghth1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Số đơn hàng đang chờ xác nhận
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {leghth2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Số đơn đã tiếp nhận
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {leghth3}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Số đơn đã giao cho đơn vị vận chuyển
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {leghth4}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Số đơn hàng đang trên đường giao
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {leghth5}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Số đơn hàng đã bị hủy
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {leghth6}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
