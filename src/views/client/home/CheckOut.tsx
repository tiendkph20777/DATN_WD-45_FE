import React, { useEffect, useState } from 'react'
import { useFetchOneCartQuery } from '../../../services/cart.service';
import { useGetAllProductsDetailQuery } from '../../../services/productDetail.service'
import { useGetProductsQuery } from '../../../services/product.service';
import { useFetchOneUserQuery } from '../../../services/user.service';
import { useCreateCheckoutMutation } from "../../../services/checkout.service";


const CheckOut = () => {

    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const [cartDetail, setCartDetail] = useState([]);
    console.log(cartDetail)
    const { data: usersOne } = useFetchOneUserQuery(idUs)
    const { data: cartUser, } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetAllProductsDetailQuery();

    const { data: Product } = useGetProductsQuery();

    useEffect(() => {
        if (cartUser && ProductDetailUser) {
            const cartDetailIds = cartUser?.products.map((item: any) => item.productDetailId);
            const matchingIds = cartDetailIds?.filter((id: any) => ProductDetailUser.some((product) => product._id === id));
            // 
            const productIds = ProductDetailUser?.map((item) => item.product_id);
            const filteredProducts = Product?.filter((product: any) => productIds.includes(product?._id));

            const matchingProductDetailUser = ProductDetailUser?.filter((item) => matchingIds.includes(item._id));
            // console.log(matchingProductDetailUser)
            const modifiedProductDetails = matchingProductDetailUser?.map((item: any) => {
                const matchingProduct = filteredProducts?.find((product) => product._id === item.product_id);

                if (matchingProduct) {
                    const price = matchingProduct.price; // Lấy giá từ sản phẩm
                    const quantity = cartUser.products.find((product: any) => product.productDetailId === item._id).quantity; // Lấy quantity từ cartUser
                    return {
                        ...item,
                        name: matchingProduct.name,
                        image: matchingProduct.images[0],
                        price: price,
                        quantity: quantity,
                        total: price * quantity, // Tính tổng giá bằng cách nhân giá với số lượng
                    };
                } else {
                    return item;
                }
            });
            setCartDetail(modifiedProductDetails);
        }
    }, [cartUser, ProductDetailUser]);

    const [isAddingToCheckout, setIsAddingToCheckout] = useState(false);
    const [addCheckout, { isLoading, isError, isSuccess }] = useCreateCheckoutMutation();

    const onSubmitCheckout = async () => {
        if (!isAddingToCheckout) {
            setIsAddingToCheckout(true);

            // Prepare the data for creating a checkout
            const checkoutData = {
                product_id: cartDetail.map(item => item.product_id),
                user_id: idUs,
                address: profileUser.map((item: { address: any; }) => item.address),
                fullname:profileUser.map((item: { fullName: any; })=>item.fullName),
                email:profileUser.map((item: { email: any; })=>item.email),
                tel:profileUser.map((item: { tel: any; })=>item.tel),
                total:cartDetail.map(item => item.total),
                PaymentAmount: totalSum,
                // Add other checkout-related data here
            };

            try {
                // Call the addCheckout mutation to create a checkout
                const response = await addCheckout(checkoutData).unwrap();

                // Handle success and navigate to a confirmation page or perform other actions
                if (isSuccess(response)) {
                    // Handle success, e.g., show a success message, redirect to a confirmation page
                    console.log('Checkout successful');
                    // You may want to reset the cart or perform other post-checkout actions.
                }
            } catch (error) {
                // Handle any errors or display error messages to the user
                console.error('Error adding checkout:', error);
            } finally {
                setIsAddingToCheckout(false);
            }
        }
    };

    const totalSum = cartDetail.reduce((accumulator, item) => accumulator + item.total, 0);

    return (
        <div><section className="checkout_area section_gap">
            <div className="container">
                {/* <div className="returning_customer">
                    <div className="check_title">
                        <h2>Returning Customer? <a href="#">Click here to login</a></h2>
                    </div>
                    <p>If you have shopped with us before, please enter your details in the boxes below. If you are a new
                        customer, please proceed to the Billing & Shipping section.</p>
                    <form className="row contact_form" action="#" method="post" noValidate>
                        <div className="col-md-6 form-group p_star">
                            <input type="text" className="form-control" id="name" name="name" />
                            <span className="placeholder" data-placeholder="Username or Email"></span>
                        </div>
                        <div className="col-md-6 form-group p_star">
                            <input type="password" className="form-control" id="password" name="password" />
                            <span className="placeholder" data-placeholder="Password"></span>
                        </div>
                        <div className="col-md-12 form-group">
                            <button type="submit" value="submit" className="primary-btn">login</button>
                            <div className="creat_account">
                                <input type="checkbox" id="f-option" name="selector" />
                                <label htmlFor="f-option">Remember me</label>
                            </div>
                            <a className="lost_pass" href="#">Lost your password?</a>
                        </div>
                    </form>
                </div> */}
                <div className="cupon_area">
                    <div className="check_title">
                        <h2>Have a coupon? <a href="#">Click here to enter your code</a></h2>
                    </div>
                    <input type="text" placeholder="Enter coupon code" />
                    <a className="tp_btn" href="#">Apply Coupon</a>
                </div>
                <div className="billing_details">

                    <form className="row" action="" method="post" noValidate>
                        <div className="col-lg-4">
                            <h3>Billing Details</h3>
                            <div className="row contact_form"  >
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="first" name="name" defaultValue={usersOne?.userName} readOnly />
                                    {/* <span className="placeholder" data-placeholder="First name"></span> */}
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="last" name="name" defaultValue={usersOne?.fullName} readOnly />
                                    <span className="placeholder" ></span>
                                </div>
                                <div className="col-md-12 form-group">
                                    <input type="text" className="form-control" id="company" name="company" placeholder="Company name" />
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="number" name="number" defaultValue={usersOne?.tel} readOnly />
                                    <span className="placeholder" ></span>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <input type="text" className="form-control" id="email" name="compemailany" defaultValue={usersOne?.email} readOnly />
                                    <span className="placeholder" ></span>
                                </div>

                                <div className="col-md-12 form-group p_star">
                                    <input type="text" className="form-control" id="add1" name="add1" defaultValue={usersOne?.address} readOnly />
                                    <span className="placeholder" ></span>
                                </div>


                                <div className="col-md-12 form-group">
                                    <div className="creat_account">
                                        <input type="checkbox" id="f-option2" name="selector" />
                                        <label htmlFor={"f-option2"}>Create an account?</label>
                                    </div>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="creat_account">
                                        <h3>Shipping Details</h3>
                                        <input type="checkbox" id="f-option3" name="selector" />
                                        <label htmlFor="f-option3">Ship to a different address?</label>
                                    </div>
                                    <textarea className="form-control" name="message" id="message" rows={1} placeholder="Order Notes"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="order_box">
                                <h2>Your Order</h2>
                                <tr>
                                    <th scope="col" style={{ paddingLeft: "60px" }}>Hình Ảnh</th>
                                    <th scope="col">Tên Sản Phẩm</th>
                                    <th scope="col">Kích Cỡ</th>
                                    <th scope="col">Màu Sắc</th>
                                    <th scope="col">Số Lượng</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Tạm Tính</th>
                                </tr>
                                {cartDetail?.map((item: any) => (
                                    <tr key={item?._id}>
                                        <td style={{ width: "100px" }}>

                                            <img
                                                width={'100px'}
                                                src={item?.image}
                                                alt="" />
                                        </td>
                                        <td style={{ width: "250px" }}>
                                            <h6>{item?.name}</h6>
                                        </td>
                                        <td style={{ width: "100px" }}>
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
                                        <td style={{ width: "100px" }}>
                                            <h5>{item?.quantity}</h5>
                                        </td>
                                        <td style={{ width: "100px" }}>
                                            <h5>{item?.price}VNĐ</h5>
                                        </td>
                                        <td style={{ width: "100px" }}>
                                            <h5>{item?.total}VNĐ</h5>
                                        </td>

                                    </tr>
                                ))}

                                <tr>
                                    <td style={{ width: "150px" }}>Tổng thanh toán</td>
                                    {/* <td>Shipping <span>Flat rate: 30000</span></td> */}
                                    <td style={{ width: "300px" }}> </td>
                                    <td style={{ width: "50px" }}> </td>
                                    <td style={{ width: "150px" }}> </td>

                                    <td style={{ width: "200px" }}> {totalSum}</td>
                                </tr>




                                <div className="payment_item">
                                    <div className="radion_btn">
                                        <input type="radio" id="f-option5" name="selector" />
                                        <label htmlFor="f-option5">Check payments</label>
                                        <div className="check"></div>
                                    </div>
                                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                        Store Postcode.</p>
                                </div>
                                <div className="payment_item active">
                                    <div className="radion_btn">
                                        <input type="radio" id="f-option6" name="selector" />
                                        <label htmlFor="f-option6">Paypal </label>
                                        <img src="img/product/card.jpg" alt="" />
                                        <div className="check"></div>
                                    </div>
                                    <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                        account.</p>
                                </div>
                                <div className="creat_account">
                                    <input type="checkbox" id="f-option4" name="selector" />
                                    <label htmlFor="f-option4">I’ve read and accept the </label>
                                    <a href="#">terms & conditions*</a>
                                </div>

                                <div className="card_area  align-items-center">
                                    <button
                                        className="primary-btn"
                                        onClick={onSubmitCheckout}
                                        disabled={isAddingToCheckout}
                                    >
                                        {isAddingToCheckout ? "Ordering..." : "Order"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section></div>
    )

}
export default CheckOut