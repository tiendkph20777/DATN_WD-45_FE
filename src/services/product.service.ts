import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProducts } from "../types/product.service";

const productAPI = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: builder => ({
        fetchProduct: builder.query<IProducts[], void>({
            query: () => "/products",
        }),
        getProduct: builder.query<{ product: IProducts | null }, number>({
            query: id => ({
                url: `/products/${id}`,
                method: "GET",
            }),
        }),
        removeProduct: builder.mutation<void, number>({
            query: id => ({
                url: `/products/${id}`,
                method: "DELETE"
            }),
        }),
        addProduct: builder.mutation<void, Partial<IProducts>>({
            query: product => ({
                url: `products`,
                method: "POST",
                body: product
            }),
        }),
        updateProduct: builder.mutation<void, IProducts>({
            query: product => ({
                url: `products/${product.id}`,
                method: "PUT",
                body: product
            }),
        }),
    }),
});

export const {
    useFetchProductQuery,
    useGetProductQuery,
    useRemoveProductMutation,
    useAddProductMutation,
    useUpdateProductMutation
} = productAPI;

export default productAPI;
