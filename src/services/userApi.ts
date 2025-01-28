import {api} from "./index"

export const userApi=api.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>({
                url:"/user",
                method:"Get"
            }),
            providesTags:["User"]
        }),
        createUser:builder.mutation({
            query:(body)=>({
                url:"/user",
                method:"Post",
                body
            }),
            invalidatesTags:["User"]
        }),
        getRoles:builder.query({
            query:()=>({
                url:"/user/roles",
                method:"Get"
            }),
            providesTags:["User"]
        }),
    })
})

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useGetRolesQuery
}= userApi;