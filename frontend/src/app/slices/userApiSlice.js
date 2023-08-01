import { emptyApiSlice } from "./apiSlice";

export const userApi = emptyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/api/users",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/api/users/auth",
        method: "POST",
        body: user,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = userApi;
