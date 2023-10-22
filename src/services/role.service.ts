import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const roleAPI = createApi({
    reducerPath: "role", // Reducer path for authentication
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api", // Adjust the base URL for your authentication endpoints
    }),
    tagTypes: ["role"],
    endpoints: (builder) => ({
        fetchRole: builder.query<any[], void>({
            query: () => "/role",
        }),
        fetchOneRole: builder.query<any, string | number>({
            query: (_id) => ({
                url: `/role/${_id}`,
                method: "GET",
            }),
        }),
        removeRole: builder.mutation<void, string | number>({
            query: (_id) => ({
                url: `/role/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["role"], // Chỉ invalidates dữ liệu người dùng, không invalidates dữ liệu sản phẩm
        }),
        updateRole: builder.mutation<void, any>({
            query: (user) => ({
                url: `/role/${user._id}/update`,
                method: 'PUT',
                body: user
            }),
        }),
    }),
});

export const { useFetchOneRoleQuery, useFetchRoleQuery, useRemoveRoleMutation, useUpdateRoleMutation } = roleAPI;

export default roleAPI;
