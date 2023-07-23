import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCredetials, setCredentials } from "./authSlice";
const initialState = {
  error: false,
  success: false,
  message: null,
  loading: false,
};

const userApiSlice = createSlice({
  name: "userApi",
  initialState,
  reducers: {
    reset: (state) => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.success = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state = initialState;
      });
  },
});

const baseurl = "http://localhost:9000";

export const registerUser = createAsyncThunk(
  "userApi/registerUser",
  async (user, thunkApi) => {
    try {
      const response = await axios.post(baseurl + "/api/users", user);
      console.log(response.data);
      thunkApi.dispatch(setCredentials(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//asyncthunk for loginuser
export const loginUser = createAsyncThunk(
  "userApi/loginUser",
  async (user, thunkApi) => {
    try {
      const response = await axios.post(baseurl + "/api/users/auth", user);
      console.log(response);
      thunkApi.dispatch(setCredentials(response.data));
      return response.data;
    } catch (error) {
      console.log(error)
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "userApi/logoutUser",
  async (_, thunkApi) => {
    try {
      const response = await axios.post(baseurl + "/api/users/logout");
      console.log(response);
      localStorage.removeItem("userInfo");
      thunkApi.dispatch(clearCredetials());
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const { reset } = userApiSlice.actions;
export default userApiSlice.reducer;
