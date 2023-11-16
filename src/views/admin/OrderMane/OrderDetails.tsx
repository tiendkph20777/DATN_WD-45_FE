import React from 'react';

const OrderDetails: React.FC<{ roleMane: any }> = ({ roleMane }) => {
    // console.log(roleMane)
    const total = roleMane.products.reduce((acc: number, product: any) => {
        const productTotal = product.total || 0;
        return acc + productTotal;
    }, 0);
    const date = new Date(roleMane?.dateCreate)?.toLocaleDateString('en-US');
    const formattedTime = new Date(roleMane?.dateCreate).toTimeString().slice(0, 5);
    // console.log(formattedTime);

    return (
        <div className="col-lg-12">
            <div className="">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Tên</th>
                            <th scope="col">Đại chỉ nhận hàng</th>
                            <th scope="col">Trạng thái </th>
                            <th scope="col">SĐT</th>
                            <th scope="col">shipping</th>
                            <th scope="col">Ngày mua hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <span>{roleMane?.fullName}</span>
                            </th>
                            <th>
                                <span>{roleMane?.address}</span>
                            </th>
                            <th>
                                <span>{roleMane?.status}</span>
                            </th>
                            <th>
                                <span>{roleMane?.tel}</span>
                            </th>
                            <th>
                                <span>{roleMane?.shipping}</span>
                            </th>
                            <th>
                                <span>{formattedTime} : {date}</span>
                            </th>
                        </tr>
                        {roleMane?.noteCancel !== "" ? (
                            <tr>
                                {roleMane?.noteCancel && (
                                    <th colSpan={6}>
                                        <span>Lý do hủy đơn hàng : {roleMane?.noteCancel}</span>
                                    </th>
                                )}
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Hình Ảnh</th>
                            <th scope="col"> Tên Sản Phẩm</th>
                            <th scope="col"> Kích Cỡ</th>
                            <th scope="col"> Màu Sắc</th>
                            <th scope="col"> Số Lượng</th>
                            <th scope="col"> Giá</th>
                            <th scope="col"> Tạm Tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleMane?.products?.map((item: any) => (
                            <tr key={item?._id} style={{ height: "100px", lineHeight: "100px" }} >
                                <td style={{ width: "100px", padding: "0" }}>
                                    <img
                                        width={'100px'}
                                        height={'100px'}
                                        src={item?.image}
                                        alt="" />
                                </td>
                                <td style={{ width: "200px" }}>
                                    <h6>{item?.name}</h6>
                                </td>
                                <td style={{ width: "100px", textAlign: "center" }}>
                                    <h5>{item?.size}</h5>

                                </td>
                                <td style={{ width: "100px" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <button
                                            style={{ backgroundColor: item?.color, width: "20px", height: "20px", margin: "5px" }}
                                        ></button>
                                        <h5>{item?.color}</h5>
                                    </div>

                                </td>
                                <td style={{ width: "100px", textAlign: "center" }}>
                                    <h5>{item?.quantity}</h5>
                                </td>
                                <td style={{ width: "100px" }}>
                                    <h5>{item?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                </td>
                                <td style={{ width: "100px" }}>
                                    <h5>{item?.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td style={{ width: "150px", color: "black" }}>Tổng thanh toán</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td style={{ color: "black", fontSize: "20px" }}>{total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;
