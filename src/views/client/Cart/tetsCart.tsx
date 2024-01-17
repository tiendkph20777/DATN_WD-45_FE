import React, { useEffect, useState } from "react";
import {
  useFetchOneCartQuery,
  useRemoveCartDetailMutation,
  useUpdateCartDetailMutation,
} from "../../../services/cart.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
import { useGetProductsQuery } from "../../../services/product.service";
import { Button, Popconfirm, notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { message as messageApi } from "antd";
import { useForm } from "react-hook-form";
import ProductSale from "../home/homeProduct/ProductSale";
import EditProductModal from "./CartModel";
import { Link } from "react-router-dom";

const Cart = () => {
  const profileUser = JSON.parse(localStorage.getItem("user")!);
  const idUs = profileUser?.user;
  const [cartDetail, setCartDetail] = useState([]);
  const { data: cartUser, isLoading } = useFetchOneCartQuery(idUs);
  const { data: ProductDetailUser } = useGetAllProductsDetailQuery();
  const { data: Product } = useGetProductsQuery();
  const [removeCartDetailMutation] = useRemoveCartDetailMutation();
  const [updateCartDetailMutation] = useUpdateCartDetailMutation();
  // const [cartDetailCheckbot, setCartDetailCheckbot] = useState([]);

  console.log(cartDetail);
  // console.log(cartUser)
  // sản phẩm dược chọn
  const productsWithTrueStatus = cartDetail.filter(
    (product: any) => product.status === true
  );
  const totalCost = productsWithTrueStatus?.reduce(
    (acc, product: any) => acc + product.quantity * product.price_sale,
    0
  );
  //
  useEffect(() => {
    if (cartUser && ProductDetailUser) {
      const cartDetailIds = cartUser?.products.map(
        (item: any) => item.productDetailId
      );
      const matchingIds = cartDetailIds?.filter((id: any) =>
        ProductDetailUser.some((product) => product._id === id)
      );
      //
      const productIds = ProductDetailUser?.map((item) => item.product_id);
      const filteredProducts = Product?.filter((product: any) =>
        productIds.includes(product?._id)
      );

      const matchingProductDetailUser = ProductDetailUser?.filter((item) =>
        matchingIds.includes(item._id)
      );

      const modifiedProductDetails = matchingProductDetailUser?.map(
        (item: any) => {
          const matchingProduct = filteredProducts?.find(
            (product) => product._id === item.product_id
          );

          if (matchingProduct) {
            const price = matchingProduct.price;
            const price_sale = matchingProduct.price_sale;
            const status = cartUser?.products.find(
              (product: any) => product.productDetailId === item._id
            ).status;
            const cart_id = cartUser?.products.find(
              (product: any) => product.productDetailId === item._id
            ).cart_id;
            // console.log(status)
            const quantity = cartUser?.products.find(
              (product: any) => product.productDetailId === item._id
            ).quantity;
            const idCartDetail = cartUser?.products.find(
              (product: any) => product.productDetailId === item._id
            )._id;
            return {
              ...item,
              name: matchingProduct.name,
              image: matchingProduct.images[0],
              price: price,
              price_sale: price_sale,
              quantity: quantity,
              total: price_sale * quantity,
              idCartDetail: idCartDetail,
              status: status,
              cart_id: cart_id,
            };
          } else {
            return item;
          }
        }
      );
      setCartDetail(modifiedProductDetails);
    }
  }, [cartUser, ProductDetailUser]);
  // console.log(cartDetail)
  // remove
  const removeProduct = async (id: string) => {
    try {
      const response = await removeCartDetailMutation(id);
      messageApi.info({
        type: "error",
        content: "Xóa sản phẩm trong giỏ hàng thành công ",
        className: "custom-class",
        style: {
          marginTop: "0",
          fontSize: "20px",
          lineHeight: "50px",
        },
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm", error);
      notification.error({
        message: "Xóa",
        description: "Không thể xóa sản phẩm. Vui lòng thử lại sau.",
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
    const productToEdit = cartDetail?.find(
      (item: any) => item?.idCartDetail === id
    );
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
        quantity: watch("quantity"),
      };
      await onSubmit(editedProduct);
      setConfirmLoading(false);
      setOpen(false);
    } catch (error) {
      console.error("Lỗi khi xử lý", error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (editingProduct) {
      setValue("_id", editingProduct?._id);
      setValue("color", editingProduct?.color);
      setValue("idCartDetail", editingProduct.idCartDetail);
      setValue("image", editingProduct.image);
      setValue("name", editingProduct.name);
      setValue("price", editingProduct.price);
      setValue("product_id", editingProduct.product_id);
      setValue("quantity", editingProduct.quantity);
      setValue("size", editingProduct.size);
      setValue("total", editingProduct.total);
      setValue("status", editingProduct.status);
    }
  }, [editingProduct, setValue]);

  const handleQuantityChange = (event: any) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setValue("quantity", newQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setValue("quantity", newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setValue("quantity", newQuantity);
    }
  };
  // Lấy ra danh sách các size và màu duy nhất từ sản phẩm đã chọn
  const targetProduct = ProductDetailUser?.filter(
    (item) => item?.product_id === editingProduct?.product_id
  );
  const selectedProductSizes = [
    ...new Set(targetProduct?.map((product) => product.size)),
  ];

  const selectedSize = watch("size");
  const selectedColor = watch("color");

  const matchingProduct = targetProduct?.find((product) => {
    return product.size === selectedSize && product.color === selectedColor;
  });

  // console.log(matchingProduct)
  const handleSizeChange = (newSize: any) => {
    setValue("size", newSize);
    const matchingColors = targetProduct
      ?.filter((product) => product.size === newSize)
      ?.map((product) => product.color);
    setValue("color", matchingColors[0]);
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
          type: "success",
          content: "Cập nhật giỏ hàng thành công 🎉🎉🎉",
          className: "custom-class",
          style: {
            marginTop: "0",
            fontSize: "20px",
            lineHeight: "50px",
          },
        });
        setOpen(false);
      } catch (error) {
        console.error("Lỗi khi submit hoặc cập nhật", error);
      }
    } else {
      console.log("Không tìm thấy sản phẩm phù hợp");
      messageApi.info({
        type: "error",
        content: "Không tìm thấy sản phẩm phù hợp !!!",
        className: "custom-class",
        style: {
          marginTop: "0",
          fontSize: "20px",
          lineHeight: "50px",
        },
      });
    }
  };

  const handleCheckboxChange = (e: any, item: any) => {
    const checkbox = {
      idCartDetail: item?.idCartDetail,
      status: e.target.checked,
    };
    // console.log(checkbox)
    updateCartDetailMutation(checkbox);
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
  // console.log(cartDetail);
  return (
    <div>
      <section className="cart_area">
        <div className="container">
          <hr />
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
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
                        <input
                          type="checkbox"
                          checked={item?.status}
                          onChange={(e) => handleCheckboxChange(e, item)}
                        />
                      </td>
                      <td style={{ width: "100px" }}>
                        <img width={"100px"} src={item?.image} alt="" />
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
                        <h5>
                          {item.price_sale?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h5>
                      </td>
                      <td>
                        <h5>
                          {item.total?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h5>
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
                          <Button
                            type="primary"
                            style={{ backgroundColor: "red", margin: "4px" }}
                          >
                            <CloseOutlined />
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <hr />
              <table className="table">
                <tbody>
                  <tr className="out_button_area">
                    <td>
                      <h3>
                        Số sản phẩm đã chọn: {productsWithTrueStatus?.length}
                      </h3>
                    </td>
                    <td></td>
                    <td>
                      {productsWithTrueStatus?.length > 0 ? (
                        <h3>
                          Tổng tiền thanh toán:{" "}
                          {totalCost?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h3>
                      ) : (
                        <p>Không có sản phẩm nào để thanh toán</p>
                      )}
                    </td>
                    <td></td>
                    <td>
                      <div className="align-items-center">
                        {productsWithTrueStatus?.length > 0 ? (
                          <Link to="/checkout" className="primary-btn">
                            Thanh toán
                          </Link>
                        ) : (
                          <a className="gray_btn" href="/">
                            Tiếp tuc mua sắm
                          </a>
                        )}
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
      </section>
    </div>
  );
};

export default Cart;
