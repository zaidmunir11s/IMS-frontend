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
            query:(body: any)=>({
                url:"/user",
                method:"Post",
                body
            }),
            invalidatesTags:["User"]
        }),
        updateUser:builder.mutation({
            query:(body)=>(
             {
                url:"/user/update",
                method:"Post",
                body
            }),
            invalidatesTags:["User"]
        }),
        deleteUser: builder.mutation({
            query: (userId: string) => ({
              url: `/user/${userId}`,  
              method: "DELETE",
            }),
         
            invalidatesTags: ["User"],
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
    useGetRolesQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
}= userApi;