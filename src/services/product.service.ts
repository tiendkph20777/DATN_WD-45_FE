import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productAPI = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ["product"],
    endpoints: builder => ({

    })
})

export default productAPI

