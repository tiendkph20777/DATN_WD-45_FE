// <<<<<<< HEAD
// import { useEffect, useState } from 'react';
// import { useGetProductByIdQuery, useGetProductsQuery } from '../../../services/product.service';
// import { useParams } from 'react-router-dom';
// import { useFetchUserQuery } from '../../../services/user.service';
// import { useAddCommentMutation, useFetchCommentQuery } from "../../../services/comment.service";
// import { Rate, message as messageApi } from "antd";
// import { format } from 'date-fns';
// =======
// import { useEffect, useState } from "react";
// import {
//   useGetProductByIdQuery,
//   useGetProductsQuery,
// } from "../../../services/product.service";
// import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useFetchUserQuery } from "../../../services/user.service";
// import {
//   useAddCommentMutation,
//   useFetchCommentQuery,
// } from "../../../services/comment.service";
// import { Rate, message as messageApi } from "antd";
// import { format } from "date-fns";
// import { Button, Upload } from "antd";
// import axios from "axios";
// >>>>>>> 84e34ea4cecd4f0038f2feff1f862723a4ed8dfd

// interface DataType {
//   _id: string;
//   content: string;
//   id_product: string;
//   id_user: string;
//   rate: number;
//   createdAt: string;
//   images: [];
// }

// const CommentProductDetail = () => {
// <<<<<<< HEAD
//     const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
//     const { _id } = useParams();
//     const { isLoading: isLoadingProduct } = useGetProductByIdQuery(_id);
//     const { data: dataCmtt, isLoading: isLoadingComments } = useFetchCommentQuery();
//     const { data: dataPro } = useGetProductsQuery();
//     const { data: dataUser } = useFetchUserQuery();
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const pageSize = 5;
// =======
//   const [dataSourceToRender, setDataSourceToRender] = useState<DataType[]>([]);
//   const { handleSubmit, register, setValue } = useForm<any>();
//   const { _id } = useParams();
//   const { data: prodetailData, isLoading: isLoadingProduct } =
//     useGetProductByIdQuery(_id);
//   const { user: id_user } = JSON.parse(localStorage.getItem("user") || "{}");
//   const [addProduct] = useAddCommentMutation();
//   const { data: dataCmtt, isLoading: isLoadingComments } =
//     useFetchCommentQuery();
//   const { data: dataPro } = useGetProductsQuery();
//   const { data: dataUser } = useFetchUserQuery();
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [fileList, setFileList] = useState<any[]>([]);
//   const pageSize = 5;
// >>>>>>> 84e34ea4cecd4f0038f2feff1f862723a4ed8dfd

//   useEffect(() => {
//     if (dataCmtt && dataPro && dataUser) {
//       const updatedDataSource = dataCmtt
//         .filter((item: any) => item.id_product === _id)
//         .reverse();

// <<<<<<< HEAD
//             const startIndex = (currentPage - 1) * pageSize;
//             const endIndex = startIndex + pageSize;
//             setDataSourceToRender(updatedDataSource.slice(startIndex, endIndex));
//         }
//     }, [dataCmtt, dataPro, dataUser, _id, currentPage]);


//     if (isLoadingProduct || isLoadingComments) {
//         return (
//             <div>
//                 <div className="right-wrapper">
//                     <div className="spinnerIconWrapper">
//                         <div className="spinnerIcon"></div>
//                     </div>
//                     <div className="finished-text">
//                         Xin vui lòng chờ một chút 🥰🥰🥰
//                     </div>
//                 </div>
//             </div>
//         );
// =======
//       const startIndex = (currentPage - 1) * pageSize;
//       const endIndex = startIndex + pageSize;
//       setDataSourceToRender(updatedDataSource.slice(startIndex, endIndex));
// >>>>>>> 84e34ea4cecd4f0038f2feff1f862723a4ed8dfd
//     }
//   }, [dataCmtt, dataPro, dataUser, _id, currentPage]);

//   const SubmitImage = async () => {
//     const uploadPromises = fileList.map(async (file) => {
//       const data = new FormData();
//       const cloud_name = "ddbdu6zip";
//       const upload_preset = "vithoang";
//       data.append("file", file.originFileObj);
//       data.append("upload_preset", upload_preset);
//       data.append("cloud_name", cloud_name);
//       data.append("folder", "portfolio");

//       const takeData = await axios
//         .post(`https://api.cloudinary.com/v1_1/ddbdu6zip/image/upload`, data)
//         .then((data: any) => data);

//       return takeData.data.secure_url;
//     });

//     return Promise.all(uploadPromises);
//   };

//   const onHandleSubmit = async ({ content, rate }: any) => {
//     const fileUrls = await SubmitImage();

//     const dataCmt = {
//       id_product: prodetailData?._id,
//       id_user,
//       rate,
//       content,
//       images: fileUrls,
//     };

//     // Call the mutation
//     const response = await addProduct(dataCmt);

//     const successMessage = `Cảm ơn bạn đã bình luận chúng tôi sẽ cố gắng để tốt lên mỗi ngày 🥰🥰🥰`;
//     messageApi.success({
//       type: "success",
//       content: successMessage,
//       className: "custom-class",
//       style: {
//         margin: "10px",
//         fontSize: "20px",
//         lineHeight: "30px",
//       },
//     });

//     // If the mutation is successful, update the local state with the new comment
//     if (response.data) {
//       const newComment = response.data; // Assuming the mutation returns the new comment
//       setDataSourceToRender((prevData) => [newComment, ...prevData]); // Add the new comment to the beginning

//       // Clear the form values
//       setValue("content", "");
//       setValue("rate", "");
//     }
//   };

//   const onFileChange = ({ fileList }: any) => {
//     setFileList(fileList);
//   };

//   if (isLoadingProduct || isLoadingComments) {
//     return (
// <<<<<<< HEAD
//         <div className="mx-auto row">
//             <div className='col-11'>
//                 {dataSourceToRender.length === 0 ? (
//                     <p>Không có bình luận nào cả !!!</p>
//                 ) : (
//                     <div>
//                         {dataSourceToRender.map((item) => {
//                             const nameUser = dataUser?.find((role) => role?._id === item.id_user)?.fullName;
//                             const imgUser = dataUser?.find((role) => role?._id === item.id_user)?.image;
//                             return (
//                                 <div className="border-bottom mb-2 p-3 row " key={item._id}>
//                                     <div className='col-1'>
//                                         <img src={imgUser} alt="Lỗi ảnh" width={50} height={50} style={{ borderRadius: "50%", marginRight: "50px" }} />
//                                     </div>
//                                     <div className='col-11'>
//                                         <h5>{nameUser}</h5>
//                                         <div>
//                                             <Rate style={{ fontSize: "15px" }} disabled defaultValue={item.rate} />
//                                         </div>
//                                         <div>{format(new Date(item.createdAt), 'dd/MM/yyyy hh:mm')}</div>
//                                         <div style={{ margin: "10px 0" }}>{item.content}</div>
//                                         <div style={{ margin: "15px 0" }}>
//                                             {item.images.map((image) => {
//                                                 return (
//                                                     <img src={image} alt="Lỗi ảnh" width={70} height={70} style={{ marginRight: "5px" }} />
//                                                 )
//                                             })}
//                                         </div>
//                                     </div>

//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>

// =======
//       <div>
//         <div className="right-wrapper">
//           <div className="spinnerIconWrapper">
//             <div className="spinnerIcon"></div>
//           </div>
//           <div className="finished-text">Xin vui lòng chờ một chút 🥰🥰🥰</div>
// >>>>>>> 84e34ea4cecd4f0038f2feff1f862723a4ed8dfd
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="mx-auto row">
//       <div className="col-11">
//         {dataSourceToRender.length === 0 ? (
//           <p>Không có bình luận nào cả !!!</p>
//         ) : (
//           <div>
//             {dataSourceToRender.map((item) => {
//               const nameUser = dataUser?.find(
//                 (role) => role?._id === item.id_user
//               )?.fullName;
//               const imgUser = dataUser?.find(
//                 (role) => role?._id === item.id_user
//               )?.image;
//               return (
//                 <div className="border-bottom mb-2 p-3 row " key={item._id}>
//                   <div className="col-1">
//                     <img
//                       src={imgUser}
//                       alt="Lỗi ảnh"
//                       width={50}
//                       height={50}
//                       style={{ borderRadius: "50%", marginRight: "50px" }}
//                     />
//                   </div>
//                   <div className="col-11">
//                     <h5>{nameUser}</h5>
//                     <div>
//                       <Rate
//                         style={{ fontSize: "15px" }}
//                         disabled
//                         defaultValue={item.rate}
//                       />
//                     </div>
//                     <div>
//                       {format(new Date(item.createdAt), "dd/MM/yyyy hh:mm")}
//                     </div>
//                     <div style={{ margin: "10px 0" }}>{item.content}</div>
//                     <div style={{ margin: "15px 0" }}>
//                       {item.images.map((image) => {
//                         return (
//                           <img
//                             src={image}
//                             alt="Lỗi ảnh"
//                             width={70}
//                             height={70}
//                             style={{ marginRight: "5px" }}
//                           />
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//       <div className="col-11 my-5">
//         <form onSubmit={handleSubmit(onHandleSubmit)} className="form-floating">
//           <textarea
//             className="form-control"
//             {...register("content", { required: true, minLength: 2 })}
//           ></textarea>
//           <label className="fs-6  ">Bình luận</label>
//           <div className="my-2">
//             <span>xấu 😭 </span>
//             <input
//               className="form-check-input mx-1"
//               type="radio"
//               value="1"
//               {...register("rate", { required: true })}
//             />
//             <input
//               className="form-check-input mx-1"
//               type="radio"
//               value="2"
//               {...register("rate", { required: true })}
//             />
//             <input
//               className="form-check-input mx-1"
//               type="radio"
//               value="3"
//               {...register("rate", { required: true })}
//             />
//             <input
//               className="form-check-input mx-1"
//               type="radio"
//               value="4"
//               {...register("rate", { required: true })}
//             />
//             <input
//               className="form-check-input mx-1"
//               type="radio"
//               value="5"
//               {...register("rate", { required: true })}
//             />
//             <span> tuyệt vời 🥰 </span>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="productImage" className="form-label">
//               Ảnh sản phẩm
//             </label>
//             <Upload
//               customRequest={() => {}}
//               onChange={onFileChange}
//               fileList={fileList}
//               listType="picture"
//               beforeUpload={() => false}
//             >
//               <Button>Chọn ảnh</Button>
//             </Upload>
//           </div>
//           <button type="submit" className="w-100 btn btn-primary">
//             Bình luận
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommentProductDetail;
