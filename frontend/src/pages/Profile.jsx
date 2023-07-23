import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../app/slices/userApiSlice";

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
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{email}</p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={()=>{ dispatch(logoutUser())}}>Log out</button>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Update your account info</h2>
         
        </div>
      </div>
    </>
  );
};

export default Profile;
