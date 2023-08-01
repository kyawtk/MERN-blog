import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 4000;
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

import Blog from "./models/blogModel.js";
import { notFound, errorHandler } from "./middleWare/errorMiddleware.js";
import cookieParser from "cookie-parser";
import asyncHandler from "express-async-handler";

connectDB();

const app = express();
app.use(cors({ origin: "https://blog-backend-hibu.onrender.com",credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/api/users/", userRoutes);
app.use("/blogs/", blogRoutes);

app.get(
  "/",
  asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).populate("user").exec();
   
    res.json(blogs);
  })
);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
