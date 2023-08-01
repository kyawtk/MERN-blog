import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserBlogs } from "./Profile";

import { useState , useEffect } from "react";
import { useLogoutUserMutation } from "../app/slices/userApiSlice";
import { clearCredetials } from "../app/slices/authSlice";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const navigate  = useNavigate()
  const [logoutUser, {isLoading}] = useLogoutUserMutation()
  const { userInfo } = useSelector((state) => state.auth);
  const { token, _id } = userInfo;
  const [blogs , setBlogs] = useState([])
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearCredetials());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };



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
