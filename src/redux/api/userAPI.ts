import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { User } from "../../types/types";
import { MessageResponse } from "../../types/api-type";

export const userAPI = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`,
    }),
    tagTypes:["users"],
    endpoints:(builder)=>({
        login:builder.mutation<MessageResponse,User>({
            query:(user)=>({
                url:"createUser",
                method:"POST",
                body:user
            })
        })
    })
})