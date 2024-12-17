import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const moreapi = createApi({
    reducerPath: "moreapi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.shop-eoo8-gcfa1tlhf-vishnujayees-projects.vercel.app"
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