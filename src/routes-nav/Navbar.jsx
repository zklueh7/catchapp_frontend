import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page if a user is logged in.
 *
 * Rendered by App.
 */

function Navbar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <nav className="navbar navbar-expand-sm">
        <Link className="navbar-brand" to="/">
          CatchApp
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log Out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
