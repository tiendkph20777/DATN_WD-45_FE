import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetProductByIdQuery, useGetProductsQuery } from '../../../services/product.service';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useFetchUserQuery } from '../../../services/user.service';
import { useAddCommentMutation, useFetchCommentQuery } from "../../../services/comment.service";
import { Rate, Space } from "antd";
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
    const { data: prodetailData, isLoading } = useGetProductByIdQuery(_id);
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
    if (isLoading) {
        return <div>
            <div className="right-wrapper">
                <div className="spinnerIconWrapper">
                    <div className="spinnerIcon"></div>
                </div>
                <div className="finished-text">
                    Xin vui lòng chờ một chút 🥰🥰🥰
                </div>
            </div>
        </div>;
    }
    // 
    const desc = ['xấu 😭', 'ổn 😥', 'tạm được 😔', 'đẹp 😊', 'tuyệt vời 🥰'];
    return (
        <div className="mx-auto row">
            <div className='w-60'>
                <div className="">
                    {dataSourceToRender.map((item) => {
                        const nameUser = dataUser?.find((role) => role?._id === item.id_user)?.fullName
                        return (
                            <div className="border p-3 " key={item._id}>
                                <h5>{nameUser}</h5>
                                <div>{item.content}</div>
                                <div className="pt-3"><Rate tooltips={desc} disabled defaultValue={item.rate} /> <span>{desc[item.rate - 1]}</span></div>
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
                    <label className='fs-6  '>Bình luận</label>
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
