import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllBlogs } from "../app/slices/blogSlice";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
const Home = () => {
  const { blogs, loading, error, message } = useSelector(
    (state) => state.blogs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  return (
    <div className="">
      {loading && <Loading></Loading>}

<div className="flex flex-col w-full  mx-auto"></div>
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => <BlogCard key={blog._id} {...blog} />)}
     
    </div>
  );
};

export default Home;


