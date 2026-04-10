import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ProductsTypes } from "../types/types"

const API = import.meta.env.VITE_API_URL;
console.log(API)

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllproducts: builder.query<ProductsTypes[], void>({
            query: () => '/products',
            providesTags: ["Products"],
        }),

        getOneProduct: builder.query<ProductsTypes, string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Products'],
        }),

        createProduct: builder.mutation<ProductsTypes, Partial<ProductsTypes>>({
            query: (newProduct) => ({
                url: '/products',
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ['Products']
        }),

        updateProduct: builder.mutation<ProductsTypes, ProductsTypes>({
            query: (product) => ({
                url: `/products/${product._id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Products']
        }),

        deleteProduct: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Products']
        }),

    }),
})

export const {
    useGetAllproductsQuery,
    useGetOneProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateProductMutation,
} = productsApi;