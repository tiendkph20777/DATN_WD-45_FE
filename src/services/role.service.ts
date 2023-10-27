import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const roleAPI = createApi({
    reducerPath: "role",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
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
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["role"],
        }),
        updateRole: builder.mutation<void, any>({
            query: (user) => ({
                url: `/role/${user._id}/update`,
                method: 'PUT',
                body: user,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
        }),
    }),
});

export const { useFetchOneRoleQuery, useFetchRoleQuery, useRemoveRoleMutation, useUpdateRoleMutation } = roleAPI;

export default roleAPI;
