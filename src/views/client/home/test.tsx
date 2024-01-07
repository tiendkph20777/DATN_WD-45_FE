import React, { useEffect, useState } from "react";
import { useCreateCheckoutMutation } from "../../../services/checkout.service";
import { useFetchOneUserQuery } from "../../../services/user.service";
import { useFetchOneCartQuery } from "../../../services/cart.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import { useGetPaymentQuery } from "../../../services/payment.service";
import { useGetProductsQuery } from "../../../services/product.service";
import {
  useGetVoucherByCodeQuery,
  useGetVoucherByIdQuery,
} from "../../../services/voucher.service";

const Ordersuccess = () => {
  const profileUser = JSON.parse(localStorage.getItem("user")!);
  const idUs = profileUser?.user;
  const [cartDetail, setCartDetail] = useState([]);
  const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs);
  const { data: cartUser } = useFetchOneCartQuery(idUs);
  const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
  const { data: paymentQuery } = useGetPaymentQuery();
  const { data: Product } = useGetProductsQuery();

  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const [voucherCode, setVoucherCode] = useState("");
  const { data: voucher, error } = useGetVoucherByCodeQuery(voucherCode);
  
  // if(voucher && voucher.length > 0 ) {
  //   voucher.map((items, index) => {
  //     if(items && items.value){
  //       console.log("Voucher value:", items.value);
  //     }
  //     return null;
  //   })
  // }
  useEffect(() => {
    if (cartUser && ProductDetailUser) {
      const cartDetailIds = cartUser?.products.map(
        (item: any) => item.productDetailId
      );

      const matchingIds = cartDetailIds?.filter((id: any) =>
        ProductDetailUser.some((product) => product._id === id)
      );
      const productIds = ProductDetailUser?.map((item) => item.product_id);
      const filteredProducts = Product?.filter((product: any) =>
        productIds.includes(product?._id)
      );
      const matchingProductDetailUser = ProductDetailUser?.filter((item) =>
        matchingIds.includes(item._id)
      );

      const modifiedProductDetails = matchingProductDetailUser
        ?.map((item: any) => {
          const matchingProduct = filteredProducts?.find(
            (product) => product._id === item.product_id
          );

          if (matchingProduct) {
            const price = matchingProduct.price;
            const quantity = cartUser.products.find(
              (product: any) => product.productDetailId === item._id
            ).quantity;
            const status = cartUser.products.find(
              (product: any) => product.productDetailId === item._id
            ).status;

            if (status) {
              // Check if status is true
              return {
                ...item,
                name: matchingProduct.name,
                image: matchingProduct.images[0],
                price: price,
                quantity: quantity,
                total: price * quantity,
                status: status,
              };
            } else {
              return null; // Exclude items with status false
            }
          } else {
            return item;
          }
        })
        .filter(Boolean); // Remove null values from the array

      setCartDetail(modifiedProductDetails);
    }
  }, [cartUser, ProductDetailUser, Product]);

  // const getCodeVoucher = () => {
  //   if (!voucherCode) {
  //     console.error("Mã khuyến mãi không được để trống");
  //     return;
  //   }
  //   setVoucherCode(voucherCode)
  // };
  // useEffect(() => {
  //   getCodeVoucher();
  // }, [voucherCode]);
  useEffect(() => {
    if (voucher) {
      setSelectedVoucher(voucher);
    }
  }, [voucher]);

  const [isAddingToCheckout, setIsAddingToCheckout] = useState(false);
  const [addCheckout] = useCreateCheckoutMutation();

  const valueVoucher = selectedVoucher?.value !== undefined ? selectedVoucher.value : 0;
  const totalSum = cartDetail.reduce((accumulator, item) => accumulator + item?.total, 0);
  const total = totalSum - valueVoucher;
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // console.log("Tổng giá trị đơn hàng:", totalSum);
  // console.log("Giá trị voucher:", valueVoucher);
  // console.log("Tổng sau khi áp dụng mã giảm giá:", total);
  // console.log(
  //   "Trạng thái sản phẩm:",
  //   cartDetail.map((item) => item.status)
  // );
  const addre =
    usersOne?.city +
    " , " +
    usersOne?.district +
    " , " +
    usersOne?.commune +
    " , " +
    usersOne?.address;

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
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Đặt hàng thành công!</h2>
        <p>
          Cảm ơn bạn đã mua sắm. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập
          tức.
        </p>
        <a href="/purchase">
          <button className="btn btn-primary"> Xem đơn hàng của bạn </button>
        </a>
      </div>
      <section className="checkout_area section_gap">
        <div className="container">
          <div className="billing_details">
            <div className="row">
              <div className="col-lg-4">
                <h3>Thông tin liên lạc</h3>
                <div className="row contact_form">
                  <div className="col-md-12 form-group p_star">
                    <input
                      hidden
                      type="text"
                      className="form-control"
                      id="last"
                      name="user_id"
                      value={usersOne?._id}
                    />
                    <span className="placeholder"></span>
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control"
                      id="last"
                      name="fullName"
                      value={usersOne?.fullName}
                    />
                    <span className="placeholder"></span>
                  </div>
                  <div className="col-md-12 form-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Địa chỉ email"
                      value={usersOne?.email}
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      id="number"
                      placeholder="Số điện thoại"
                      name="tel"
                      value={usersOne?.tel}
                    />
                    <span className="placeholder"></span>
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="">Địa chỉ</label>
                    <textarea
                      className="form-control"
                      id="address"
                      placeholder="Địa chỉ giao hàng"
                      name="address"
                      value={addre}
                    ></textarea>
                    <span className="placeholder"></span>
                  </div>
                  <div className="col-md-12 form-group">
                    <div className="creat_account">
                      <label htmlFor="">Ghi chú</label>
                    </div>
                    <textarea
                      className="form-control"
                      name="Note"
                      id="Note"
                      placeholder="#giao giờ hàng chính"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="order_box">
                  <h2>Thông tin đơn hàng</h2>
                  <tr>
                    <th scope="col">Hình Ảnh</th>
                    <th scope="col">| Tên Sản Phẩm</th>
                    <th scope="col">| Kích Cỡ</th>
                    <th scope="col">| Màu Sắc</th>
                    <th scope="col">| Số Lượng</th>
                    <th scope="col">| Giá</th>
                    <th scope="col">| Tạm Tính</th>
                  </tr>
                  {cartDetail?.map((item: any) => (
                    <tr key={item?._id} style={{ height: "100px" }}>
                      <td style={{ width: "100px" }}>
                        <img
                          width={"100px"}
                          height={"100px"}
                          src={item?.image}
                          alt=""
                        />
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
                            style={{
                              backgroundColor: item?.color,
                              width: "20px",
                              height: "20px",
                              margin: "5px",
                            }}
                          ></button>
                          <h5>{item?.color}</h5>
                        </div>
                      </td>
                      <td style={{ width: "100px", textAlign: "center" }}>
                        <h5>{item?.quantity}</h5>
                      </td>
                      <td style={{ width: "100px" }}>
                        <h5>
                          {item?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h5>
                      </td>
                      <td style={{ width: "100px" }}>
                        <h5>
                          {item?.total?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h5>
                      </td>
                    </tr>
                  ))}

                  <div className="payment_item">
                    <div className="payment_item active">
                      <div className="row mt-3">
                        <label htmlFor="" className="col-8 m-2">
                          Tổng Thanh Toán
                        </label>
                        <h5 className="col-3 text-danger w-25 total-checkout">
                          {total?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ordersuccess;
