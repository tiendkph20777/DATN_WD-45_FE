import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProducts } from "../types/product.service";

const productAPI = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    endpoints: builder => ({
        getProducts: builder.query<IProducts[], void>({
            query: () => `/product`,
        }),
        getProductById: builder.query<IProducts, any>({
            query: (id) => `/product/${id}`
        }),
        removeProduct: builder.mutation<IProducts, number | string>({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE"
            }),
        }),
        addProduct: builder.mutation<void, Partial<IProducts>>({
            query: product => ({
                url: `product/add`,
                method: "POST",
                body: product
            }),
        }),
        updateProduct: builder.mutation<IProducts, IProducts>({
            query: (product) => ({
                url: `/product/${product._id}/update`,
                method: "PUT",
                body: product
            })
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useRemoveProductMutation,
    useAddProductMutation,
    useUpdateProductMutation
} = productAPI;

export default productAPI;
