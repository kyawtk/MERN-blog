import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { token } = userInfo;
  const navigate = useNavigate()
  //this is the user id from the front end /user/:id
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  useEffect(()=>{
    if(id == userInfo._id){
      navigate('/user/profile')
    }
  },[])
  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const getData = async () => {
      const response = await axios.get(
        `https://blog-backend-hibu.onrender.com/blogs/user/${id}`,
        config
      );
      console.log(response.data);
      setBlogs(response.data);
    };
    getData();
  }, [id]);
  return (
    <>
      <div className="">
        <header className="">
          <h1 className="text-2xl text-center mx-auto">{name}</h1>
          <p>Total {blogs.length} blogs written</p>
        </header>
        <UserBlogs id={id} blogs={blogs}></UserBlogs>
      </div>
    </>
  );
};

export default Profile;

export const UserBlogs = ({ blogs }) => {
  useEffect(() => {}, []);

  return (
    <div className="flex  items-center flex-col">
      {blogs &&
        blogs.map((blog) => <BlogCard key={blog._id} {...blog}></BlogCard>)}
    </div>
  );
};
