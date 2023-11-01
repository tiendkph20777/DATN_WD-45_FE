import React, { useEffect, useState } from 'react'
import { useFetchOneCartQuery, useRemoveCartDetailMutation } from '../../../services/cart.service'
import { useGetAllProductsDetailQuery } from '../../../services/productDetail.service'
import { useGetProductsQuery } from '../../../services/product.service';
import { Button, Popconfirm, notification } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { message as messageApi } from 'antd';

const Cart = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const [cartDetail, setCartDetail] = useState([]);
    const { data: cartUser } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
    const { data: Product } = useGetProductsQuery();
    const [removeCartDetailMutation] = useRemoveCartDetailMutation()
    // console.log(cartUser)

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
                    const price = matchingProduct.price;
                    const quantity = cartUser?.products.find((product: any) => product.productDetailId === item._id).quantity;
                    const idCartDetail = cartUser?.products.find((product: any) => product.productDetailId === item._id)._id;
                    return {
                        ...item,
                        name: matchingProduct.name,
                        image: matchingProduct.images[0],
                        price: price,
                        quantity: quantity,
                        total: price * quantity,
                        idCartDetail: idCartDetail,
                    };
                } else {
                    return item;
                }
            });
            setCartDetail(modifiedProductDetails);
        }
    }, [cartUser, ProductDetailUser]);
    // console.log(cartDetail)
    // remove
    const removeProduct = async (id: string) => {
        try {
            const response = await removeCartDetailMutation(id);
            messageApi.info({
                type: 'error',
                content: "Xóa sản phẩm trong giỏ hàng thành công ",
                className: 'custom-class',
                style: {
                    marginTop: '0',
                    fontSize: "20px",
                    lineHeight: "50px"
                },
            });
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm', error);
            notification.error({
                message: 'Xóa',
                description: 'Không thể xóa sản phẩm. Vui lòng thử lại sau.',
            });
        }
    };

    return (
        <div><section className="cart_area">
            <div className="container">
                <div className="cart_inner">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Hình Ảnh</th>
                                    <th scope="col">Tên Sản Phẩm</th>
                                    <th scope="col">Kích Cỡ</th>
                                    <th scope="col">Màu Sắc</th>
                                    <th scope="col">Số Lượng</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Tạm Tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartDetail?.map((item: any) => (
                                    <tr key={item?._id}>
                                        <td>
                                            <input type="checkbox" name="" id="" />
                                        </td>
                                        <td style={{ width: "100px" }}>
                                            <img
                                                width={'100px'}
                                                src={item?.image}
                                                alt=""
                                            />
                                        </td>
                                        <td>
                                            <h6>{item?.name}</h6>
                                        </td>
                                        <td>
                                            <h5>{item?.size}</h5>
                                        </td>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <button
                                                    style={{ backgroundColor: item?.color, width: "20px", height: "20px", margin: "5px" }}
                                                ></button>
                                                <h5>{item?.color}</h5>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>{item?.quantity}</h5>
                                        </td>
                                        <td>
                                            <h5>{item?.price}VNĐ</h5>
                                        </td>
                                        <td>
                                            <h5>{item?.total}VNĐ</h5>
                                        </td>
                                        <td>
                                            <Button type='primary' >
                                                <EditOutlined />
                                            </Button>
                                            <Popconfirm
                                                title="Bạn có chắc muốn xóa sản phẩm này không?"
                                                onConfirm={() => {
                                                    removeProduct(item.idCartDetail);
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button type="primary" style={{ backgroundColor: 'red', margin: '4px' }}>
                                                    <CloseOutlined />
                                                </Button>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))}

                                <tr className="bottom_button">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div className="cupon_text d-flex align-items-center">
                                            <input type="text" placeholder="Coupon Code" />
                                            <a className="primary-btn" href="#">Apply</a>
                                            <a className="gray_btn" href="#">Close Coupon</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <h5>Subtotal</h5>
                                    </td>
                                    <td>
                                        <h5>$2160.00</h5>
                                    </td>
                                </tr>
                                <tr className="shipping_area">
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <h5>Shipping</h5>
                                    </td>
                                    <td>
                                        <div className="shipping_box">
                                            <ul className="list">
                                                <li><a href="#">Flat Rate: $5.00</a></li>
                                                <li><a href="#">Free Shipping</a></li>
                                                <li><a href="#">Flat Rate: $10.00</a></li>
                                                <li className="active"><a href="#">Local Delivery: $2.00</a></li>
                                            </ul>
                                            <h6>Calculate Shipping <i className="fa fa-caret-down" aria-hidden="true"></i></h6>
                                            <select className="shipping_select">
                                                <option value="1">Bangladesh</option>
                                                <option value="2">India</option>
                                                <option value="4">Pakistan</option>
                                            </select>
                                            <select className="shipping_select">
                                                <option value="1">Select a State</option>
                                                <option value="2">Select a State</option>
                                                <option value="4">Select a State</option>
                                            </select>
                                            <input type="text" placeholder="Postcode/Zipcode" />
                                            <a className="gray_btn" href="#">Update Details</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="out_button_area">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div className="checkout_btn_inner d-flex align-items-center">
                                            <a className="gray_btn" href="#">Continue Shopping</a>
                                            <a className="primary-btn" href="#">Proceed to checkout</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section ></div>
    )
}

export default Cart