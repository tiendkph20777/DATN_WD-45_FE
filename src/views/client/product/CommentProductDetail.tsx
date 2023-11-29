import React, { useEffect, useState } from 'react';
import { useGetProductByIdQuery, useGetProductsQuery } from '../../../services/product.service';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFetchUserQuery } from '../../../services/user.service';
import { useAddCommentMutation, useFetchCommentQuery } from "../../../services/comment.service";
import { Rate, message as messageApi, Pagination } from "antd";

interface DataType {
    _id: string;
    content: string;
    id_product: string;
    id_user: string;
    rate: number;
}

const CommentProductDetail = () => {
    const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
    const { handleSubmit, register, setValue } = useForm<any>();
    const { _id } = useParams();
    const { data: prodetailData, isLoading: isLoadingProduct } = useGetProductByIdQuery(_id);
    const { user: id_user } = JSON.parse(localStorage.getItem("user") || "{}");
    const [addProduct] = useAddCommentMutation();
    const { data: dataCmtt, isLoading: isLoadingComments } = useFetchCommentQuery();
    const { data: dataPro } = useGetProductsQuery();
    const { data: dataUser } = useFetchUserQuery();
    console.log(dataSourceToRender)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 5; // Adjust the number as per your requirement

    useEffect(() => {
        if (dataCmtt && dataPro && dataUser) {
            const updatedDataSource = dataCmtt
                .filter((item: any) => item.id_product === _id)
                .reverse(); // Reverse the order

            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setDataSourceToRender(updatedDataSource.slice(startIndex, endIndex));
        }
    }, [dataCmtt, dataPro, dataUser, _id, currentPage]);

    const onHandleSubmit = async ({ content, rate }: any) => {
        const dataCmt = {
            id_product: prodetailData?._id,
            id_user,
            rate,
            content,
        };

        // Call the mutation
        const response = await addProduct(dataCmt);

        const successMessage = `Cảm ơn bạn đã bình luận chúng tôi sẽ cố gắng để tốt lên mỗi ngày 🥰🥰🥰`;
        messageApi.success({
            type: "success",
            content: successMessage,
            className: "custom-class",
            style: {
                margin: "10px",
                fontSize: "20px",
                lineHeight: "30px",
            },
        });

        // If the mutation is successful, update the local state with the new comment
        if (response.data) {
            const newComment = response.data; // Assuming the mutation returns the new comment
            setDataSourceToRender(prevData => [newComment, ...prevData]); // Add the new comment to the beginning

            // Clear the form values
            setValue("content", "");
            setValue("rate", "");
        }
    };

    if (isLoadingProduct || isLoadingComments) {
        return (
            <div>
                <div className="right-wrapper">
                    <div className="spinnerIconWrapper">
                        <div className="spinnerIcon"></div>
                    </div>
                    <div className="finished-text">
                        Xin vui lòng chờ một chút 🥰🥰🥰
                    </div>
                </div>
            </div>
        );
    }

    const desc = ['xấu 😭', 'ổn 😥', 'tạm được 😔', 'đẹp 😊', 'tuyệt vời 🥰'];

    return (
        <div className="mx-auto row">
            <div className='w-60'>
                {dataSourceToRender.length === 0 ? (
                    <p>Không có bình luận nào cả !!!</p>
                ) : (
                    <div>
                        {dataSourceToRender.map((item) => {
                            const nameUser = dataUser?.find((role) => role?._id === item.id_user)?.fullName;
                            return (
                                <div className="border p-3 " key={item._id}>
                                    {/* <img src={user?.image} alt="Lỗi ảnh" width={40} height={40} style={{ borderRadius: "50%", marginRight: "50px" }} /> */}

                                    <h5>{nameUser}</h5>
                                    <div>{item.content}</div>
                                    <div className="pt-3">
                                        <Rate tooltips={desc} disabled defaultValue={item.rate} /> <span>{desc[item.rate - 1]}</span>
                                    </div>
                                </div>
                            );
                        })}
                        {/* <Pagination
                            current={currentPage}
                            onChange={(page) => {
                                setCurrentPage(page);
                                // Clear the form values when changing the page
                                setValue("content", "");
                                setValue("rate", "");
                            }}
                            total={dataSourceToRender.length}
                            pageSize={pageSize}
                            disabled={isLoadingComments}
                        /> */}
                    </div>
                )}
            </div>
            <div className='col'>
                <form onSubmit={handleSubmit(onHandleSubmit)} className="form-floating">
                    <textarea
                        className="form-control"
                        {...register("content", { required: true, minLength: 2 })}
                    ></textarea>
                    <label className='fs-6  '>Bình luận</label>
                    <div className='my-2'>
                        <span>xấu 😭 </span>
                        <input className="form-check-input mx-1" type="radio" value="1" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="2" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="3" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="4" {...register("rate", { required: true })} />
                        <input className="form-check-input mx-1" type="radio" value="5" {...register("rate", { required: true })} />
                        <span> tuyệt vời 🥰 </span>
                    </div>

                    <button type="submit" className="w-100 btn btn-primary">
                        Bình luận
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentProductDetail;
