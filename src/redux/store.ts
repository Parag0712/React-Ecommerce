import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducers/userReducers";

export const server = import.meta.env.VITE_SERVER_BASE_URL;

export const store = configureStore({
    reducer: {
        [userReducer.name]: userReducer.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productAPI.middleware, userAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;