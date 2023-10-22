import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBrands } from "../types/brand.service";

const brandAPI = createApi({
    reducerPath: "brand",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/"
    }),
    endpoints: builder => ({
        getBrands: builder.query<IBrands[], void>({
            query: () => `/brand`,
        }),
        getBrandById: builder.query<IBrands, number | string>({
            query: (id) => `/brand/${id}`,
        }),
        removeBrand: builder.mutation<IBrands, number | string>({
            query: (id) => ({
                url: `/brand/${id}`,
                method: "DELETE"
            }),
        }),
        addBrand: builder.mutation<IBrands, IBrands>({
            query: (brand) => ({
                url: `/brand/add`,
                method: "POST",
                body: brand
            }),
        }),
        updateBrand: builder.mutation<IBrands, IBrands>({
            query: (brand) => ({
                url: `/brand/${brand._id}/update`,
                method: "PUT",
                body: brand
            })
        }),

    }),
});

export const {
    useGetBrandsQuery,
    useGetBrandByIdQuery,
    useRemoveBrandMutation,
    useAddBrandMutation,
    useUpdateBrandMutation,
} = brandAPI;

export default brandAPI;