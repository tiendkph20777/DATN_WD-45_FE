import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPayment } from "../types/payment.service";

const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const paymentAPI = createApi({
    reducerPath: "payment",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/"
    }),
    tagTypes: ["Payment"],
    endpoints: builder => ({
        getPayment: builder.query<IPayment[], void>({
            query: () => `/payment`,
        }),
        getPaymentById: builder.query<IPayment, number | string>({
            query: (id) => `/payment/${id}`,
        }),
        removePayment: builder.mutation<IPayment, number | string>({
            query: (id) => ({
                url: `/payment/${id}`,
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
        }),
        addPayment: builder.mutation<IPayment, IPayment>({
            query: (payment) => ({
                url: `/payment/add`,
                method: "POST",
                body: payment,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Payment"],
        }),
        updatePayment: builder.mutation<IPayment, IPayment>({
            query: (payment) => ({
                url: `/payment/${payment._id}/update`,
                method: "PUT",
                body: payment,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Payment"],
        }),

    }),
});

export const {
    useGetPaymentQuery,
    useGetPaymentByIdQuery,
    useRemovePaymentMutation,
    useAddPaymentMutation,
    useUpdatePaymentMutation,
} = paymentAPI;

export default paymentAPI;
