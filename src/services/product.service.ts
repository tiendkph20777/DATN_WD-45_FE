import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProducts } from "../types/product.service";
const data = JSON.parse(localStorage.getItem("user")!);
const token = data?.accessToKen;

const productAPI = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getProducts: builder.query<IProducts[], void>({
      query: () => `/product`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query<IProducts, any>({
      query: (id) => `/product/${id}`,
      providesTags: ["Product"],

    }),
    removeProduct: builder.mutation<IProducts, number | string>({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    addProduct: builder.mutation<void, Partial<IProducts>>({
      query: (product) => ({
        url: `product/add`,
        method: "POST",
        body: product,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<IProducts, IProducts>({
      query: (product) => ({
        url: `/product/${product._id}/update`,
        method: "PUT",
        body: product,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    // fetchComment: builder.query<any, void>({
    //     query: () => "/comment",
    // }),
    // getComment: builder.query<{ product: any | null }, number>({
    //     query: id => ({
    //         url: `/comment/${id}`,
    //         method: "GET",
    //     }),
    // }),
    // removeComment: builder.mutation<void, any>({
    //     query: ({ id }) => {
    //         return {
    //             url: `/comment/${id}`,
    //             method: "DELETE",
    //             headers: {
    //                 "content-type": "application/json",
    //                 'authorization': `Bearer ${token}`
    //             }
    //         }
    //     }
    // }),
    // addComment: builder.mutation({
    //     query: (data) => {
    //         console.log(data)
    //         return {
    //             url: `/comment/add`,
    //             method: "POST",
    //             body: data,
    //             headers: {
    //                 "content-type": "application/json",
    //                 'authorization': `Bearer ${token}`
    //             }
    //         }
    //     },
    // }),
    // updateComment: builder.mutation<void, any>({
    //     query: comment => ({
    //         url: `/comment/${comment.id}`,
    //         method: "PUT",
    //         body: comment,

    //     }),
    // }),
    // getUser: builder.query<{ product: any | null }, string>({
    //     query: id => ({
    //         url: `/user/${id}`,
    //         method: "GET",
    //     }),
    // }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useRemoveProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  // useFetchCommentQuery,
  // useGetCommentQuery,
  // useAddCommentMutation,
  // useRemoveCommentMutation,
  // useUpdateCommentMutation,
  // useGetUserQuery
} = productAPI;

export default productAPI;
