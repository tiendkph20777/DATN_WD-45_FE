import React, { useEffect, useState } from 'react'
import { useFetchOneCartQuery } from '../../../services/cart.service';
import { useGetAllProductsDetailQuery } from '../../../services/productDetail.service'
import { useGetProductsQuery } from '../../../services/product.service';
import { useFetchOneUserQuery } from '../../../services/user.service';
import { useCreateCheckoutMutation } from "../../../services/checkout.service";
import { useGetPaymentQuery } from '../../../services/payment.service';

import { Select, Button, Form, Input, notification, Checkbox } from 'antd';
import form from 'antd/es/form';


const { Option } = Select;
const CheckOut = () => {
    const [form] = Form.useForm();
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    // console.log(profileUser.user)

    const [cartDetail, setCartDetail] = useState([]);
    // const [usersOne, setUsersOne] = useState(); // Initialize usersOne as null

    const idUs = profileUser?.user;
    const usersOne = useFetchOneUserQuery(idUs).data

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response =  useFetchOneUserQuery(idUs);
    //             setUsersOne(response.data);
    //             console.log(response)
    //         } catch (error) {
    //         }
    //     };

    //     fetchUserData(); 
    // }, [idUs]);
    console.log(usersOne)
    const { data: cartUser, } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
    const { data: payment } = useGetPaymentQuery();
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
    // const data=cartDetail.map(item=>{
    //     return {
    //         product_id: item.product_id,
    //         user_id: idUs,
    //         address: profileUser.map((item: { address: any; }) => item.address),
    //         fullname: profileUser.map((item: { fullName: any; }) => item.fullName),
    //         email: profileUser.map((item: { email: any; }) => item.email),
    //         tel: profileUser.map((item: { tel: any; }) => item.tel),
    //         total:  item.total,
    //         PaymentAmount: totalSum,
    //         payment: payment
    //     }
    // })


    const totalSum = cartDetail.reduce((accumulator, item) => accumulator + item.total, 0);
    const createCheckout = (value: any) => {

        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const dateCreate = `${year}/${month}/${day}/${hours}/${minutes}/${seconds}`;

        const newData = { products: cartDetail, ...value, status: "Chờ xác nhận...", dateCreate };

        // addCheckout(newData).unwrap();
        console.log(newData)
    }

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


                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        className="row contact_form"
                        onFinish={createCheckout}
                    >
                        <div className="col-lg-9">
                            <h3>Billing Details</h3>
                            <div className="row contact_form">
                                <div className="col-md-6 form-group p_star">
                                    <Form.Item
                                        label="First Name"
                                        name="user_id"
                                        initialValue={usersOne?._id}
                                        hidden
                                    >

                                    </Form.Item>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <Form.Item
                                        label="First Name"
                                        name="name"
                                        initialValue={usersOne?.userName}
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <Form.Item label="Last Name" name="name" initialValue={usersOne?.fullName}>
                                        <Input readOnly />
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 form-group">
                                    <Form.Item label="Company Name" name="company">
                                        <Input placeholder="Company name" />
                                    </Form.Item>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <Form.Item
                                        label="Phone Number"
                                        name="tel"
                                        initialValue={usersOne?.tel}
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                </div>
                                <div className="col-md-6 form-group p_star">
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        initialValue={usersOne?.email}
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <Form.Item label="Address" name="address" initialValue={usersOne?.address}>
                                        <Input readOnly />
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 form-group">
                                    <Form.Item name="createAccount" valuePropName="checked">
                                        <Checkbox>Create an account?</Checkbox>
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="creat_account">
                                        <h3>Shipping Details</h3>
                                        <Form.Item name="shipToDifferentAddress" valuePropName="checked">
                                            <Checkbox>Ship to a different address?</Checkbox>
                                        </Form.Item>
                                        <Form.Item label="Order Notes" name="Note">
                                            <Input.TextArea rows={1} placeholder="Order Notes" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="order_box">
                                <h2>Your Order</h2>
                                <table>
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
                                                    width={'100px'}
                                                    height={'100px'}
                                                    src={item?.image}
                                                    alt="" />
                                            </td>
                                            <td style={{ width: "200px" }}>
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
                                                <h5>{item?.price}đ</h5>
                                            </td>
                                            <td style={{ width: "100px" }}>
                                                <h5>{item?.total}đ</h5>
                                            </td>

                                        </tr>

                                    ))}
                                </table>

                                <div className="col-md-12 form-group">

                                    <Input readOnly value={totalSum} />

                                </div>
                                <div className="payment_item">
                                    <Form.Item
                                        label="Payment Method"
                                        name="paymentMethod"
                                        rules={[{ required: true, message: 'Please select a payment' }]}
                                    >
                                        <Select placeholder="Select a payment">
                                            {payment?.map((payment) => (
                                                <Option key={payment._id} value={payment._id}>
                                                    {payment.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>


                                <div className="payment_item active">
                                    <Form.Item
                                        label=" Shipping"
                                        name="shipping"
                                        rules={[{ required: true, message: 'Please select a shipping' }]}
                                    >
                                        <Select placeholder="Select a shipping">
                                            <Option value="shoppee">Shoppee</Option>
                                            <Option value="vietelpost">VietelPost</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="creat_account">
                                    <Form.Item
                                        name="acceptTerms"
                                        valuePropName="checked"
                                        rules={[
                                            {
                                                validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please accept the terms & conditions'),
                                            },
                                        ]}
                                    >
                                        <Checkbox>
                                            I’ve read and accept the <a href="#">terms & conditions*</a>
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                                <div className="card_area align-items-center">
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button type="primary" htmlType="submit">
                                            Order
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>

                </div>
            </div>
        </section></div>
    )

}
export default CheckOut

function moment(date: Date) {
    throw new Error('Function not implemented.');
}
