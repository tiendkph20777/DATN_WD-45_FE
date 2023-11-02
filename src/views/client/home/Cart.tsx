import React, { useEffect, useState } from 'react'
import { useCreateCartMutation, useFetchOneCartQuery, useRemoveCartDetailMutation, useUpdateCartDetailMutation } from '../../../services/cart.service'
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
    const [updateCartDetailMutation] = useUpdateCartDetailMutation()
    // console.log(ProductDetailUser)

    useEffect(() => {
        if (cartUser && ProductDetailUser) {
            const cartDetailIds = cartUser?.products.map((item: any) => item.productDetailId);

            const matchingIds = cartDetailIds?.filter((id: any) => ProductDetailUser.some((product) => product._id === id));
            // 
            const productIds = ProductDetailUser?.map((item) => item.product_id);
            const filteredProducts = Product?.filter((product: any) => productIds.includes(product?._id));

            const matchingProductDetailUser = ProductDetailUser?.filter((item) => matchingIds.includes(item._id));

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

    // update
    const [editingProductId, setEditingProductId] = useState(null);

    const handleEditButtonClick = (productId: any) => {
        setEditingProductId(productId);
    };

    const handleSaveButtonClick = () => {
        onSubmitCart(formData);
        setEditingProductId(null);
    };
    const [formData, setFormData] = useState({});

    // Hàm xử lý thay đổi dữ liệu khi người dùng nhập liệu
    const handleInputChange = (e: any, field: any) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    // console.log(ProductDetailUser)
    const uniqueSizes = new Set(ProductDetailUser?.map((proSize: any) => proSize.size));
    const uniqueColors = new Set(ProductDetailUser?.map((proColor: any) => proColor.color));
    // console.log(formData)

    ////////////////////////////////
    const { user } = JSON.parse(localStorage.getItem('user')!)
    const [addCart, isLoading] = useCreateCartMutation()

    const [isAddingToCart, setIsAddingToCart] = useState({});

    const onSubmitCart = async (dataCart: any) => {
        console.log(dataCart)
        // Tìm sản phẩm từ ProductDetailUser có kích cỡ, số lượng, và màu sắc khớp với dataCart
        const matchingProduct = ProductDetailUser?.find((product) => (
            product?.size === parseInt(dataCart.size) &&
            // product?.quantity >= parseInt(dataCart.quantity) &&
            product?.color === dataCart.color
        ));

        if (matchingProduct) {
            // Tìm thấy sản phẩm khớp
            const cartItem = {
                product_id: matchingProduct._id,
                user_id: user,
                quantity: dataCart.quantity
            };
            const result = await updateCartDetailMutation(cartItem);
            console.log(result)
            return result;
        } else {
            // Không tìm thấy sản phẩm khớp
            console.log("Không tìm thấy sản phẩm khớp.");
        }

        // Sau khi xử lý, cập nhật trạng thái và làm sạch formData (nếu cần)
        setEditingProductId(null);
        setFormData({});
    };
    // console.log(isAddingToCart)

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
                                            <img width={'100px'} src={item?.image} alt="" />
                                        </td>
                                        <td>
                                            <h6>{item?.name}</h6>
                                        </td>
                                        <td>
                                            {editingProductId === item._id ? (
                                                <select
                                                    className='product-detail-size'
                                                    name=""
                                                    id=""
                                                    style={{ width: "100px", height: "30px" }}
                                                    value={formData?.size !== undefined ? formData?.size : item?.size}
                                                    onChange={(e) => handleInputChange(e, 'size')}
                                                >
                                                    {[...uniqueSizes].map((size) => (
                                                        <option key={size} value={size}>
                                                            {size}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <h5>{item.size}</h5>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                {editingProductId === item._id ? (
                                                    <select
                                                        className='product-detail-size'
                                                        name=""
                                                        id=""
                                                        style={{ width: "100px", height: "30px" }}
                                                        value={formData.color !== undefined ? formData.color : item.color}
                                                        onChange={(e) => handleInputChange(e, 'color')}
                                                    >
                                                        {[...uniqueColors].map((color) => (
                                                            <option key={color} value={color}>
                                                                {color}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <div style={{ display: "flex" }}>
                                                        <button
                                                            style={{
                                                                backgroundColor: item?.color,
                                                                width: "20px",
                                                                height: "20px",
                                                                marginRight: "5px",
                                                            }}
                                                        ></button>
                                                        <h5>{item?.color}</h5>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            {editingProductId === item._id ? (
                                                <input
                                                    type="number"
                                                    value={formData.quantity !== undefined ? formData.quantity : item.quantity}
                                                    style={{ width: "70px" }}
                                                    className='product-detail-size'
                                                    onChange={(e) => handleInputChange(e, 'quantity')}
                                                />
                                            ) : (
                                                <h5>{item.quantity}</h5>
                                            )}
                                        </td>
                                        <td>
                                            <h5>{item.price}VNĐ</h5>
                                        </td>
                                        <td>
                                            <h5>{item.total}VNĐ</h5>
                                        </td>
                                        <td>
                                            {editingProductId === item._id ? (
                                                <Button
                                                    type='primary'
                                                    onClick={() => handleSaveButtonClick(item?._id)}
                                                >
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button
                                                    type='primary'
                                                    onClick={() => handleEditButtonClick(item?._id)}
                                                >
                                                    Edit
                                                </Button>
                                            )}
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
        </section ></div >
    )
}

export default Cart