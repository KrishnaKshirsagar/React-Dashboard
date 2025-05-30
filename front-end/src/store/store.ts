import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authMiddleware } from "./slices/authSlice";
import { authApi } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
