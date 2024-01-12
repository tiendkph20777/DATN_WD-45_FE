import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVouchers } from "../types/voucher";
const data = JSON.parse(localStorage.getItem("user")!);
const token = data?.accessToKen;

const voucherAPI = createApi({
  reducerPath: "voucher",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
  }),
  endpoints: (builder) => ({
    getVouchers: builder.query<IVouchers[], void>({
      query: () => ({
        url: `/voucher`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getVoucherById: builder.query<IVouchers, number | string>({
      query: (id) => ({
        url: `/voucher/detail/${id}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getVoucherByCode: builder.query<IVouchers, number | string>({
      query: (code) => `/voucher/${code}`,
    }),

    removeVoucher: builder.mutation<IVouchers, number | string>({
      query: (id) => ({
        url: `/voucher/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    addVoucher: builder.mutation<IVouchers, IVouchers>({
      query: (voucher) => ({
        url: `/voucher/add`,
        method: "POST",
        body: voucher,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateVoucher: builder.mutation<IVouchers, IVouchers>({
      query: (voucher) => ({
        url: `/voucher/${voucher._id}/update`,
        method: "PUT",
        body: voucher,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateVoucherStatus: builder.mutation<
      void,
      { id: string; status: boolean }
    >({
      query: ({ id, status }) => ({
        url: `/voucher/${id}/updateStatus/${status}`,
        method: "PUT",
        body: { status },
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetVoucherByIdQuery,
  useGetVoucherByCodeQuery,
  useRemoveVoucherMutation,
  useAddVoucherMutation,
  useUpdateVoucherMutation,
  useUpdateVoucherStatusMutation,
} = voucherAPI;

export default voucherAPI;
