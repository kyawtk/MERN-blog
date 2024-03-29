import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

// Get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("user").exec();
  console.log(blogs);
  res.json(blogs);
});

// Create a new blog
// @access private
// route post /blogs/
const createBlog = asyncHandler(async (req, res) => {
  const blog = req.body;
  const newBlog = new Blog(blog);
  const savedBlog = await newBlog.save();
  if (savedBlog) {
    res.status(201).json(savedBlog);
  } else {
    throw new Error("Error saving blog");
  }
});

// Get Blogs by User Id
// @access private
// route get /blogs/user/:id
const getBlogsByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const blogs = await Blog.find({ user: userId }).populate("user").exec();
  if (blogs) {
    res.json(blogs);
  } else {
    res.status(404);
    throw new Error("Blogs not found");
  }
});

// Get a specific blog by ID
// access private
// route get /blogs/:id
const getBlogById = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findOne({ _id: blogId }).populate("user").exec();
  console.log(blog);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// Update a blog
const updateBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { title, content },
    { new: true }
  );
  res.json(updatedBlog);
});

// Delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const deletedBlog = await Blog.findByIdAndDelete(blogId);
  if (deletedBlog) {
    res.json(deletedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

export {
  getAllBlogs,
  createBlog,
  getBlogById,
  getBlogsByUserId,
  updateBlog,
  deleteBlog,
};
