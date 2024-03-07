import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";
import { orderAPI } from "./api/orderAPI";
import { dashboardAPI } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER_BASE_URL;

export const store = configureStore({
    reducer: {
        [userReducer.name]: userReducer.reducer,
        [cartReducers.name]: cartReducers.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productAPI.middleware,dashboardAPI.middleware, userAPI.middleware,orderAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;