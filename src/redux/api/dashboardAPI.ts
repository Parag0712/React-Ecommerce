import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StateResponse } from "../../types/api-type";

export const dashboardAPI = createApi({
    reducerPath:"dashboardApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/dashboard`
    }),
    endpoints:(builder)=>({
        stats: builder.query<StateResponse, string>({
            query: (id) => `getStats?id=${id}`,
            keepUnusedDataFor :0,
        }),
        pie: builder.query<PieResponse, string>({
            query: (id) => `getPie?id=${id}`,
            keepUnusedDataFor :0,
        }),
        bar: builder.query<BarResponse, string>({
            query: (id) => `getBar?id=${id}`,
            keepUnusedDataFor :0,
        }),
        line: builder.query<LineResponse, string>({
            query: (id) => `getLine?id=${id}`,
            keepUnusedDataFor :0,
        }),
    })
})

export const {
    useStatsQuery,
    usePieQuery,
    useBarQuery,
    useLineQuery
} = dashboardAPI;