import React, { useState } from "react";
import { useAddProductMutation } from "../../../services/product.service";
import {
  Button,
  Form,
  InputNumber,
  Select,
  Space,
  Input,
  notification,
} from "antd";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { IProducts } from "../../../types/product.service";
import axios from "axios";
import { useNavigate } from "react-router";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProductAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [addProduct] = useAddProductMutation();
  const [images, setImage] = useState("");
  // const [messageApi, contextHolder] = message.useMessage();
  const { data: categories } = useGetBrandsQuery();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const SubmitImage = async () => {
    const data = new FormData();
    const cloud_name = "ddbdu6zip";
    const upload_preset = "vithoang";
    data.append("file", images);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);
    data.append("folder", "portfolio");
    const takeData = await axios
      .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
      .then((data: any) => data);
    return takeData.data.secure_url;
  };

  const onFinish = async (product: IProducts) => {
    product.images = await SubmitImage();
    addProduct(product)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Success",
          description: "Thêm Sản Phẩm Thành Công!",
        });
        navigate("/admin/product");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  // Preview image
  const inputFile: any = document.getElementById("file-input");
  const previewImage: any = document.getElementById("preview-image");

  inputFile?.addEventListener("change", function () {
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader?.addEventListener("load", function () {
      previewImage.src = reader.result;
    });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      previewImage.src = "";
    }
  });
  const validateMessages = {
    required: "Không được bỏ trống!",
    types: {
      number: "Phải nhập vào là một số!",
    },
    number: {
      range: "Không là số âm",
    },
  };
  const handleReset = () => {
    form.resetFields(); // Đặt lại tất cả các trường trong form
    setImage(""); // Đặt lại trạng thái của ảnh
  };
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-semibold mb-4">Thêm Sản Phẩm</h5>
              <Form action="" method="post" onFinish={onFinish}>
                <div class="mb-3">
                  <label for="productCategory" class="form-label">
                    Thương Hiệu
                  </label>
                  <select
                    id="productCategory"
                    name="brand_id"
                    class="form-select"
                    required
                  >
                    <option disabled selected>
                      [Chọn thương hiệu]
                    </option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="mb-3">
                  <label for="productName" class="form-label">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    id="productName"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="productPrice" class="form-label">
                    Giá niêm yết
                  </label>
                  <input
                    type="number"
                    name="price"
                    class="form-control"
                    id="productPrice"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="productSalePrice" class="form-label">
                    Giá bán
                  </label>
                  <input
                    type="number"
                    name="price_sale"
                    class="form-control"
                    id="productSalePrice"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="productImage" class="form-label">
                    Ảnh sản phẩm
                  </label>
                  <input
                    type="file"
                    name="images"
                    class="form-control"
                    id="productImage"
                  />
                </div>
                <div class="mb-3">
                  <label for="productDescription" class="form-label">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    name="description"
                    id="productDescription"
                    cols="30"
                    rows="5"
                    class="w-100 form-control p-2"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="productContent" class="form-label">
                    Nội dung sản phẩm
                  </label>
                  <textarea
                    name="content"
                    id="productContent"
                    cols="30"
                    rows="5"
                    class="w-100 form-control p-2"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <button type="submit" class="btn btn-primary">
                    Thêm
                  </button>
                  <button
                    type="reset"
                    class="btn btn-secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductAdd;
