import { useState } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom";
import { useAddCommentMutation, useGetProductByIdQuery } from "../../../services/product.service";
import { useGetBrandsQuery } from "../../../services/brand.service";
import { useGetAllProductsDetailQuery } from "../../../services/productDetail.service";
const ProductDetail = () => {
  const { data: brandData } = useGetBrandsQuery();
  const { _id } = useParams();
  const { data: prodetailData } = useGetProductByIdQuery(_id);
  const { handleSubmit, register } = useForm<any>()
  const brandName = brandData?.find(
    (brand: any) => brand._id == prodetailData?.brand_id
  )?.name;
  const { data: productDataDetail } = useGetAllProductsDetailQuery();

  const sizes = productDataDetail?.map((detail) => detail.size) || [];
  const colors = productDataDetail?.map((detail) => detail.color) || [];

  // Sử dụng state để lưu trữ giá trị màu sắc được chọn và tên màu đã chọn
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState(""); // Thêm state cho tên màu

  // Hàm xử lý khi người dùng thay đổi màu sắc
  const handleColorChange = (event: any) => {
    const selectedColor = event.target.value;
    setSelectedColor(selectedColor);

    // Tìm tên màu tương ứng với màu đã chọn
    const selectedColorDetail = productDataDetail?.find(
      (detail) => detail.color === selectedColor
    );
    if (selectedColorDetail) {
      setSelectedColorName(selectedColorDetail.color);
    }
  };
  const { user: id_user }: any = JSON.parse(localStorage.getItem('user')!);
  const [addProduct] = useAddCommentMutation()
  const navigate = useNavigate()
  const onHandleSubmit = ({ content, rate }: any) => {
    const dataCmt = {
      id_product: prodetailData?._id,
      id_user,
      rate,
      content
    }
    addProduct(dataCmt)
    navigate("/")
  }
  return (
    <div>
      <div className="product_image_area">
        <div className="container">
          <div className="row s_product_inner">
            <div className="col-lg-5 offset-lg-1">
              {/* <div className="s_Product_carousel"> */}
              <div className="single-prd-item">
                <img
                  className="img-fluid w-[100px]"
                  src={prodetailData?.images[0]}
                  alt=""
                />
              </div>
              <div className="image-carosell d-flex p-2">
                {prodetailData?.images?.map((item: any) => {
                  return (
                    <div className="single-prd-item col-3 p-2">
                      <img className="img-fluid " src={item} alt="" />
                    </div>
                  );
                })}
              </div>
              {/* </div> */}
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="s_product_text">
                <h3>{prodetailData?.name}</h3>
                {prodetailData?.price_sale == 0 ? (
                  <div className="product-price row">
                    <strong className="col-12">
                      {prodetailData?.price}
                      <span>VND</span>
                    </strong>
                  </div>
                ) : (
                  <div className="product-price row">
                    <strong className="col-12">
                      {prodetailData?.price_sale}
                      <span>VND</span>
                    </strong>
                    <div className="d-flex">
                      <del className="price-del">
                        {prodetailData?.price}
                        <span>VND</span>
                      </del>
                    </div>
                  </div>
                )}

                <ul className="list">
                  <li>
                    <a className="active" href="#">
                      <span>Danh Mục</span> : {brandName}
                    </a>
                  </li>
                  <li>
                    {" "}
                    <i>{prodetailData?.content}</i>
                  </li>
                </ul>
                <p className="description-product">
                  {prodetailData?.description}
                </p>

                <div className="product-detail d-flex">
                  <div className="product-size w-25">
                    <p>Kích Cỡ</p>
                    <select className="product-detail-size" name="" id="">
                      {sizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="product__filter-item w-75">
                    <p>Màu Sắc</p>
                    <select className="product-detail-size" name="" id="">
                      {colors.map((colors, index) => (
                        <option key={index} value={colors}>
                          {colors}
                        </option>
                      ))}
                    </select>
                    {selectedColorName && (
                      <span>Tên màu: {selectedColorName}</span>
                    )}
                  </div>
                </div>
                <div className="product_count">
                  <label className="quantity">Số Lượng:</label>
                  <input type="number" minLength={1} maxLength={999} />
                </div>



                <div className="card_area d-flex align-items-center">
                  <a className="primary-btn" href="#">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-50">
        <h2>Bình luận</h2>
        <form onSubmit={handleSubmit(onHandleSubmit)} className="form-floating">

          <textarea className="form-control"
            {...register("content", { required: true, minLength: 2 })}>
          </textarea>
          <label >Comments</label>
          <select className="form-select w-25" {...register("rate", { required: true })}>
            <option selected>Đánh giá</option>
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </select>
          <button type="submit" className="btn btn-primary">Bình luận</button>
        </form>
      </div>
    </div >
  );
};

export default ProductDetail;
