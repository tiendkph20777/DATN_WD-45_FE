import { useEffect, useState } from "react";
import {
    useGetProductByIdQuery,
    useGetProductsQuery,
} from "../../../services/product.service";
import { useParams } from "react-router-dom";
import { useFetchUserQuery } from "../../../services/user.service";
import {
    useFetchCommentQuery,
} from "../../../services/comment.service";
import { Rate} from "antd";
import { format } from "date-fns";

interface DataType {
    _id: string;
    content: string;
    id_product: string;
    id_user: string;
    rate: number;
    createdAt: string;
    images: [];
}

const CommentProductDetail = () => {

    const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
    const { _id } = useParams();
    const { isLoading: isLoadingProduct } =
        useGetProductByIdQuery(_id);
    const { data: dataCmtt, isLoading: isLoadingComments } =
        useFetchCommentQuery();
    const { data: dataPro } = useGetProductsQuery();
    const { data: dataUser } = useFetchUserQuery();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 5;

    useEffect(() => {
        if (dataCmtt && dataPro && dataUser) {
            const updatedDataSource = dataCmtt
                .filter((item: any) => item.id_product === _id)
                .reverse();
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setDataSourceToRender(updatedDataSource.slice(startIndex, endIndex));
        }
    }, [dataCmtt, dataPro, dataUser, _id, currentPage]);

    if (isLoadingProduct || isLoadingComments) {
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
    return (
        <div className="mx-auto row">
            <div className="col-11">
                {dataSourceToRender.length === 0 ? (
                    <p>Không có bình luận nào cả !!!</p>
                ) : (
                    <div>
                        {dataSourceToRender.map((item) => {
                            const nameUser = dataUser?.find(
                                (role) => role?._id === item.id_user
                            )?.fullName;
                            const imgUser = dataUser?.find(
                                (role) => role?._id === item.id_user
                            )?.image;
                            return (
                                <div className="border-bottom mb-2 p-3 row " key={item._id}>
                                    <div className="col-1">
                                        <img
                                            src={imgUser}
                                            alt="Lỗi ảnh"
                                            width={50}
                                            height={50}
                                            style={{ borderRadius: "50%", marginRight: "50px" }}
                                        />
                                    </div>
                                    <div className="col-11">
                                        <h5>{nameUser}</h5>
                                        <div>
                                            <Rate
                                                style={{ fontSize: "15px" }}
                                                disabled
                                                defaultValue={item.rate}
                                            />
                                        </div>
                                        <div>
                                            {format(new Date(item.createdAt), "dd/MM/yyyy hh:mm")}
                                        </div>
                                        <div style={{ margin: "10px 0" }}>{item.content}</div>
                                        <div style={{ margin: "15px 0" }}>
                                            {item.images.map((image) => {
                                                return (
                                                    <img
                                                        src={image}
                                                        alt="Lỗi ảnh"
                                                        width={70}
                                                        height={70}
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentProductDetail;
