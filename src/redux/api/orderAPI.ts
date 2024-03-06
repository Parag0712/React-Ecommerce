import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MessageResponse, MyOrderResponse, NewOrderRequest, OrderDetailsResponse, UpdateOrderRequest } from "../../types/api-type";

export const orderAPI = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/order`
    }),
    tagTypes: ["order"],
    endpoints: (builder) => ({
        addOrder: builder.mutation<MessageResponse, NewOrderRequest>({
            query: (order) => ({
                url: "addOrder",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["order"]
        }),
        updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: ({ userId, orderId }) => ({
                url: `processOrder/${orderId}?id=${userId}`,
                method: "PUT"
            }),
            invalidatesTags: ["order"]
        }),
        deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: ({ orderId, userId }) => ({
                url: `deleteOrder/${orderId}?id=${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["order"]
        }),

        myOrders: builder.query<MyOrderResponse, string>({
            query: (id) => `myOrders?id=${id}`,
            providesTags: ["order"]
        }),
        allOrders: builder.query<AllOrdersResponse, string>({
            query: (id) => `getAllOrders?id=${id}`,
            providesTags: ["order"]
        }),
        orderDetails: builder.query<OrderDetailsResponse, string>({
            query: (id) => `getSingleOrder/${id}`,
            providesTags: ["order"]
        })
    }),
})

export const {
    useAddOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useAllOrdersQuery,
    useOrderDetailsQuery,
    useMyOrdersQuery
} = orderAPI