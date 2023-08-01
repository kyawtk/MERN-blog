import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import themeReducer from "./slices/themeSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { emptyApiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [emptyApiSlice.reducerPath]: emptyApiSlice.reducer,
    theme: themeReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApiSlice.middleware),
  devTools: true,
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export default store;
