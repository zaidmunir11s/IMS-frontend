import {api} from "./index"

export const productApi=api.injectEndpoints({
    endpoints:(builder)=>({
        getProductCategories:builder.query({
            query:()=>({
                url:"/product/categories",
                method:"Get"
            }),
            providesTags:["Product"]
        }),
        createProductCategory:builder.mutation({
            query:(body)=>({
                url:"/product/category/create",
                method:"Post",
                body
            }),
            invalidatesTags:["Product"]
        })
    })
})

export const {
    useGetProductCategoriesQuery,
    useCreateProductCategoryMutation
}= productApi;