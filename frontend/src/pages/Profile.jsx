import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../app/slices/userApiSlice";
import BlogForm from "../components/BlogForm";
import TextEditor from "../components/TextEditor";

useSelector;
const Profile = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { name, email, _id } = userInfo || {};
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div className="card w-96">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{email}</p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={()=>{ dispatch(logoutUser())}}>Log out</button>
          </div>
        </div>
      </div>
      <TextEditor/>
      <BlogForm {...userInfo}></BlogForm>
    </>
  );
};

export default Profile;
