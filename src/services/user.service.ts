import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../types/user.service";

const authAPI = createApi({
    reducerPath: "auth", // Reducer path for authentication
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api", // Adjust the base URL for your authentication endpoints
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        signIn: builder.mutation<void, Partial<IAuth>>({
            query: auth => ({
                url: "/signin", // Adjust the endpoint for sign in
                method: "POST",
                body: auth,
            }),
        }),
        signUp: builder.mutation<void, Partial<IAuth>>({
            query: auth => ({
                url: "/signup", // Adjust the endpoint for sign up
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
            invalidatesTags: ["user"], // Chỉ invalidates dữ liệu người dùng, không invalidates dữ liệu sản phẩm
        }),
        updateUser: builder.mutation<void, any>({
            query: (user) => ({
                url: `/user/${user._id}/update`,
                method: 'PUT',
                body: user
            }),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useFetchUserQuery, useFetchOneUserQuery, useRemoveUserMutation, useUpdateUserMutation } = authAPI;

export default authAPI;
