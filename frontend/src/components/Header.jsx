import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme } from "../app/slices/themeSlice";
import { motion, AnimatePresence } from "framer-motion";
const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const {userInfo} = useSelector(state => state.auth)
  return (
    <div className="navbar flex flex-wrap">
      <button className="btn  normal-case text-xl">
        <Link to={"/"}>Lovely Dairy</Link>
      </button>
      <button className="btn btn-primary">
        <Link to={"/write"}>Write</Link>
      </button>
    {userInfo && (  <button className="btn btn-primary">
        <Link to={"/user/profile"}>Profile</Link>
      </button>)}
    
      <button onClick={() => setShowMenu(true)} className="btn">
        Menu
      </button>
      <AnimatePresence>
        {showMenu && <Menu showMenu={showMenu} setShowMenu={setShowMenu} />}
      </AnimatePresence>
    </div>
  );
};

export default Header;

const Menu = ({ showMenu, setShowMenu }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { theme, availableThemes } = useSelector((state) => state.theme);
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    className="menu shadow-md flex justify-start items-center bg-secondary z-50 flex-col fixed top-0 left-0 h-screen w-screen sm:w-[70vw] md:w-[50vw] lg:w-[30vw] ">
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
        <li onClick={() => setShowMenu(false)}>
          <Link to="/user/profile">{userInfo.name}</Link>
        </li>
      )}
      <li>
        <details>
          <summary>Account</summary>
          <ul className="">
            {!userInfo && (
              <li onClick={() => setShowMenu(false)}>
                <Link to="/login">Sign In</Link>
              </li>
            )}

            <li onClick={() => setShowMenu(false)}>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        </details>
      </li>

      <button className="btn" onClick={() => setShowMenu(false)}>
        Close
      </button>
    </motion.ul>
  );
};
