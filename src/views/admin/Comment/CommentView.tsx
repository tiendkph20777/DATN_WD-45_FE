import { useFetchCommentQuery, useAddCommentMutation, } from "../../../services/product.service";
import { useForm } from 'react-hook-form'
const CommentView = () => {
    const { data: dataCmt } = useFetchCommentQuery();
    const { handleSubmit, register } = useForm<any>()
    const onSubmit = (data: any) => {
        console.log(data)
        useAddCommentMutation(data)
    }
    return (
        <div className="">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body mt-5">
                            <h5 className="card-title mb-4">Bình Luận</h5>
                            <div className="table-responsive">
                                <table className="table text-nowrap mb-0 align-middle table-hover">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th className="border-bottom-0">
                                                <div className="mb-0">Id</div>
                                            </th>
                                            <th className="border-bottom-0">
                                                <div className="mb-0">Người dùng</div>
                                            </th>
                                            <th className="border-bottom-0">
                                                <div className="mb-0">Bình luận</div>
                                            </th>
                                            <th className="border-bottom-0">
                                                <div className="mb-0">Đánh giá</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataCmt?.map((item: any, index: any) => {
                                            return (
                                                <tr key={item._id}>
                                                    <td className="border-bottom-0">
                                                        <div className=" mb-0">{index + 1}</div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className=" mb-1">{item.id_user}</div>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <div className=" mb-1">{item.content}</div>
                                                    </td>
                                                    <td className="border-bottom-0 d-flex align-items-center">
                                                        <div className=" mb-1">{item.rate}</div>
                                                        <div className="d-flex text-left" role="group">
                                                            <button className="col btn w-100 btn-danger m-1"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#confirmDeleteModal"
                                                                value="">Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="form-floating" >
                            <textarea className="form-control"
                                placeholder="Leave a comment here"
                                {...register("content", { required: true, minLength: 10 })} />
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Price"
                                {...register("rate", { required: true, maxLength: 10 })}
                            />

                            <label {...register("id_product", { value: "651610aa3279db7882ab8e5a" })}>Comments</label>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                {...register("id_user", { value: "6514af515a3dc5d11ebaea17" })}>
                                Binh Luan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CommentView