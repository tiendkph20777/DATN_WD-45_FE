import React, { useEffect, useState } from 'react'
import { useFetchOneCartQuery } from '../../../services/cart.service';
import { useGetAllProductsDetailQuery } from '../../../services/productDetail.service'
import { useGetProductsQuery } from '../../../services/product.service';
import { useFetchOneUserQuery } from '../../../services/user.service';
import { useCreateCheckoutMutation, useReductionProductMutation } from "../../../services/checkout.service";
import { useGetVoucherByCodeQuery } from '../../../services/voucher.service';
import { useGetPaymentQuery } from '../../../services/payment.service';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const [cartDetail, setCartDetail] = useState([]);
    const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs)
    const { data: cartUser, } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
    const { data: paymentQuery } = useGetPaymentQuery();
    const { data: Product } = useGetProductsQuery();


    useEffect(() => {

        if (cartUser && ProductDetailUser) {
            const cartDetailIds = cartUser?.products.map((item: any) => item.productDetailId);
            const matchingIds = cartDetailIds?.filter((id: any) => ProductDetailUser.some((product) => product._id === id));
            const productIds = ProductDetailUser?.map((item) => item.product_id);
            const filteredProducts = Product?.filter((product: any) => productIds.includes(product?._id));
            const matchingProductDetailUser = ProductDetailUser?.filter((item) => matchingIds.includes(item._id));
            const modifiedProductDetails = matchingProductDetailUser?.map((item: any) => {
                const matchingProduct = filteredProducts?.find((product) => product._id === item.product_id);

                if (matchingProduct) {
                    const price = matchingProduct.price;
                    const quantity = cartUser.products.find((product: any) => product.productDetailId === item._id).quantity;
                    return {
                        ...item,
                        name: matchingProduct.name,
                        image: matchingProduct.images[0],
                        price: price,
                        quantity: quantity,
                        total: price * quantity,
                    };
                } else {
                    return item;
                }
            });
            setCartDetail(modifiedProductDetails);
        }


    }, [cartUser, ProductDetailUser]);


    const [voucherCode, setVoucherCode] = useState('');
    const { data: voucher, error } = useGetVoucherByCodeQuery(voucherCode);

    const getCodeVoucher = () => {
        if (!voucherCode) {
            console.error('Mã khuyến mãi không được để trống');
            return;
        }
    };
    if (voucher) {
        console.log('Thông tin voucher:', voucher);
    }
    if (error) {
        console.error('Lỗi khi truy vấn mã khuyến mãi:', error);
    }



    const [isAddingToCheckout, setIsAddingToCheckout] = useState(false);
    const [addCheckout] = useCreateCheckoutMutation();
    const [quantityCheckout] = useReductionProductMutation();
    const valueVoucher = voucher?.value !== undefined ? voucher.value : 0;
    const totalSum = cartDetail.reduce((accumulator, item: any) => accumulator + item.total, 0);
    const total = totalSum - valueVoucher;

    // Payment ID
    const [selectedPayment, setSelectedPayment] = useState(null);

    // Prepare the data for creating a checkout
    // const checkoutData = {
    //     product_id: cartDetail.map(item => item.product_id),
    //     user_id: idUs,
    //     address: profileUser.map((item: { address: any; }) => item.address),
    //     fullname: profileUser.map((item: { fullName: any; }) => item.fullName),
    //     email: profileUser.map((item: { email: any; }) => item.email),
    //     tel: profileUser.map((item: { tel: any; }) => item.tel),
    //     total: cartDetail.map(item => item.total),
    //     PaymentAmount: totalSum,
    //     // Add other checkout-related data here
    // };
    const handlePaymentSelect = (paymentId: any) => {
        setSelectedPayment(paymentId);
        // Thêm logic xử lý khi phương thức thanh toán được chọn
    };
    const navigation = useNavigate()
    const handleOnClick = async () => {
        const form = document.querySelector('#form_checkout') as HTMLFormElement | null;
        if (form) {
            const formData = new FormData(form);
            const data: { [key: string]: string } = {};
            formData.forEach((value, key) => {
                const inputElement = form.querySelector(`[name="${key}"]`);
                if (inputElement && inputElement instanceof HTMLInputElement) {
                    const name = inputElement.getAttribute('name');
                    if (name) {
                        data[name] = value.toString();
                    }
                }
            });

            try {
                const date = new Date()
                const newData = { ...data, products: cartDetail, payment_id: selectedPayment, shipping: "", total: totalSum - voucher?.value, voucherCode, dateCreate: date, status: 'Đang xác nhận đơn hàng' };
                localStorage.setItem('currentOrder', JSON.stringify(newData));
                await addCheckout(newData);
                if (newData) {
                    newData.products.map((item) => quantityCheckout(item))
                }
                navigation("/ordersuccess")
            } catch (error) {
                console.error('Lỗi khi tạo checkout:', error);
            }
        }
    };
    const addre = usersOne?.city + " , " + usersOne?.district + " , " + usersOne?.commune + " , " + usersOne?.address

    if (isLoading) {
        return <div>
            <div className="right-wrapper">
                <div className="spinnerIconWrapper">
                    <div className="spinnerIcon"></div>
                </div>
                <div className="finished-text">
                    Xin vui lòng chờ một chút 🥰🥰🥰
                </div>
            </div>
        </div>;
    }
    return (
        <div><section className="checkout_area section_gap">
            <div className="container">
                <div className="billing_details">
                    <form className="row" id='form_checkout' noValidate>
                        <div className="col-lg-4">
                            <h3>Billing Details</h3>
                            <div className="row contact_form"  >
                                <div className="col-md-12 form-group p_star">
                                    <input hidden type="text" className="form-control" id="last" name="user_id" value={usersOne?._id} />
                                    <span className="placeholder" ></span>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <label htmlFor="">Họ và tên</label>
                                    <input type="text" className="form-control" id="last" name="fullName" value={usersOne?.fullName} />
                                    <span className="placeholder" ></span>
                                </div>
                                <div className="col-md-12 form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" placeholder="Địa chỉ email" value={usersOne?.email} />
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input type="text" className="form-control" id="number" placeholder='Số điện thoại' name="tel" value={usersOne?.tel} />
                                    <span className="placeholder" ></span>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <input hidden type="text" className="form-control" id="address" name="address" value={usersOne?.address} />
                                    <span className="placeholder" ></span>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <label htmlFor="">Địa chỉ</label>
                                    <textarea
                                        className="form-control"
                                        id="address"
                                        placeholder='Địa chỉ giao hàng'
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
                                    <tr key={item?._id} style={{ height: "100px" }} >
                                        <td style={{ width: "100px" }}>
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
                                    {/* <td>Shipping <span>Flat rate: 30000</span></td> */}
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td style={{ color: "black", fontSize: "20px" }}>{totalSum?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                                <div className="payment_item">
                                    <div className="radion_btn">
                                        <input type="radio" id="f-option5" name="selector" />
                                        <label htmlFor="f-option5">Check payments</label>
                                        <div className="check"></div>
                                    </div>
                                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                        Store Postcode.</p>
                                    <div className="payment_item active">
                                        <form className='row mt-3' id='form-voucher'>
                                            <input
                                                type="text"
                                                className='col-8 m-1 form-control'
                                                name='voucherCode'
                                                placeholder='Nhập mã khuyến mại tại đây!'
                                                value={voucherCode}
                                                onChange={(e) => setVoucherCode(e.target.value)}
                                            />
                                            {/* <button
                                                type='button'
                                                className='col-3 btn btn-dark bg-dark text-light m-1'
                                                onClick={getCodeVoucher}
                                            >
                                                Kiểm Tra
                                            </button> */}
                                        </form>
                                    </div>
                                    <div className="payment_item active">
                                        <form className='row mt-3'>
                                            <label htmlFor="" className='col-8 m-2'>Trước Khuyến Mại</label>
                                            <input type="text" disabled className='col-2 money-checkout w-25' value={totalSum?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} />
                                        </form>
                                    </div>
                                    <div className="payment_item active">
                                        <form className='row mt-3'>
                                            <label htmlFor="" className='col-8 m-2'>Sau Khuyến Mại(*Voucher)</label>
                                            <input type="text" disabled className='col-2 money-checkout w-25' placeholder='*Giá trị voucher' value={voucher ? parseFloat(voucher?.value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''} />
                                        </form>
                                    </div>

                                    <div className="payment_item active">
                                        <form className='row mt-3'>
                                            <label htmlFor="" className='col-8 m-2'>Tổng Thanh Toán</label>
                                            <input type="text" disabled className='col-2 text-danger w-25 total-checkout' name='total' value={total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} />
                                        </form>
                                    </div>

                                    <div className="row">
                                        <div className="payment_item active col-5 m-2">
                                            <div>
                                                <select
                                                    onChange={(e) => handlePaymentSelect(e.target.value)}
                                                    name="payment_id"
                                                    className='form-select'
                                                >
                                                    {paymentQuery?.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="creat_account col-6">
                                            <input checked disabled type="checkbox" id="f-option4" name="selector" />
                                            <label htmlFor="f-option4">Việc đặt hàng của bạn đồng thời chấp nhận </label>
                                            <a href="#"> điều khoản và dịch vụ*</a>của chúng tôi.
                                            <label htmlFor="f-option4">** Đối với đơn hàng nội thành là 25k, ngoại thành là 40k</label>
                                        </div>

                                    </div>
                                    <div className="card_area col-6 align-items-center">
                                        <button type='button'
                                            className="primary-btn w-50 m-2"
                                            onClick={handleOnClick}
                                            disabled={isAddingToCheckout}
                                        >
                                            {isAddingToCheckout ? "Ordering..." : "Order"}
                                        </button>
                                    </div>


                                </div>
                            </div >
                        </div>
                    </form >

                </div >
            </div >
        </section >
        </div >

    )
}
export default CheckOut