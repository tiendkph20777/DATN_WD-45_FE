import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../types/user";

const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const cartAPI = createApi({
    reducerPath: "auth", // 
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
    }),
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        createCart: builder.mutation<void, Partial<any>>({
            query: (cart) => ({
                url: `/cart/add/${cart.productDetailId}/${cart.user_id}`,
                method: "POST",
                body: cart,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Cart"],
        }),
        fetchCart: builder.query<IAuth[], void>({
            query: () => "/cart/cart-detail",
            providesTags: ["Cart"]
        }),
        fetchOneCart: builder.query<any, string | number>({
            query: (_id) => ({
                url: `/cart/${_id}`,
                method: "GET",
            }),
            providesTags: ["Cart"]
        }),
        // removeCart: builder.mutation<void, string | number>({
        //     query: (_id) => ({
        //         url: `/Cart/${_id}`,
        //         method: "DELETE",
        //         headers: {
        //             "content-type": "application/json",
        //             'authorization': `Bearer ${token}`
        //         }
        //     }),
        //     invalidatesTags: ["Cart"],
        // }),
        // updateCart: builder.mutation<void, any>({
        //     query: (Cart) => ({
        //         url: `/Cart/${Cart._id}/update`,
        //         method: 'PUT',
        //         body: Cart,
        //         headers: {
        //             "content-type": "application/json",
        //             'authorization': `Bearer ${token}`
        //         }
        //     }),
        //     invalidatesTags: ["Cart"],
        // }),
    }),
});

export const { useCreateCartMutation, useFetchCartQuery, useFetchOneCartQuery } = cartAPI;

export default cartAPI;
