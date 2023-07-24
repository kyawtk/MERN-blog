import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userApiReducer from "./slices/userApiSlice";
import blogReducer from "./slices/blogSlice";
import themeReducer from './slices/themeSlice'
const store = configureStore({
  reducer: { auth: authReducer, userApi: userApiReducer, blogs: blogReducer,theme:themeReducer },
  devTools: true,
});

export default store;
