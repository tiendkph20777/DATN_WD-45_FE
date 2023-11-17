import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetProductByIdQuery, useGetProductsQuery } from '../../../services/product.service';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useFetchUserQuery } from '../../../services/user.service';
import { useAddCommentMutation, useFetchCommentQuery } from "../../../services/comment.service";
interface DataType {
    _id: string;
    content: string;
    id_product: string;
    id_user: string;
    rate: number;
}
const CommentProductDetail = () => {
    const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
    const { handleSubmit, register } = useForm<any>();
    const { _id } = useParams();
    const { data: prodetailData } = useGetProductByIdQuery(_id);
    const { user: id_user } = JSON.parse(localStorage.getItem("user") || "{}");
    const [addProduct] = useAddCommentMutation();
    const { data: dataCmtt } = useFetchCommentQuery();
    const { data: dataPro } = useGetProductsQuery();
    const { data: dataUser } = useFetchUserQuery();
    useEffect(() => {
        if (dataCmtt && dataPro && dataUser) {
            const updatedDataSource = dataCmtt.filter((item: any) => item.id_product == _id)
            setDataSourceToRender(updatedDataSource);
        }
    }, [dataCmtt && dataPro && dataUser]);

    const onHandleSubmit = ({ content, rate }: any) => {
        const dataCmt = {
            id_product: prodetailData?._id,
            id_user,
            rate,
            content,
        };
        addProduct(dataCmt);
        window.location.reload();
    };

    return (
        <div className="mx-auto w-70 row h-50 my-5">
            <h3>XEM ĐÁNH GIÁ</h3>
            <div className='w-50'>
                <div className="scroll">
                    {dataSourceToRender.map((item) => {
                        const nameUser = dataUser?.find((role) => role?._id === item.id_user)?.fullName
                        return (
                            <div className="border p-3">
                                <h5>{nameUser}</h5>
                                <div>{item.content}</div>
                                <div>{item.rate}⭐</div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className='col'>
                <form onSubmit={handleSubmit(onHandleSubmit)} className="form-floating">
                    <textarea
                        className="form-control"
                        {...register("content", { required: true, minLength: 2 })}
                    ></textarea>
                    <label className='fs-6'>Đánh giá</label>
                    <div className='my-2'>
                        <span>Xấu</span>
                        <input className="form-check-input mx-1" type="radio" value="1" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="2" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="3" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="4" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="5" {...register("rate", { required: true })} />
                        <span>Tốt</span>
                    </div>

                    <button type="submit" className="w-100 btn btn-primary">
                        Bình luận
                    </button>
                </form>
            </div>
        </div >
    )
}

export default CommentProductDetail
