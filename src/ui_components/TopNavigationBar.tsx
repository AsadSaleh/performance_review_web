import React from "react";
import { Link } from "react-router-dom";

export default function TopNavigationBar() {
  function logout() {}
  return (
    <nav>
      <h1>Welcome to App</h1>
      <Link to="/login" onClick={logout}>
        Logout
      </Link>
      <p>Available Menus:</p>
      <ul>
        <li>
          <Link to="/employee">Employee</Link>
        </li>
        <li>
          <Link to="/performance-review">Performance Review List</Link>
        </li>
      </ul>
    </nav>
  );
}
