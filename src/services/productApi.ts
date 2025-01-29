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
        getProducts:builder.query({
            query:()=>({
                url:"/product",
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
        }),
        updateProductCategory:builder.mutation({
            query:(body)=>(
             {
                url:"/product/category/update",
                method:"Post",
                body
            }),
            invalidatesTags:["Product"]
        }),
        deleteProductCategory: builder.mutation({
            query: (productId: string) => ({
              url: `/product/category/${productId}`,  
              method: "DELETE",
            }),
         
            invalidatesTags: ["Product"],
          }),
        createProduct:builder.mutation({
            query:(body)=>({
                url:"/product",
                method:"Post",
                body
            }),
            invalidatesTags:["Product"]
        })
    })
})

export const {
    useGetProductCategoriesQuery,
    useCreateProductCategoryMutation,
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductCategoryMutation,
    useUpdateProductCategoryMutation
}= productApi;