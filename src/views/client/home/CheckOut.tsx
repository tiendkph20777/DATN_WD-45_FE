import React, { useEffect, useState } from "react";
import { Popconfirm, message as messageApi } from "antd";

import { useFetchOneCartQuery } from "../../../services/cart.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import { useGetProductsQuery } from "../../../services/product.service";
import { useFetchOneUserQuery, useUpdateUserMutation } from "../../../services/user.service";
import {
  useCreateCheckoutMutation,
  useReductionProductMutation,
  useRemoveCartIdMutation,
} from "../../../services/checkout.service";
import {
  useGetVoucherByCodeQuery,
  useGetVouchersQuery,
} from "../../../services/voucher.service";
import { useGetPaymentQuery } from "../../../services/payment.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOut = () => {
  const [allVouchers, setAllVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const { data: allVouchersData } = useGetVouchersQuery();
  const [isOverFourMillion, setIsOverFourMillion] = useState(false); // xem đơn hàng có trên 4 trịu hay không

  const profileUser = JSON.parse(localStorage.getItem("user")!);
  const idUs = profileUser?.user;
  const [cartDetail, setCartDetail] = useState([]);
  const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs);
  const { data: cartUser } = useFetchOneCartQuery(idUs);
  const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
  const { data: paymentQuery } = useGetPaymentQuery();
  const { data: Product } = useGetProductsQuery();
  const [selectedVoucherValue, setSelectedVoucherValue] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalTotal1, setFinalTotal1] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [voucherStatus, setVoucherStatus] = useState({});

  useEffect(() => {
    if (allVouchersData) {
      setAllVouchers(allVouchersData);
      // Lấy trạng thái voucher từ Local Storage
      const storedVoucherStatus = JSON.parse(
        localStorage.getItem("voucherStatus") || "{}"
      );
      setVoucherStatus(storedVoucherStatus);
    }
  }, [allVouchersData]);

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
            const price_sale = matchingProduct.price_sale;
            const quantity = cartUser.products.find(
              (product: any) => product.productDetailId === item._id
            ).quantity;
            const cart_id = cartUser.products.find(
              (product: any) => product.productDetailId === item._id
            ).cart_id;
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
                price_sale: price_sale,
                quantity: quantity,
                total: price_sale * quantity,
                status: status,
                cart_id: cart_id,
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

  const [voucherCode, setVoucherCode] = useState("");
  const { data: voucher, error } = useGetVoucherByCodeQuery(voucherCode);

  if (error) {
    console.error("Lỗi khi truy vấn mã khuyến mãi:", error);
  }

  // 
  const host = 'https://provinces.open-api.vn/api/';
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedAdd, setSelectedAddress] = useState('');
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}?depth=1`);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchData();
  }, []);

  const callApiDistrict = async (cityCode: string) => {
    try {
      const response = await axios.get(`${host}p/${cityCode}?depth=2`);
      setDistricts(response.data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const callApiWard = async (districtCode: string) => {
    try {
      const response = await axios.get(`${host}d/${districtCode}?depth=2`);
      setWards(response.data.wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityCode = event.target.value;
    setSelectedCity(selectedCityCode);
    callApiDistrict(selectedCityCode);
    setSelectedDistrict('');
    setSelectedWard('');
    setSelectedAddress('');
    printResult();
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrictCode = event.target.value;
    setSelectedDistrict(selectedDistrictCode);
    callApiWard(selectedDistrictCode);
    setSelectedWard('');
    setSelectedAddress('');
    printResult();
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWardCode = event.target.value;
    setSelectedWard(selectedWardCode);
    setSelectedAddress('');
    printResult();
  };

  const handleWardAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWardCodeadd = event.target.value;
    setSelectedAddress(selectedWardCodeadd);
    printResult();
  };


  const printResult = () => {
    if (selectedCity && selectedDistrict && selectedWard) {
      const result =
        `${selectedCity} | ${selectedDistrict} | ${selectedWard}`;
      console.log("adress : ", result);
    }
  };

  const foundItem = cities?.find((item: any) => item?.code == selectedCity);
  const foundItem1 = districts?.find((item: any) => item?.code == selectedDistrict);
  const foundItem2 = wards?.find((item: any) => item?.code == selectedWard);

  const address =
    `${foundItem?.name} , ${foundItem1?.name} , ${foundItem2?.name} , ${selectedAdd}`;
  console.log("adress : ", address);
  // 


  const [isAddingToCheckout, setIsAddingToCheckout] = useState(false);
  const [addCheckout] = useCreateCheckoutMutation();
  const [quantityCheckout] = useReductionProductMutation();
  const [removeCartCheckout] = useRemoveCartIdMutation();
  const valueVoucher = voucher?.value !== undefined ? voucher.value : 0;
  const totalSum = cartDetail.reduce(
    (accumulator, item: any) => accumulator + item.total,
    0
  );
  useEffect(() => {
    if (foundItem?.name === "Thành phố Hà Nội") {
      setShippingFee(25000);
    } else {
      setShippingFee(40000);
    }
  }, [foundItem?.name]);
  useEffect(() => {
    setFinalTotal(totalSum)
    if (totalSum || shippingFee) {
      setFinalTotal1(totalSum + shippingFee);
      setIsOverFourMillion(totalSum > 4000000);
    }
  }, [totalSum, shippingFee]);

  // Payment ID
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelect = (paymentId: any) => {
    setSelectedPayment(paymentId);
    // Thêm logic xử lý khi phương thức thanh toán được chọn
    console.log(paymentId);
  };
  const total = finalTotal1 - valueVoucher;

  const navigation = useNavigate();
  const handleOnClick = async () => {
    const form = document.querySelector(
      "#form_checkout"
    ) as HTMLFormElement | null;
    if (form) {
      const formData = new FormData(form);
      const data: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        const inputElement = form.querySelector(`[name="${key}"]`);
        if (inputElement && inputElement instanceof HTMLInputElement) {
          const name = inputElement.getAttribute("name");
          if (name) {
            data[name] = value.toString();
          }
        }
      });

      try {
        const date = new Date();
        const newData = {
          ...data,
          address: address,
          products: cartDetail,
          payment: selectedPayment,
          shipping: "",
          total: total,
          voucherCode,
          dateCreate: date,
          // note: Note,
          status: "Đang xác nhận đơn hàng",
        };
        localStorage.setItem("currentOrder", JSON.stringify(newData));
        localStorage.setItem("voucherStatus", JSON.stringify(voucherStatus));
        console.log(newData);
        if (newData.payment === "Thanh toán online") {
          console.log("bạn chọn phương thức thanh toán online");
          const s = (await addCheckout(newData)) as any;
          console.log(s);
          window.location.replace(s.data);
          // await addCheckout(newData);
          if (newData) {
            newData.products.map((item) => quantityCheckout(item));
          }
          // xóa các sản phẩm đã được thanh toán ra khỏi giỏ hàng
          if (newData) {
            newData.products.map((item) => removeCartCheckout(item));
          }
          //
          if (newData) {
            newData.products.map((item) => quantityCheckout(item));
          }
          return;
        } else if (newData.payment === "Thanh toán khi nhận hàng") {
          console.log("bạn chọn phương thức thanh toán khi nhận hàng");
          await addCheckout(newData);
          navigation("/ordersuccess");
          if (newData) {
            newData.products.map((item) => quantityCheckout(item));
          }
          // xóa các sản phẩm đã được thanh toán ra khỏi giỏ hàng
          if (newData) {
            newData.products.map((item) => removeCartCheckout(item));
          }
          //
          if (newData) {
            newData.products.map((item) => quantityCheckout(item));
          }
          return;
        } else {
          console.log("bạn chưa chọn phương thức thanh toán");
          messageApi.info({
            type: "error",
            content: "Bạn chưa chọn phương thức thanh toán ",
            className: "custom-class",
            style: {
              marginTop: "0",
              fontSize: "20px",
              lineHeight: "50px",
            },
          });
          return;
        }
      } catch (error) {
        console.error("Lỗi khi tạo checkout:", error);
      }
    }
  };

  const handleVoucherSelect = (voucherCode: any) => {
    console.log("Selected Voucher Code:", voucherCode);

    if (totalSum > 4000000) {
      setVoucherCode(voucherCode);
      setSelectedVoucher(voucherCode);

      // Cập nhật trạng thái voucher
      if (voucherStatus[voucherCode] !== false) {
        setVoucherStatus((prevStatus) => ({
          ...prevStatus,
          [voucherCode]: true,
        }));
      }
    } else {
      if (voucherCode === "FREESHIP150K" || voucherCode === "MYS200K") {
        messageApi.error("Mã chỉ áp dụng cho đơn hàng trên 4 triệu đồng");
      } else {
        setVoucherCode(voucherCode);
        setSelectedVoucher(voucherCode);

        // Cập nhật trạng thái voucher
        if (voucherStatus[voucherCode] !== false) {
          setVoucherStatus((prevStatus) => ({
            ...prevStatus,
            [voucherCode]: true,
          }));
        }
      }
    }
  };

  localStorage.setItem("shippingFee", JSON.stringify(shippingFee));
  localStorage.setItem(
    "selectedVoucher",
    JSON.stringify({ voucherCode, value: voucher?.value })
  );
  // console.log("totalSum", totalSum);

  // console.log("Selected Voucher in Render:", selectedVoucher);
  // console.log(valueVoucher);

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
      <section className="checkout_area section_gap">
        <div className="container">
          <div className="billing_details">
            <form className="row" id="form_checkout" noValidate>
              <div className="col-lg-4">
                <h3>Billing Details</h3>
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
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <label htmlFor="">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      value={usersOne?.tel}
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="form-control-label" htmlFor="input-country">Địa chỉ cụ thể</label>
                      <textarea
                        onChange={handleWardAddress}
                        className="form-control"
                        required
                        value={selectedAdd}
                        rows={2} // Số hàng bạn muốn hiển thị
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-city">Thành phố</label>
                        <select
                          id="city"
                          onChange={handleCityChange}
                          value={selectedCity}
                          className='form-select form-control-alternative form-control-label text-black'
                          required
                        >
                          <option value="" disabled>Chọn tỉnh thành</option>
                          {cities?.map((city: any) => (
                            <option key={city.code} value={city.code}>{city.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-country">Huyện</label>
                        <select
                          id="district"
                          onChange={handleDistrictChange}
                          value={selectedDistrict}
                          className='form-select form-control-alternative form-control-label text-black'
                          required
                        >
                          <option value="" disabled>Chọn quận huyện</option>
                          {districts?.map((district: any) => (
                            <option key={district.code} value={district.code}>{district.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-country">Xã</label>
                        <select
                          id="ward"
                          onChange={handleWardChange}
                          value={selectedWard}
                          className='form-select form-control-alternative form-control-label text-black'
                          required
                        >
                          <option value="" disabled>Chọn phường xã</option>
                          {wards?.map((ward: any) => (
                            <option key={ward.code} value={ward.code}>{ward.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-country">Địa chỉ cụ thể</label>
                        <textarea
                          onChange={handleWardAddress}
                          className="form-control"
                          required
                          value={selectedAdd}
                          rows={2} // Số hàng bạn muốn hiển thị
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="order_box">
                  <h2>Your Order</h2>
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
                          {item?.price_sale?.toLocaleString("vi-VN", {
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

                  <tr>
                    <td style={{ width: "150px", color: "black" }}>
                      Tổng thanh toán
                    </td>
                    {/* <td>Shipping <span>Flat rate: 30000</span></td> */}
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td style={{ color: "black", fontSize: "20px" }}>
                      {totalSum?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                  </tr>
                  <div className="payment_item">
                    <div className="payment_item active">
                      <form className="row mt-3">
                        <label htmlFor="" className="col-8 m-2">
                          Chọn Mã Khuyến Mãi
                        </label>
                        <select
                          className="col-4 form-select"
                          value={selectedVoucher}
                          onChange={(e) => handleVoucherSelect(e.target.value)}
                        >
                          <option value="">-- Chọn mã khuyến mãi --</option>
                          {allVouchers
                            .filter(
                              (voucher: any) => voucherStatus[voucher._id]
                            ) // Lọc những mã hợp lệ
                            .map((voucher: any, index) => (
                              <option key={index} value={voucher.code}>
                                {voucher.code} -{" "}
                                {voucher.value.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </option>
                            ))}
                        </select>
                      </form>
                    </div>
                    <div className="payment_item active">
                      <form className="row mt-3">
                        <label htmlFor="" className="col-8 m-2">
                          Trước Khuyến Mại
                        </label>
                        <input
                          type="text"
                          disabled
                          className="col-2 money-checkout w-25"
                          value={finalTotal?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        />
                      </form>
                    </div>
                    <div className="payment_item active">
                      <form className="row mt-3">
                        <label htmlFor="" className="col-8 m-2">
                          Mã Giảm Giá
                        </label>
                        <input
                          type="text"
                          disabled
                          className="col-2 money-checkout w-25"
                          placeholder="*Giá trị voucher"
                          value={
                            voucher
                              ? parseFloat(voucher?.value).toLocaleString(
                                "vi-VN",
                                { style: "currency", currency: "VND" }
                              )
                              : ""
                          }
                        />
                      </form>
                    </div>
                    <div className="payment_item active">
                      <form className="row mt-3">
                        <label htmlFor="" className="col-8 m-2">
                          Phí vận chuyển
                        </label>
                        <input
                          type="text"
                          disabled
                          className="col-2 text-danger w-25 total-checkout"
                          name="shippingFee"
                          value={shippingFee?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        />
                      </form>
                    </div>

                    <div className="payment_item active">
                      <form className="row mt-3">
                        <label htmlFor="" className="col-8 m-2">
                          Tổng Thanh Toán
                        </label>
                        <input
                          type="text"
                          disabled
                          className="col-2 text-danger w-25 total-checkout"
                          name="total"
                          value={total?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        />
                      </form>
                    </div>

                    <div className="row">
                      <div className="payment_item active col-6 m-2">
                        <div>
                          <select
                            onChange={(e) =>
                              handlePaymentSelect(e.target.value)
                            }
                            name="payment"
                            className="form-select"
                          >
                            <option value="">
                              -- Chọn phương thức thanh toán --
                            </option>
                            <option value="Thanh toán khi nhận hàng">
                              -- Thanh toán khi nhận hàng --
                            </option>
                            <option value="Thanh toán online">
                              -- Thanh toán online --
                            </option>
                            {/* {paymentQuery?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                      <div className="creat_account col-5">
                        <input
                          checked
                          disabled
                          type="checkbox"
                          id="f-option4"
                          name="selector"
                        />
                        <label htmlFor="f-option4">
                          Việc đặt hàng của bạn đồng thời chấp nhận{" "}
                        </label>
                        <a href="#"> điều khoản và dịch vụ*</a>của chúng tôi.
                        <label htmlFor="f-option4">
                          ** Đối với đơn hàng nội thành là 25k, ngoại thành là
                          40k
                        </label>
                      </div>
                    </div>
                    <div className="card_area col-6 align-items-center">
                      <button
                        type="button"
                        className="primary-btn w-50 m-2"
                        onClick={handleOnClick}
                        disabled={isAddingToCheckout}
                      >
                        {isAddingToCheckout ? "Ordering..." : "Đặt Hàng"}
                      </button>
                    </div>
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
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CheckOut;
