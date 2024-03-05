import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { userAPI } from "./api/userAPI";

export const server = import.meta.env.VITE_SERVER_BASE_URL;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]:userAPI.reducer,
        [userReducer.name]:userReducer.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch 