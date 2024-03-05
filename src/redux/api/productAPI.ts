import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductResponse, SearchProductsRequest, SearchProductsResponse, UpdateProductRequest } from "../../types/api-type";

export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/product`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductsResponse, string>({
            query: () => "latest",
            providesTags: ["product"]
        }),
        allProducts: builder.query<AllProductsResponse, string>({
            query: (id) => `getAllProducts?id=${id}`,
            providesTags: ["product"]
        }),
        AllCategories: builder.query<CategoriesResponse, string>({
            query: () => `categories`,
            providesTags: ["product"]
        }),

        searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
            query: ({ search, category, price, page, sort }) => {
                let base = `search?search=${search}&page=${page}`;
                if (price) base += `&price=${price}`;
                if (sort) base += `&sort=${sort}`;
                if (category) base += `&category=${category}`;

                return base;
            },
            providesTags: ["product"],
        }),

        productDetails:builder.query<ProductResponse,string>({
            query:(id)=>`getSingleProduct/${id}`,
            providesTags:["product"],
        }),

        // For Add new Product
        newProduct:builder.mutation<MessageResponse,NewProductRequest>({
            query:({formData,id})=>({
                url:`addProduct?id=${id}`,
                method:"POST",
                body:formData,
            }),
            invalidatesTags: ["product"]
        }),
        // for update Product
        updateProduct:builder.mutation<MessageResponse,UpdateProductRequest>({
            query:({formData,productId,userId})=>({
                url:`updateProduct/${productId}?id=${userId}`,
                method:"PUT",
                body:formData
            }),  
            invalidatesTags:["product"]
        }),

        // deleteProduct done
        deleteProduct:builder.mutation<MessageResponse,DeleteProductRequest>({
            query:({productId,userId})=>({
                url:`deleteProduct/${productId}?id=${userId}`,
                method:"DELETE",
            }),  
            invalidatesTags:["product"]
        })
    })
})

export const {
    useLatestProductsQuery,
    useAllProductsQuery,
    useAllCategoriesQuery,
    useSearchProductsQuery,
    useProductDetailsQuery,
    useNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productAPI