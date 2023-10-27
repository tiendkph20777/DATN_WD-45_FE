import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../types/user";

const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const authAPI = createApi({
    reducerPath: "auth", // 
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        signIn: builder.mutation<void, Partial<IAuth>>({
            query: auth => ({
                url: "/signin",
                method: "POST",
                body: auth,
            }),
            invalidatesTags: ["User"],
        }),
        signUp: builder.mutation<void, Partial<IAuth>>({
            query: auth => ({
                url: "/signup",
                method: "POST",
                body: auth,
            }),
            invalidatesTags: ["User"],
        }),
        createUser: builder.mutation<void, Partial<IAuth>>({
            query: (user) => ({
                url: "/user/add/staff",
                method: "POST",
                body: user,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["User"],
        }),
        fetchUser: builder.query<IAuth[], void>({
            query: () => "/user",
            providesTags: ["User"]
        }),
        fetchOneUser: builder.query<any, string | number>({
            query: (_id) => ({
                url: `/user/${_id}`,
                method: "GET",
            }),
            providesTags: ["User"]
        }),
        removeUser: builder.mutation<void, string | number>({
            query: (_id) => ({
                url: `/user/${_id}`,
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation<void, any>({
            query: (user) => ({
                url: `/user/${user._id}/update`,
                method: 'PUT',
                body: user,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useFetchUserQuery, useFetchOneUserQuery, useRemoveUserMutation, useUpdateUserMutation, useCreateUserMutation } = authAPI;

export default authAPI;
