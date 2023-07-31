import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {UserBlogs} from './Profile'
import { fetchAllBlogs } from "../app/slices/blogSlice";

import Loading from "../components/Loading";
const Home = () => {
  const [user, setUser] = useState('')
  const { blogs, loading, error, message } = useSelector(
    (state) => state.blogs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);



  return (
    <div className="">
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Search People" className="input input-bordered" />
      {loading && <Loading></Loading>}

<div className="flex flex-col w-full  mx-auto"></div>
      {blogs &&
       <UserBlogs blogs={blogs.filter((blog) => blog.user.name.includes(user))}></UserBlogs>
      }
    </div>
  );
};

export default Home;


