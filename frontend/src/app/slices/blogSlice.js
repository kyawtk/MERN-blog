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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
    
    })
    .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.message = "Blogs fetched successfully";
        state.success = true;
    
    
    }
    )
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
    
    
    }
    )
    .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.success = false;
    })
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
const baseurl = "http://127.0.0.1:9000";

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(baseurl);
      console.log(response)
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
const config ={
  withCredentials: true
}

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

export const createBlog = createAsyncThunk("blogs/createBlog" , async(blog , thunkApi) => {
 
  
  try {
    const response = await axios.post(baseurl + '/blogs' , blog, { withCredentials: true });
    console.log(response)
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

})

export default blogSlice.reducer;