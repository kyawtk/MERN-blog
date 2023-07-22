import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className="navbar">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Mern Auth</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {/* <li><a>Link</a></li> */}
      <li>
        <details>
          <summary>
            Account
          </summary>
          <ul className="p-2 bg-base-100">
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
  )
}

export default Header