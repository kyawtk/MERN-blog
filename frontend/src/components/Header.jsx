import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="navbar">
      <div className="flex-1">
        <button className="btn btn-ghost normal-case text-xl">
          <Link to={"/"}>Lovely Dairy</Link>
        </button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {userInfo && (
            <li>
              <Link to="/profile">{userInfo.name}</Link>
            </li>
          )}
          <li>
            <details>
              <summary>Account</summary>
              <ul className="p-2 bg-base-100">
                {!userInfo && (
                  <li>
                    <Link to="/login">Sign In</Link>
                  </li>
                )}

                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
