import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  message: null,
  success: true,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    deleteBlogFromClient : (state,action)=>{
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      state.message = "Blog Deleted successfully";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.message = "Blogs fetched successfully";
        state.success = true;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.success = false;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.loading = false;

        state.message = "Blogs created successfully";
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.success = false;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        state.loading = false;

        state.message = "Blog Deleted successfully";
        state.success = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.success = false;
      });
    // .addCase(getBlogByID.pending, (state) => {
    //     state.loading = true;

    // })
    // .addCase(getBlogByID.fulfilled, (state) => {
    //     state.loading = false;

    //     state.message = "Blogs fetched successfully";
    //     state.success = true;

    // }
    // )
    // .addCase(getBlogByID.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = true;
    //     state.message = action.payload;
    //     state.success = false;
    // })
  },
});

export const {deleteBlogFromClient} = blogSlice.actions;

const baseurl = "http://127.0.0.1:9000";

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(baseurl);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// this is comment out because the fetching of blogby id is done at the blog.jsx page
// export const getBlogByID = createAsyncThunk('blogs/getBlogById' , async(id , thunkApi) => {
//   try {
//     const response  = await axios.get(baseurl + '/blogs/' + id , config);
//     console.log(response)
//     return response.data;
//   }catch(error){
//     console.log(error);
//     let message =
//       (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkApi.rejectWithValue(message);
//   }
// })
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const token = userInfo && userInfo.token;
const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog, thunkApi) => {
    try {
      const response = await axios.post(baseurl + "/blogs", blog, config);
      console.log(response);
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
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(baseurl + "/blogs/"+ id , config);
      console.log(response);
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

export default blogSlice.reducer;
