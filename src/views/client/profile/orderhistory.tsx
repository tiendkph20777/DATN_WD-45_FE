import React, { useEffect, useState } from 'react';

const OrderReview = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Retrieve order details from storage or API
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      const order = JSON.parse(storedOrder);
      setOrderDetails(order);
    }
  }, []);

  if (!orderDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Order Review</h1>
      <h3>Order Details</h3>
      <p>
        <strong>Order ID:</strong> {orderDetails?.orderId}
      </p>
      <p>
        <strong>Date:</strong> {orderDetails?.dateCreate}
      </p>
      <h3>Products</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails?.products?.map((product) => (
            <tr key={product?.product_id}>
              <td>{product?.name}</td>
              <td>{product?.quantity}</td>
              <td>{product?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
              <td>{product?.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>Tổng tiền:</strong>{' '}
        {orderDetails?.PaymentAmount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </p>
      <h3>Thông tin thanh toán</h3>
      <p>
        <strong>Tên người nhận:</strong> {orderDetails?.fullname}
      </p>
      <p>
        <strong>Email:</strong> {orderDetails?.email}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {orderDetails?.tel}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {orderDetails?.address}
      </p>

    </div>
  );
};

export default OrderReview;
