import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  logoutUser } from "../app/slices/userApiSlice";
import { UserBlogs } from "./Profile";
import { useState , useEffect } from "react";
const MyProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { token, _id } = userInfo;
  const [blogs , setBlogs] = useState([])
  const dispatch = useDispatch();


  function handleLogout() {
    dispatch(logoutUser());
  }



  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:9000/blogs/user/${_id}`,
        config
      );
      console.log(response.data);
      setBlogs(response.data);
    };
    getData();
  }, [_id]);
  return <div className="container">
    <h1>My Profile</h1>
    {userInfo && <h2>The user is logged in</h2>}
    {!userInfo && <h2>The user is not logged in</h2>}
    <button className="btn btn-primary" onClick={handleLogout}> Logout</button>

    <UserBlogs blogs={blogs}></UserBlogs>
  </div>;
};

export default MyProfile;
