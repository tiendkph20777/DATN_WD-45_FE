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

        fetchCheckout: builder.query<IAuth[], void>({
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

    }),
});

export const { useCreateCheckoutMutation, useFetchCheckoutQuery, useFetchOneCheckoutQuery, useRemoveCheckoutMutation, useUpdateCheckoutMutation } = checkoutAPI;


export default checkoutAPI;