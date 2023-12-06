import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../types/user";

const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const checkoutAPI = createApi({
    reducerPath: "checkout", // 
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
    }),
    tagTypes: ["Checkout"],
    endpoints: (builder) => ({
        createCheckout: builder.mutation<void, Partial<any>>({
            query: (cart) => ({
                url: `/checkout/add`,
                method: "POST",
                body: cart,
            }),
            invalidatesTags: ["Checkout"],
        }),

        fetchCheckout: builder.query<any[], void>({
            query: () => "/checkout",
            providesTags: ["Checkout"]
        }),

        fetchOneCheckout: builder.query<any, string | number>({
            query: (_id) => ({
                url: `/checkout/${_id}`,
                method: "GET",
            }),
            providesTags: ["Checkout"]
        }),

        removeCheckout: builder.mutation<void, string | number>({
            query: (_id) => ({
                url: `/checkout/${_id}`,
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Checkout"],
        }),

        updateCheckout: builder.mutation<void, any>({
            query: (cart) => ({
                url: `/checkout/${cart._id}/update`,
                method: 'PUT',
                body: cart,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Checkout"],
        }),
        reductionProduct: builder.mutation<void, any>({
            query: (item) => ({
                url: `/reductionProduct/${item._id}/${item.quantity}`,
                method: 'GET',
            }),
            invalidatesTags: ["Checkout"],
        }),
        increaseProduct: builder.mutation<void, any>({
            query: (item) => ({
                url: `/increaseProduct/${item._id}/${item.quantity}`,
                method: 'GET',
            }),
            invalidatesTags: ["Checkout"],
        }),
        // xóa số lượng
        removeCartId: builder.mutation<void, any>({
            query: (item) => ({
                url: `/checkout/${item.cart_id}/${item._id}`,
                method: 'GET',
            }),
            invalidatesTags: ["Checkout"],
        }),
    }),
});

export const { useCreateCheckoutMutation, useFetchCheckoutQuery, useFetchOneCheckoutQuery, useRemoveCheckoutMutation, useUpdateCheckoutMutation, useReductionProductMutation, useIncreaseProductMutation, useRemoveCartIdMutation } = checkoutAPI;


export default checkoutAPI;