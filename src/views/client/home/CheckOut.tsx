import React, { useEffect, useState } from 'react'
import { useFetchOneCartQuery } from '../../../services/cart.service';
import { useGetAllProductsDetailQuery } from '../../../services/productDetail.service'
import { useGetProductsQuery } from '../../../services/product.service';
import { useFetchOneUserQuery } from '../../../services/user.service';
import { useCreateCheckoutMutation } from "../../../services/checkout.service";
import { useGetPaymentQuery } from '../../../services/payment.service';

import { Select, Button, Form, Input, notification, Checkbox } from 'antd';
import form from 'antd/es/form';
import { useGetVoucherByCodeQuery } from '../../../services/voucher.service';


const { Option } = Select;
const CheckOut = () => {
    const [form] = Form.useForm();
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    // const [isAddingToCheckout, setIsAddingToCheckout] = useState(false);

    // console.log(profileUser.user)

    const [cartDetail, setCartDetail] = useState([]);
    // const [usersOne, setUsersOne] = useState(); // Initialize usersOne as null

    const idUs = profileUser?.user;
    const usersOne = useFetchOneUserQuery(idUs).data

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await useFetchOneUserQuery(idUs);
                setUsersOne(response.data);
                console.log(response)
            } catch (error) {
            }
        };

        fetchUserData();
    }, [idUs]);
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
    // const [voucherCode, setVoucherCode] = useState('');

    // const handleCheckVoucher = async () => {
    //     const valueVoucher = await useGetVoucherByCodeQuery(voucherCode)
    //     console.log(valueVoucher);
    //     // console.log(voucherCode);
    // }
    const [addCheckout] = useCreateCheckoutMutation();
    const createCheckout = (value: any) => {

        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const dateCreate = `${year}/${month}/${day}/${hours}/${minutes}/${seconds}`;

        const newData = { products: cartDetail, ...value, total: totalSum, status: "Chờ xác nhận...", dateCreate };

        addCheckout(newData);
        console.log(newData)
    }


    return (
        <div><section className="checkout_area section_gap">
            <div className="container">


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
                                        label="ID NAME"
                                        name="user_id"
                                        initialValue={usersOne?._id}
                                        hidden
                                    >

                                    </Form.Item>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <Form.Item
                                        label="Họ và tên"
                                        name="fullName"
                                        initialValue={usersOne?.fullName}
                                        rules={[{ required: true, message: 'Vui lòng điền họ và tên' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="tel"
                                    initialValue={usersOne?.tel}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng điền số điện thoại',
                                        },
                                        {
                                            validator: (_, value) => {
                                                const phoneNumberPattern = /^[0-9]{10}$/; // Định dạng: 10 chữ số
                                                if (phoneNumberPattern.test(value)) {
                                                    return Promise.resolve(); // Số điện thoại hợp lệ, không có lỗi
                                                }
                                                return Promise.reject('Số điện thoại không hợp lệ!'); // Số điện thoại không hợp lệ, trả về thông báo lỗi
                                            },
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <div className="col-md-12 form-group p_star">
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        initialValue={usersOne?.email}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 form-group p_star">
                                    <Form.Item label="Địa chỉ giao hàng" name="address" initialValue={usersOne?.address} rules={[{ required: true, message: 'Bạn không ghi địa chỉ thì chúng tôi gửi xuống mương à :)))' }]}>
                                        <Input />

                                    </Form.Item>
                                </div>
                                <div className="col-md-12 form-group">
                                    <Form.Item label="Ghi chú" name="Note">
                                        <Input.TextArea rows={1} placeholder="#Gọi vào giờ hàng chính" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="order_box">
                                <h2>Your Order</h2>
                                <table className=''>
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


                                <div className="col-8 payment_item">
                                    <Form.Item
                                        label="Tổng tiền"
                                        name="total"
                                    >
                                        <b style={{ display: 'none' }}>{totalSum}</b>
                                        <Input type="text" readOnly value={totalSum} />
                                    </Form.Item>
                                </div>

                                <div className="col-8  payment_item">
                                    <Form.Item
                                        label="Hình thức thanh toán"
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
                                <div className="col-md-12 d-flex form-group p_star">
                                    <Form.Item
                                        label="Nhập mã giảm giá"
                                        name="voucherCode"
                                        className='col-md-6'
                                    >
                                        <Input
                                            className='col-md-4'
                                        // value={voucherCode}
                                        // onChange={(e) => setVoucherCode(e.target.value)}
                                        />
                                    </Form.Item>
                                    {/* <Button className='bg-success btn-success ' onClick={handleCheckVoucher}>
                                        Kiểm Tra
                                    </Button> */}
                                </div>



                                <div className="col-8 payment_item active">
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
