import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function TopNavigationBar() {
  const auth = useAuth();
  // const history = useHistory();
  function handleLogout() {
    auth.dispatch({
      type: "logout",
    });
  }

  return (
    <div className="px-2">
      <Link to="/">Performance Review App</Link>
      <Link to="/employee">Employees</Link>
      <Link to="/performance-review">Performance Reviews</Link>
      <Link to="/pending-performance-review">Pending Performance Reviews</Link>

      <button onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </div>
  );
}
