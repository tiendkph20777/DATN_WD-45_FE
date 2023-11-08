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
        createCheckout: builder.mutation<any, Partial<any>>({
            query: checkout => ({
                url: `/checkout/add`,
                method: "POST",
                body: checkout,
            }),
            invalidatesTags: ["Checkout"],
        }),


        fetchCheckout: builder.query<IAuth[], void>({
            query: () => "/checkout",
            providesTags: ["Checkout"]
        }),


    }),
});

export const { useCreateCheckoutMutation, useFetchCheckoutQuery } = checkoutAPI;

export default checkoutAPI;