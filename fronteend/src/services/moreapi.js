import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const moreapi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080"
    }),
    endpoints: (builder) => ({
        getorders:builder.mutation({
            query:(user)=>({
                url:"/orders/",
                method:"Post",
                body:user
            })
        })

        
    })
})
export const {useGetordersMutation} = moreapi;
export default moreapi;