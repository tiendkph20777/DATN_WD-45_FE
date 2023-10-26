import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProductDetail } from "../types/product";

const productAPIDetall = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["ProductDetail"],
  endpoints: (builder) => ({
    getAllProductsDetail: builder.query<IProductDetail[], void>({
      query: () => `api/productdetail`,
      providerTags: ["ProductDetail"],
    }),

    getProductDetail: builder.query<IProduct[], void>({
      query: () => `api/product`,
      providerTags: ["ProductDetail"],
    }),
    getProductDetailById: builder.query<IProductDetail, number | string>({
      query: (id: any) => `api/productdetail/${id}/detail`,
      providerTags: ["ProductDetail"],
    }),

    removeProductsDetail: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/productdetail/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductDetail"],
    }),

    addProductsDetail: builder.mutation<IProductDetail, IProductDetail>({
      query: (product) => ({
        url: `api/productdetail/add`,
        method: "POST",
        body: product,
      }),
    }),

    updateProductsDetail: builder.mutation<IProductDetail, IProductDetail>({
      query: (product) => ({
        url: `api/productdetail/${product._id}/detail/update`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["ProductDetail"],
    }),
  }),
});

export const {
  useGetAllProductsDetailQuery,
  useGetProductDetailByIdQuery,
  useRemoveProductsDetailMutation,
  useAddProductsDetailMutation,
  useUpdateProductsDetailMutation,
  useGetProductDetailQuery,
} = productAPIDetall;
export const productReducer = productAPIDetall.reducer;
export default productAPIDetall;
