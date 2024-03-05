import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { userAPI } from "./api/userAPI";

export const server = import.meta.env.VITE_SERVER_BASE_URL;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [userReducer.name]: userReducer.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
    
})

export type RootState = ReturnType<typeof store.getState>;