import React, { useEffect, useState } from 'react'
import { useFetchOneCartQuery, useRemoveCartDetailMutation, useUpdateCartDetailMutation } from '../../../services/cart.service'
import { useGetAllProductsDetailQuery } from '../../../services/productDetail.service'
import { useGetProductsQuery } from '../../../services/product.service';
import { Button, Form, Input, Modal, Popconfirm, Select, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { message as messageApi } from 'antd';
import ProceedToCheckout from './ProceedToCheckout';
import { Controller, useForm } from 'react-hook-form';

const Cart = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const [cartDetail, setCartDetail] = useState([]);
    const { data: cartUser } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
    const { data: Product } = useGetProductsQuery();
    const [removeCartDetailMutation] = useRemoveCartDetailMutation();
    const [updateCartDetailMutation] = useUpdateCartDetailMutation();
    // console.log("a", cartUser)
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
    const [editingProduct, setEditingProduct] = useState({});
    const { control, handleSubmit, setValue, watch } = useForm();

    const handleEditClick = (id: string) => {
        const productToEdit = cartDetail?.find((item) => item?.idCartDetail === id);
        // console.log(productToEdit)
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
    const targetProduct = ProductDetailUser?.filter((item) => item?.product_id === editingProduct?.product_id)
    // console.log(targetProduct)
    const uniqueSizes = new Set(targetProduct?.map((proSize: any) => proSize.size));
    const uniqueColors = new Set(targetProduct?.map((proColor: any) => proColor.color));
    // 
    const selectedSize = watch('size');
    const selectedColor = watch('color');

    const matchingProduct = targetProduct?.find((product) => {
        return product.size === selectedSize && product.color === selectedColor;
    });

    // // Lấy ra danh sách các size và màu duy nhất từ sản phẩm đã chọn
    // const targetProduct = ProductDetailUser?.filter((item) => item?.product_id === editingProduct?.product_id);
    // const selectedProductSizes = [...new Set(targetProduct?.map((product) => product.size))];
    // const selectedProductColors = [...new Set(targetProduct?.map((product) => product.color))];
    // const selectedSizeInitial = selectedProductSizes[0];
    // const selectedColorInitial = selectedProductColors[0];

    // const matchingProduct = targetProduct?.find((product) => {
    //     return product.size === selectedSizeInitial && product.color === selectedColorInitial;
    // });

    // console.log(matchingProduct)
    const onSubmit = async (cartUs: any) => {
        if (matchingProduct) {
            cartUs._id = matchingProduct?._id;
            try {
                const modifiedCartDetail = {
                    idCartDetail: cartUs.idCartDetail,
                    productDetailId: cartUs._id,
                    quantity: cartUs.quantity,
                };
                // console.log("cartUs", modifiedCartDetail);
                await updateCartDetailMutation(modifiedCartDetail);
                messageApi.info({
                    type: 'error',
                    content: "Cập nhật sản phẩm thành công 🎉🎉🎉",
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
                                            <h5>{item.price}VNĐ</h5>
                                        </td>
                                        <td>
                                            <h5>{item.total}VNĐ</h5>
                                        </td>
                                        <td>
                                            <Button
                                                type="primary"
                                                onClick={() => handleEditClick(item.idCartDetail)}
                                            >
                                                Edit
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
                                <Modal
                                    title="Chỉnh sửa sản phẩm"
                                    open={open}
                                    onOk={handleOk}
                                    confirmLoading={confirmLoading}
                                    onCancel={handleCancel}
                                >
                                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                                        <div className='row'>
                                            <img height={'150px'} src={editingProduct?.image} alt="" className='col-xl-4 col-lg-4 col-sm-4 col-8' />
                                            <label htmlFor="" style={{ padding: "30px" }} className='col-xl-7 col-lg-7 col-sm-7 col-12'>{editingProduct?.name}</label>
                                        </div>
                                        <div className='row'>
                                            <Form.Item
                                                label="Size"
                                                name="size"
                                                rules={[{ required: true, message: 'Please input your username!' }]}
                                                className='col-xl-5 col-lg-5 col-sm-5 col-12'
                                            >
                                                <Controller
                                                    render={({ field }) => (
                                                        <Select {...field} style={{ width: "100%" }} className='form-control p-0'>
                                                            {[...uniqueSizes].map((size) => (
                                                                <option key={size} value={size}>
                                                                    {size}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    )}
                                                    name="size"
                                                    control={control}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Color"
                                                name="color"
                                                rules={[{ required: true, message: 'Please input your color!' }]}
                                                className='col-xl-7 col-lg-7 col-sm-7 col-12'
                                            >
                                                <Controller
                                                    render={({ field }) => (
                                                        <Select {...field} style={{ width: "100%" }} className='form-control p-0'>
                                                            {[...uniqueColors].map((color) => (
                                                                <option key={color} value={color}>
                                                                    {color}
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
                                                rules={[{ required: true, message: 'Please input your quantity!' }]}
                                            >
                                                <Controller
                                                    name="quantity"
                                                    control={control}
                                                    defaultValue={editingProduct?.quantity || ''}
                                                    render={({ field }) => <Input {...field} placeholder="quantity" />}
                                                />
                                            </Form.Item>
                                        </div>
                                    </form>
                                </Modal>
                            </tbody>
                        </table>
                        <ProceedToCheckout />
                    </div>
                </div>
            </div>
        </section ></div >
    )
}

export default Cart