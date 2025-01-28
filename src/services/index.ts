import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const api=createApi({
    tagTypes:["User","Product"],
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8000/api",
     
            
    }),
    endpoints:()=>({})
})