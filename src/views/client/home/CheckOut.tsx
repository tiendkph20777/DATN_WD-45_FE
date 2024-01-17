import React, { useEffect, useState } from "react";
import { Modal, message as messageApi } from "antd";

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
import axios from "axios";
// 
import { firebase, auth } from "./../user/Firebase";

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
  const { data: Product } = useGetProductsQuery();
  const [selectedVoucherValue, setSelectedVoucherValue] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalTotal1, setFinalTotal1] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [voucherStatus, setVoucherStatus] = useState({});
  // 

  console.log(voucherStatus)

  // useEffect(() => {
  //   if (allVouchersData) {
  //     // setAllVouchers(allVouchersData);

  //     setVoucherStatus(allVouchersData)
  //   }
  // }, [allVouchersData]);
  useEffect(() => {
    if (allVouchersData) {
      const activeVouchers = allVouchersData.filter((voucher) => voucher.status === true);
      setVoucherStatus(activeVouchers);
    }
  }, [allVouchersData]);

  // //////////
  // console.log(voucherStatus)
  // console.log(allVouchers)

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

  console.log(voucherCode)

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
      // console.log("adress : ", result);
    }
  };

  const foundItem = cities?.find((item: any) => item?.code == selectedCity);
  const foundItem1 = districts?.find((item: any) => item?.code == selectedDistrict);
  const foundItem2 = wards?.find((item: any) => item?.code == selectedWard);

  const address =
    `${foundItem?.name} , ${foundItem1?.name} , ${foundItem2?.name} , ${selectedAdd}`;
  // console.log("adress : ", address);
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
    // console.log(paymentId);
  };
  const total = finalTotal1 - valueVoucher;

  // 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("INPUT_PHONE_NUMBER");
  const [result, setResult] = useState("");
  // const [a1, seta1] = useState("0")

  // ////////////////////////
  function convertToInternationalFormat(phoneNumber: any) {
    // Loại bỏ các ký tự không phải số
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Kiểm tra xem số điện thoại có bắt đầu bằng "0" hay không
    if (numericPhoneNumber.startsWith('0')) {
      // Nếu có, thì thay thế "0" bằng "+84"
      return `+84${numericPhoneNumber.substring(1)}`;
    } else {
      // Nếu không, thêm dấu "+" vào đầu số điện thoại
      return `+${numericPhoneNumber}`;
    }
  }
  const internationalPhoneNumber = convertToInternationalFormat(phoneNumber);

  // console.log(internationalPhoneNumber);
  const signin = () => {
    if (internationalPhoneNumber === "") return;
    const verify = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });

    const promise = auth.signInWithPhoneNumber(internationalPhoneNumber, verify);
    promise
      .then((result) => {
        setResult(result);
        setStep("VERIFY_OTP");
        setIsModalOpen(true);
      })
      .catch((err) => {
        // alert(err);
        messageApi.info({
          type: "error",
          content: "Vui không để trống số điện thoại và nhập đúng đinh dạng để nhận OTP ",
          className: "custom-class",
          style: {
            marginTop: "0",
            fontSize: "20px",
            lineHeight: "50px",
          },
        });
      });
    return promise;
  };

  const [data1, setdat1] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(a1)

  // /////////////////////////////////////////////

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
      console.log("data", phoneNumber)
      setPhoneNumber(phoneNumber)

      const internationalPhoneNumber = convertToInternationalFormat(phoneNumber);

      console.log(internationalPhoneNumber);
      if (internationalPhoneNumber === "") return;
      const verify = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      });

      const promise = auth.signInWithPhoneNumber(internationalPhoneNumber, verify);
      promise
        .then((result) => {
          setResult(result);
          setStep("VERIFY_OTP");
          setIsModalOpen(true);
        })
        .catch((err) => {
          messageApi.info({
            type: "error",
            content: "Bạn chưa chọn phương thức thanh toán 1",
            className: "custom-class",
            style: {
              marginTop: "0",
              fontSize: "20px",
              lineHeight: "50px",
            },
          });
          alert(err);
        });
      // return promise;

      try {
        const date = new Date();
        const newData = {
          ...data,
          tel: phoneNumber,
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
        setdat1(newData)

        if (foundItem?.name === undefined || foundItem1?.name === undefined || foundItem2?.name === undefined || selectedAdd === "") {
          // console.log("bạn chưa nhập đủ thông tin1")
          messageApi.info({
            type: "error",
            content: "Bạn chưa nhập đủ thông tin nhận hàng",
            className: "custom-class",
            style: {
              marginTop: "0",
              fontSize: "20px",
              lineHeight: "50px",
            },
          });
          return
        } else {
          localStorage.setItem("currentOrder", JSON.stringify(newData));
          localStorage.setItem("voucherStatus", JSON.stringify(voucherStatus));
          // console.log(newData);
          if (newData.payment === "Thanh toán online") {
            // console.log("bạn chọn phương thức thanh toán online");
            const s = (await addCheckout(newData)) as any;
            // console.log(s);
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
            localStorage.setItem('successMessage', "Chúc mừng bạn đã đặt hàng thành công , đơn hàng sẽ được chuyển đi sớm nhất 🎉🎉🎉");
            return;
          } else if (newData.payment === "Thanh toán khi nhận hàng") {
            // console.log("bạn chọn phương thức thanh toán khi nhận hàng");
            if (internationalPhoneNumber === "") return;
            const verify = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
              size: "invisible",
            });

            const promise = auth.signInWithPhoneNumber(internationalPhoneNumber, verify);
            promise
              .then((result) => {
                setResult(result);
                setStep("VERIFY_OTP");
                setIsModalOpen(true);
                console.log("ok")
              })
              .catch((err) => {
                alert(err);
                messageApi.info({
                  type: "error",
                  content: "Vui lòng nhập số điện thoại",
                  className: "custom-class",
                  style: {
                    marginTop: "0",
                    fontSize: "20px",
                    lineHeight: "50px",
                  },
                });
                console.log("a")
              });
            // if (step === "VERIFY_OTP") {
            //   console.log("ok")
            //   await addCheckout(newData);
            //   window.location.href = '/purchase';
            //   if (newData) {
            //     newData.products.map((item) => quantityCheckout(item));
            //   }
            //   // xóa các sản phẩm đã được thanh toán ra khỏi giỏ hàng
            //   if (newData) {
            //     newData.products.map((item) => removeCartCheckout(item));
            //   }
            //   //
            //   if (newData) {
            //     newData.products.map((item) => quantityCheckout(item));
            //   }
            //   localStorage.setItem('successMessage', "Chúc mừng bạn đã đặt hàng thành công , đơn hàng sẽ được chuyển đi sớm nhất 🎉🎉🎉");
            //   return;
            // }
            // else {
            //   console.log("lỗi")
            // }
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
        }
      } catch (error) {
        console.error("Lỗi khi tạo checkout:", error);
      }
    }
  };

  const ValidateOtp = async () => {
    if (otp === "") {
      // alert("Please enter an OTP");
      messageApi.info({
        type: "error",
        content: "Vui lòng nhập OTP ",
        className: "custom-class",
        style: {
          marginTop: "0",
          fontSize: "20px",
          lineHeight: "50px",
        },
      });
      return;
    }

    try {
      await result.confirm(otp);
      setStep("VERIFY_SUCCESS");
      // seta1("1");

      // Check if step is VERIFY_OTP and execute additional logic
      if (step === "VERIFY_OTP") {
        console.log("ok");

        // Additional logic after successful OTP verification
        await addCheckout(data1);
        window.location.href = '/purchase';

        // Perform other operations such as quantity updates, cart removal, etc.
        if (data1) {
          data1.products.map((item) => quantityCheckout(item));
          data1.products.map((item) => removeCartCheckout(item));
          data1.products.map((item) => quantityCheckout(item));
        }

        localStorage.setItem('successMessage', "Chúc mừng bạn đã đặt hàng thành công, đơn hàng sẽ được chuyển đi sớm nhất 🎉🎉🎉");
      }
    } catch (err) {
      messageApi.info({
        type: "error",
        content: "Mã otp bị sai vui lòng nhập lại",
        className: "custom-class",
        style: {
          marginTop: "0",
          fontSize: "20px",
          lineHeight: "50px",
        },
      });
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
      <div>
        <center>
          {step === "VERIFY_OTP" && (
            <div>
              <Modal title="Vui lòng nhập mã otp đã được gửi về máy của bạn." open={isModalOpen} onOk={ValidateOtp} onCancel={handleCancel}>
                <br />
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder={"Enter your OTP"}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
                <br />
              </Modal>

            </div>
          )}
        </center>
      </div>
      <section className="checkout_area section_gap" style={{ fontSize: "17px" }}>
        <div className="container">
          <div className="billing_details">
            <form className="row" id="form_checkout" noValidate>

              <div className="col-lg-4">
                <h3>Billing Details</h3>
                <div className="row contact_form">
                  <div className="">
                    <input
                      hidden
                      type="text"
                      className=""
                      id="last"
                      name="user_id"
                      value={usersOne?._id}
                    />
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
                  <div className="col-md-12 form-group ">
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
                  <div className="col-md-12 pb-4">
                    <label htmlFor="">Số điện thoại</label>
                    {/* <input
                      type="text"
                      className="form-control"
                      // id="number"
                      placeholder="Số điện thoại"
                      name="tel"
                      value={usersOne.tel}
                    /> */}
                    <input
                      value={phoneNumber}
                      className="form-control"
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      placeholder="Số điện thoại"
                    />
                    <div id="recaptcha-container"></div>
                  </div>

                  {/* <div className="row"> */}
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
                    <div className="">
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
              {/* </div> */}
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
                          {Array.isArray(voucherStatus) && voucherStatus.length > 0 ? (
                            voucherStatus.map((voucher: any) => (
                              <option key={voucher._id} value={voucher.code}>
                                <img src="https://tse3.mm.bing.net/th?id=OIP.gYaHEu5aZY4P2dsWyYoflQHaDW&pid=Api&P=0&h=180" alt="" width={50} />
                                {voucher.code} -{" "}
                                {voucher.value.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>
                              Bạn đã dùng mã khuyến mại không thể chọn mã khuyến mại khác được nữa .
                            </option>
                          )}
                        </select>
                      </form>
                    </div>


                    <div className="payment_item active">
                      <form className="row mt-3"  >
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
                            !isNaN(parseFloat(voucher?.value))
                              ? parseFloat(voucher?.value).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                              : "0 đ"
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

                    <div className="row pt-3">
                      <div className="payment_item active col-12 m-2">
                        <form className="">
                          <p className="fw-bold row">
                            <label htmlFor="" className="col-12 pb-2">--- Chọn phương thức thanh toán ---</label>
                            <div className="form-check col-12" style={{ border: "2px solid #ccc", padding: "15px", paddingLeft: "50px", borderRadius: "5px", fontSize: "20px" }}>
                              <label className="form-check-label row">
                                <div className="row align-items-center col-9">
                                  <div className="">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="paymentMethod"
                                      onChange={(e) => handlePaymentSelect("Thanh toán khi nhận hàng", e.target.checked)}
                                    />
                                    Thanh toán khi nhận hàng
                                  </div>
                                </div>
                                <div className="col-1 pl-3">
                                  <div>
                                    <img src="https://sv0.vacdn.link/user_libraries/shipcod.png" alt="" width={45} height={40} />
                                  </div>
                                </div>
                                <div className="col-1 pl-3">
                                  <div>
                                    <img src="https://tse2.mm.bing.net/th?id=OIP.T_ss1FeFSZplTsGcqpH40AHaHa&pid=Api&P=0&h=180" alt="" width={50} height={30} />
                                  </div>
                                </div>
                              </label>
                            </div>

                            <div className="form-check col-12" style={{ border: "2px solid #ccc", padding: "15px", paddingLeft: "50px", borderRadius: "5px", fontSize: "20px" }}>
                              <label className="form-check-label row">
                                <div className="row align-items-center col-9">
                                  <div className="">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="paymentMethod"
                                      onChange={(e) => handlePaymentSelect("Thanh toán online", e.target.checked)}
                                    />
                                    Thanh toán online
                                  </div>
                                </div>
                                <div className="col-1 pl-3">
                                  <div>
                                    <img src="https://media.loveitopcdn.com/3807/logo-ncb-dongphucsongphu.png" alt="" width={50} height={30} />
                                  </div>
                                </div>
                                <div className="col-1 ml-3">
                                  <div>
                                    <img src="https://assets.topdev.vn/images/2020/08/25/VNPAY-Logo-yGapP.png" alt="" width={50} height={30} />
                                  </div>
                                </div>
                                <div className="col-1 pl-3">
                                  <div>
                                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Visa-Emblem.jpg" alt="" width={50} height={30} />
                                  </div>
                                </div>
                              </label>
                            </div>

                          </p>
                        </form>
                      </div>


                      <div className="creat_account col-12">
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