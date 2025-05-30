import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import {
  type LoginCredentials,
  type AuthResponse,
  type messageResponse,
  type ResetPasswordRequest,
} from "../../interfaces/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.126:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { [key: string]: AuthResponse };
      const token = state[authApi.reducerPath].data?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => {
        localStorage.setItem("token", response.data.token);
        return response;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        console.log(error);
        return (
          (error?.data as { message?: string })?.message ??
          "An error occurred during login. Please try again."
        );
      },
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      transformResponse: () => {
        localStorage.removeItem("token");
        return undefined;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        console.log("error Api call--", error);
        return (
          (error?.data as { message?: string })?.message ??
          "An error occurred during logout. Please try again."
        );
      },
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation<
      messageResponse,
      { mobile_number: string }
    >({
      query: (request) => ({
        url: "/forgot_password",
        method: "POST",
        body: request,
      }),
      transformErrorResponse: (error: FetchBaseQueryError) => {
        console.log("error Api call--", error);
        return (
          (error?.data as { message?: string })?.message ??
          "An error occurred while sending password reset request. Please try again."
        );
      },
    }),
    resetPassword: builder.mutation<messageResponse, ResetPasswordRequest>({
      query: (request) => ({
        url: "/reset_password",
        method: "POST",
        body: request,
      }),
      transformErrorResponse: (error: FetchBaseQueryError) => {
        console.log("error Api call--", error);
        return (
          (error?.data as { message?: string })?.message ??
          "An error occurred while resetting password. Please try again."
        );
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

// Export reducer and middleware
export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;

// Export types
export type RootState = ReturnType<typeof authApi.reducer>;
export type AppDispatch = typeof authApi.reducer;
