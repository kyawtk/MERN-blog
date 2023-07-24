import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme } from "../app/slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { theme, availableThemes } = useSelector((state) => state.theme);
  useEffect(()=>{
    document.querySelector('html').setAttribute('data-theme', theme);
  },[theme])
  return (
    <div className="navbar">
      <div className="flex-1">
        <button className="btn  normal-case text-xl">
          <Link to={"/"}>Lovely Dairy</Link>
        </button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <select
              onChange={(e) => dispatch(changeTheme(e.target.value))}
              className="select w-full max-w-xs select-md"
            >
              {availableThemes.map((t) => {
                return (
                  <option key={t} value={t}>
                    {t}
                  </option>
                );
              })}
            </select>{" "}
          </li>
          {userInfo && (
            <li>
              <Link to="/profile">{userInfo.name}</Link>
            </li>
          )}
          <li>
            <details>
              <summary>Account</summary>
              <ul className="">
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
