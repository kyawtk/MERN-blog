import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Blog = () => {
  const { id } = useParams();
  const [err, setErr] = useState(null);
  const [blog, setBlog] = useState("");
  useEffect(() => {
    async function getBlog() {
      let userInfo =JSON.parse( localStorage.getItem('userInfo'))
      let token = userInfo.token
      
      let config ={
        headers: {
          Authorization: `Bearer ${token}`,
        
      }}
      try {
        let response = await axios.get("https://blog-backend-hibu.onrender.com/blogs/" + id,config);

        setBlog(response.data);
        console.log(response.data);
      }
       catch (err) {
        console.log(err);
        setErr(err.message);
      }
    }
    getBlog();
  }, [id]);

  const content = blog ? (
    <div className="my-6 prose w-full max-w-[900px] text-left   flex flex-col mx-auto ">
      <h1 className="">{blog.title}</h1>
      <h2 className="">{blog.user.name}</h2>
      <p className="">{new Date(blog.createdAt).toLocaleDateString()}</p>
      <p className="text-lg whitespace-pre-wrap">{blog.content}</p>
      <button className="btn" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>Scroll To Top</button>
      <Link to={'/user/'+ blog.user._id}>More Thoughts from {blog.user.name}</Link>
    </div>
  ) : err ? (
    <h1 className="prose">{err}</h1>
  ) : (
    <Loading></Loading>
  );
  return content;
};

export default Blog;
