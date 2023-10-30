import React from 'react'
import { useAddCommentMutation, useGetProductByIdQuery } from '../../../services/product.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const CommentProductDetail = () => {
    const { handleSubmit, register } = useForm<any>();
    const { _id } = useParams();
    const { data: prodetailData } = useGetProductByIdQuery(_id);
    const { user: id_user } = JSON.parse(localStorage.getItem("user") || "{}");
    const [addProduct] = useAddCommentMutation();
    const navigate = useNavigate();

    const onHandleSubmit = ({ content, rate }: any) => {
        const dataCmt = {
            id_product: prodetailData?._id,
            id_user,
            rate,
            content,
        };
        addProduct(dataCmt);
        navigate("/");
    };
    return (
        <div>
            <div className="mx-auto w-50">
                <h2>Bình luận</h2>
                <form onSubmit={handleSubmit(onHandleSubmit)} className="form-floating">
                    <textarea
                        className="form-control"
                        {...register("content", { required: true, minLength: 2 })}
                    ></textarea>
                    <label>Comments</label>
                    <select
                        className="form-select w-25"
                        {...register("rate", { required: true })}
                    >
                        <option value="0" selected>
                            Đánh giá
                        </option>
                        <option value="1">1 sao</option>
                        <option value="2">2 sao</option>
                        <option value="3">3 sao</option>
                        <option value="4">4 sao</option>
                        <option value="5">5 sao</option>
                    </select>
                    <button type="submit" className="btn btn-primary">
                        Bình luận
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CommentProductDetail
