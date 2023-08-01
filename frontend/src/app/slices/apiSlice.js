import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo?.token || "";
};

export const emptyApiSlice = createApi({
  reducerPath: "emptyApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
    prepareHeaders: (headers) => {
      // Include the JWT token in the request headers
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({}),
});
