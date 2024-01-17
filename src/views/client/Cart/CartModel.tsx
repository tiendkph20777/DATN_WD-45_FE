import React from "react";
import { Modal, Form, Select, message } from "antd";
import { Controller } from "react-hook-form";

const EditProductModal = ({
  open,
  confirmLoading,
  onCancel,
  handleOk,
  control,
  handleSubmit,
  handleSizeChange,
  targetProduct,
  selectedProductSizes,
  selectedColor,
  watch,
  handleQuantityChange,
  quantity,
  incrementQuantity,
  decrementQuantity,
  editingProduct,
  setValue,
  onSubmit,
  quantityInStock,
}) => {
  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <img
            height={"150px"}
            src={editingProduct?.image}
            alt=""
            className="col-xl-4 col-lg-4 col-sm-4 col-8"
          />
          <label
            htmlFor=""
            style={{ padding: "30px" }}
            className="col-xl-7 col-lg-7 col-sm-7 col-12"
          >
            {editingProduct?.name}
          </label>
        </div>
        <div className="row">
          <Form.Item
            label=""
            name="quantity"
            rules={[{ message: "Please input your quantity!" }]}
          >
            <Controller
              name="quantity"
              control={control}
              defaultValue={editingProduct?.quantity || 1}
              render={({ field }) => (
                <div className="product_count1 flex-1">
                  <label className="quantity p-2">Số Lượng:</label>
                  <div className="quantity-input">
                    <span>
                      <button onClick={decrementQuantity} type="button">
                        -
                      </button>
                    </span>
                    <input
                      min="1"
                      max={quantityInStock} // Đặt giá trị tối đa là số lượng còn lại
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleQuantityChange(e);
                      }}
                      className="form-control"
                    />
                    <span>
                      <button onClick={incrementQuantity} type="button">
                        +
                      </button>
                    </span>
                  </div>
                </div>
              )}
            />
          </Form.Item>
        </div>
        {quantityInStock !== undefined && quantityInStock !== null && (
          <p style={{ color: "red" }}>
            {`Chỉnh sửa số lượng không được vượt quá ${quantityInStock}`}
          </p>
        )}
      </form>
    </Modal>
  );
};

export default EditProductModal;
