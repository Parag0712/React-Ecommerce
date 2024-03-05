import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { MessageResponse, UserResponse } from "../../types/api-type";
import { User } from "../../types/types";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/user/`,
    }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "createUser",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["users"]
        }),
    })
})

export const getUser = async (id: string) => {
    try {
        const { data }: { data: UserResponse } = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/user/getUser/${id}`
        );
        return data;
    } catch (error) {
        throw error;
    }
};

export const { useLoginMutation } = userAPI