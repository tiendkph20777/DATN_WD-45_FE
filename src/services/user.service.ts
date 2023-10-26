import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../types/user.service";

const authAPI = createApi({
    reducerPath: "auth", // 
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        signIn: builder.mutation<void, Partial<IAuth>>({
            query: auth => ({
                url: "/signin",
                method: "POST",
                body: auth,
            }),
        }),
        signUp: builder.mutation<void, Partial<IAuth>>({
            query: auth => ({
                url: "/signup",
                method: "POST",
                body: auth,
            }),
        }),
        fetchUser: builder.query<IAuth[], void>({
            query: () => "/user",
        }),
        fetchOneUser: builder.query<any, string | number>({
            query: (_id) => ({
                url: `/user/${_id}`,
                method: "GET",
            }),
        }),
        removeUser: builder.mutation<void, string | number>({
            query: (_id) => ({
                url: `/user/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),
        updateUser: builder.mutation<void, any>({
            query: (user) => ({
                url: `/user/${user._id}/update`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useFetchUserQuery, useFetchOneUserQuery, useRemoveUserMutation, useUpdateUserMutation } = authAPI;

export default authAPI;
