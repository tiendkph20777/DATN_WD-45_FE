import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const commentAPI = createApi({
    reducerPath: "comment",
    tagTypes: ["Comment"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    endpoints: builder => ({
        fetchComment: builder.query<any, void>({
            query: () => "/comment",
            providesTags: ["Comment"]
        }),
        getComment: builder.query<{ product: any | null }, number>({
            query: id => ({
                url: `/comment/${id}`,
                method: "GET",
            }),
            providesTags: ["Comment"]
        }),
        removeComment: builder.mutation<void, any>({
            query: ({ id }) => {
                return {
                    url: `/comment/${id}`,
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        'authorization': `Bearer ${token}`
                    }
                }
            },
            invalidatesTags: ["Comment"]
        }),
        addComment: builder.mutation({
            query: (data) => {
                console.log(data)
                return {
                    url: `/comment/add`,
                    method: "POST",
                    body: data,
                    headers: {
                        "content-type": "application/json",
                        'authorization': `Bearer ${token}`
                    }
                }
            },
            invalidatesTags: ["Comment"]
        }),
        updateComment: builder.mutation<void, any>({
            query: comment => ({
                url: `/comment/${comment.id}`,
                method: "PUT",
                body: comment,

            }),
            invalidatesTags: ["Comment"]
        }),
        getUser: builder.query<{ product: any | null }, string>({
            query: id => ({
                url: `/user/${id}`,
                method: "GET",
            }),
        }),
    })
});


export const {
    useFetchCommentQuery,
    useGetCommentQuery,
    useAddCommentMutation,
    useRemoveCommentMutation,
    useUpdateCommentMutation,
    useGetUserQuery
} = commentAPI;


export default commentAPI;
