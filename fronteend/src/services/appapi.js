import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const appApi = createApi({
    reducerPath:"appApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080"
    }),
    endpoints:(builder)=>({
        signup:builder.mutation({
            query:(user) =>({
                url:"/users/signup",
                method:"POST",
                body:user,
            })
        }),
        login:builder.mutation({
            
            query:(user)=>({
                url:"/users/login",
                method:"POST",
                body:user,
            })
            
        }),
    })
})
export const {useSignupMutation, useLoginMutation,useLogintokenMutation} = appApi
export default appApi;