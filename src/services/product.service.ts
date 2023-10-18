import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../interface/product";

const productAPI = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `api/productdetail`,
      providerTags: ["Product"],
    }),

    getProductById: builder.query<IProduct, number>({
      query: (id: any) => `api/productdetail/${id}`,
      providerTags: ["Product"],
    }),

    removeProducts: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/productdetail/${id}`,
        method: "DELETE",
      }),
    }),

    addProducts: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `api/productdetail/add`,
        method: "POST",
        body: product,
      }),
    }),

    updateProducts: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `api/productdetail/${product.id}/update`,
        method: "PATCH",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useRemoveProductsMutation,
  useAddProductsMutation,
  useUpdateProductsMutation,
} = productAPI;

export const productReducer = productAPI.reducer;

export default productAPI;
