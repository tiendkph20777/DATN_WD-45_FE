import { useEffect, useState } from 'react';
import { Button, Upload } from "antd";
import { useGetProductByIdQuery } from '../../../../services/product.service';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useAddCommentMutation } from '../../../../services/comment.service';
import { Rate, message as messageApi } from "antd";
interface DataType {
    _id: string;
    content: string;
    id_product: string;
    id_user: string;
    rate: number;
    createdAt: string;
    images: [];
}
type roleCmtType = {
    products: [];
}
const CommentProduct: React.FC<{ roleCmt: roleCmtType }> = ({ roleCmt }) => {
    // console.log(roleCmt.products[0]._id)
    const { handleSubmit, register, setValue } = useForm<any>();
    const { user: id_user } = JSON.parse(localStorage.getItem("user") || "{}");
    const [fileList, setFileList] = useState<any[]>([]);
    const [addProduct] = useAddCommentMutation();
    const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);

    const SubmitImage = async () => {
        const uploadPromises = fileList.map(async (file) => {
            const data = new FormData();
            const cloud_name = "ddbdu6zip";
            const upload_preset = "vithoang";
            data.append("file", file.originFileObj);
            data.append("upload_preset", upload_preset);
            data.append("cloud_name", cloud_name);
            data.append("folder", "portfolio");

            const takeData = await axios
                .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
                .then((data: any) => data);

            return takeData.data.secure_url;
        });

        return Promise.all(uploadPromises);
    };


    const onHandleSubmit = async ({ content, rate }: any) => {
        const fileUrls = await SubmitImage();

        const dataCmt = {
            // id_product: prodetailData?._id,
            // id_product: roleCmt.products[0]._id,
            id_user,
            rate,
            content,
            images: fileUrls
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

    const onFileChange = ({ fileList }: any) => {
        setFileList(fileList);
    };

    return (
        <div className='col-11 my-5'>
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
                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">
                        Ảnh sản phẩm
                    </label>
                    <Upload
                        customRequest={() => { }}
                        onChange={onFileChange}
                        fileList={fileList}
                        listType="picture"
                        beforeUpload={() => false}
                    >
                        <Button>Chọn ảnh</Button>
                    </Upload>
                </div>
                <button type="submit" className="w-100 btn btn-primary">
                    Bình luận
                </button>
            </form>
        </div>
    )
}

export default CommentProduct