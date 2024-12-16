import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shop-eoo8-gcfa1tlhf-vishnujayees-projects.vercel.app/"
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            })
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            })

        }),
        logintoken: builder.mutation({

            query: () => ({
                url: "/users/logintoken",
                method: "POST",
                headers: {
                    "authorization": (localStorage.getItem("userauth")),
                    
                },
            }),
            }),
            addproduct:builder.mutation({
                query:(product)=>({
                    url:"/products/new",
                    method:"POST",
                    body : product
                })
                
                
            }),
            getproduct:builder.mutation({
                query:()=>({
                    url:"/products/",
                    method:"GET"
                })
            }),
            productdetail :builder.mutation({
                query:(p)=>({
                    url:`/products/${p.id}`,
                    method:"GET"
                })
            }),
            addcart:builder.mutation({
                query:(data)=>({
                    url:"/products/add-to-cart",
                    method:"POST",
                    body:data
                })
            }),
            // getcart:builder.mutation({
            //     query:(user)=>({
            //         url:"/products/getcart",
            //         method:"Post",
            //         body:user
            //     })
            // }),
            removecart:builder.mutation({
                query:(user)=>({
                    url:"/products/remove-from-cart",
                    method:"Post",
                    body:user
                })
            }),
            inccartitem:builder.mutation({
                query:(data)=>({
                    url:"/products/increase-cart",
                    method:"POST",
                    body:data
                })
            }),
            deccartitem:builder.mutation({
                query:(data)=>({
                    url:"products/decrease-cart",
                    method:"POST",
                    body:data,
                })
            })

    }),
})

export const { useSignupMutation, useLoginMutation, useLogintokenMutation , useAddproductMutation, useGetproductMutation , useProductdetailMutation,useAddcartMutation
    ,useGetcartMutation , useRemovecartMutation ,useInccartitemMutation ,useDeccartitemMutation
} = appApi
export default appApi;