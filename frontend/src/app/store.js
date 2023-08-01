import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userApiReducer from "./slices/userApiSlice";
import themeReducer from "./slices/themeSlice";
import { blogApi } from "./slices/blogSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userApi: userApiReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    theme: themeReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
  devTools: true,
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export default store;
