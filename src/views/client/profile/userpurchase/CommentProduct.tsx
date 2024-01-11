import { useState } from 'react';
import { Button, Upload } from "antd";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useAddCommentMutation } from '../../../../services/comment.service';
import { message as messageApi } from "antd";
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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


    const onHandleSubmit = async ({ content, rate, product_id }: any) => {
        const fileUrls = await SubmitImage();
        const dataCmt = {
            id_product: product_id,
            id_user,
            rate,
            content,
            images: fileUrls
        };
        navigate('/product/' + product_id + '/detail')
        const response: any = await addProduct(dataCmt);

        const successMessage = `Cảm ơn bạn đã đánh giá chúng tôi sẽ cố gắng để tốt lên mỗi ngày 🥰🥰🥰`;
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

        if (response.data) {
            const newComment = response.data; // Assuming the mutation returns the new comment
            setDataSourceToRender(prevData => [newComment, ...prevData]); // Add the new comment to the beginning
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

                <div className="selectdiv">
                    <label>
                        <select {...register("product_id")}>
                            <option selected disabled>Sản phẩm</option>
                            {roleCmt.products.map((item: any) => {
                                return (
                                    <option value={item.product_id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <textarea
                    className="form-control"
                    {...register("content", { required: true, minLength: 2 })}
                ></textarea>

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
                <div className='my-2'>
                    <span>1⭐</span>
                    <input className="form-check-input mx-1" type="radio" value="1" {...register("rate", { required: true })} />
                    <input className="form-check-input mx-1" type="radio" value="2" {...register("rate", { required: true })} />
                    <input className="form-check-input mx-1" type="radio" value="3" {...register("rate", { required: true })} />
                    <input className="form-check-input mx-1" type="radio" value="4" {...register("rate", { required: true })} />
                    <input className="form-check-input mx-1" type="radio" value="5" {...register("rate", { required: true })} />
                    <span>5⭐</span>
                </div>
                <button type="submit" className="w-100 btn btn-primary">
                    Đánh giá
                </button>
            </form>
        </div>
    )
}

export default CommentProduct