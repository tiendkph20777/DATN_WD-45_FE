import React, { useEffect, useState } from 'react'
import { useFetchOneCartQuery, useRemoveCartDetailMutation, useUpdateCartDetailMutation } from '../../../../services/cart.service'
import { useGetAllProductsDetailQuery } from '../../../../services/productDetail.service'
import { useGetProductsQuery } from '../../../../services/product.service';
import { Button, Form, Input, Modal, Popconfirm, Select, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { message as messageApi } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import ProductSale from '../homeProduct/ProductSale';
import EditProductModal from './CartModel';

const Cart = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const [cartDetail, setCartDetail] = useState([]);
    const { data: cartUser } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
    const { data: Product } = useGetProductsQuery();
    const [removeCartDetailMutation] = useRemoveCartDetailMutation();
    const [updateCartDetailMutation] = useUpdateCartDetailMutation();
    // console.log(cartDetail)
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

    // update
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>({});
    const { control, handleSubmit, setValue, watch } = useForm();
    const [quantity, setQuantity] = useState(0);
    // console.log(editingProduct)
    const setQuantityForEditingProduct = () => {
        if (editingProduct) {
            setQuantity(editingProduct.quantity);
        }
    };

    useEffect(() => {
        setQuantityForEditingProduct();
    }, [editingProduct]);

    const handleEditClick = (id: string) => {
        const productToEdit = cartDetail?.find((item: any) => item?.idCartDetail === id);
        setEditingProduct(productToEdit);
        showModal();
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            const editedProduct = {
                _id: editingProduct?._id,
                idCartDetail: editingProduct?.idCartDetail,
                quantity: watch('quantity'),
            };
            await onSubmit(editedProduct);
            setConfirmLoading(false);
            setOpen(false);
        } catch (error) {
            console.error('Lỗi khi xử lý', error);
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (editingProduct) {
            setValue('_id', editingProduct?._id);
            setValue('color', editingProduct?.color);
            setValue('idCartDetail', editingProduct.idCartDetail);
            setValue('image', editingProduct.image);
            setValue('name', editingProduct.name);
            setValue('price', editingProduct.price);
            setValue('product_id', editingProduct.product_id);
            setValue('quantity', editingProduct.quantity);
            setValue('size', editingProduct.size);
            setValue('total', editingProduct.total);
        }
    }, [editingProduct, setValue]);

    const handleQuantityChange = (event: any) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setValue('quantity', newQuantity);
        }
    };

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setValue('quantity', newQuantity);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setValue('quantity', newQuantity);
        }
    };

    // Lấy ra danh sách các size và màu duy nhất từ sản phẩm đã chọn
    const targetProduct = ProductDetailUser?.filter((item) => item?.product_id === editingProduct?.product_id);
    const selectedProductSizes = [...new Set(targetProduct?.map((product) => product.size))];
    const selectedProductColors = [...new Set(targetProduct?.map((product) => product.color))];

    const selectedSize = watch('size');
    const selectedColor = watch('color');

    const matchingProduct = targetProduct?.find((product) => {
        return product.size === selectedSize && product.color === selectedColor;
    });

    // console.log(matchingProduct)
    const handleSizeChange = (newSize: any) => {
        setValue('size', newSize);
        const matchingColors = targetProduct
            ?.filter((product) => product.size === newSize)
            ?.map((product) => product.color);
        setValue('color', matchingColors[0]);
    };
    // console.log(matchingProduct)
    const onSubmit = async (cartUs: any) => {
        if (matchingProduct) {
            cartUs._id = matchingProduct?._id;
            try {
                const modifiedCartDetail = {
                    idCartDetail: cartUs.idCartDetail,
                    productDetailId: cartUs._id,
                    quantity: quantity,
                };
                // console.log("cartUs", modifiedCartDetail);
                await updateCartDetailMutation(modifiedCartDetail);
                messageApi.info({
                    type: 'success',
                    content: "Cập nhật giỏ hàng thành công 🎉🎉🎉",
                    className: 'custom-class',
                    style: {
                        marginTop: '0',
                        fontSize: "20px",
                        lineHeight: "50px"
                    },
                });
                setOpen(false);
            } catch (error) {
                console.error('Lỗi khi submit hoặc cập nhật', error);
            }
        } else {
            console.log('Không tìm thấy sản phẩm phù hợp');
            messageApi.info({
                type: 'error',
                content: "Không tìm thấy sản phẩm phù hợp !!!",
                className: 'custom-class',
                style: {
                    marginTop: '0',
                    fontSize: "20px",
                    lineHeight: "50px"
                },
            });
        }
    };

    return (
        <div>
            <section className="cart_area">
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
                                                <h5>{item.size}</h5>
                                            </td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center" }}>
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
                                                </div>
                                            </td>
                                            <td>
                                                <h5>{item.quantity}</h5>
                                            </td>
                                            <td>
                                                <h5>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                            </td>
                                            <td>
                                                <h5>{item.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                            </td>
                                            <td>
                                                <Button
                                                    type="primary"
                                                    onClick={() => handleEditClick(item.idCartDetail)}
                                                >
                                                    Chỉnh sửa
                                                </Button>
                                                <Popconfirm
                                                    title="Bạn có chắc muốn xóa sản phẩm này không?"
                                                    onConfirm={() => {
                                                        removeProduct(item.idCartDetail);
                                                    }}
                                                    okText="Xóa"
                                                    cancelText="Hủy"
                                                >
                                                    <Button type="primary" style={{ backgroundColor: 'red', margin: '4px' }}>
                                                        <CloseOutlined />
                                                    </Button>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* <Form.Item
                                        label="Color"
                                        name="color"
                                        rules={[{ required: true, message: 'Vui lòng chọn màu!' }]}
                                        className='col-xl-7 col-lg-7 col-sm-7 col-12'
                                    >
                                        <Controller
                                            render={({ field }) => (
                                                <Select {...field} style={{ width: "100%" }} className='form-control p-0'>
                                                    {targetProduct
                                                        ?.filter((product) => product.size === watch('size'))
                                                        .map((product) => (
                                                            <option key={product.color} value={product.color}>
                                                                {product.color}
                                                            </option>
                                                        ))}
                                                </Select>
                                            )}
                                            name="color"
                                            control={control}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="quantity"
                                        name="quantity"
                                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                                    >
                                        <Controller
                                            name="quantity"
                                            control={control}
                                            defaultValue={editingProduct?.quantity || ''}
                                            render={({ field }) => <Input {...field} placeholder="quantity" />}
                                        />
                                    </Form.Item> */}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <hr />
                            <table className="table">
                                <tbody>
                                    <tr className="out_button_area">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className="checkout_btn_inner d-flex align-items-center">
                                                <a className="gray_btn" href="/">Continue Shopping</a>

                                                <a className="primary-btn" href="/checkout">Thanh toán</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <ProductSale />
                            <EditProductModal
                                open={open}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                                handleOk={handleOk}
                                control={control}
                                handleSubmit={handleSubmit}
                                handleSizeChange={handleSizeChange}
                                targetProduct={targetProduct}
                                selectedProductSizes={selectedProductSizes}
                                selectedColor={selectedColor}
                                watch={watch}
                                handleQuantityChange={handleQuantityChange}
                                quantity={quantity}
                                incrementQuantity={incrementQuantity}
                                decrementQuantity={decrementQuantity}
                                editingProduct={editingProduct}
                                setValue={setValue}
                                onSubmit={onSubmit}
                            />
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Cart