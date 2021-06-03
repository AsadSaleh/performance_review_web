import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function TopNavigationBar() {
  const {
    state: { user },
    dispatch,
  } = useAuth();
  // const history = useHistory();
  function handleLogout() {
    dispatch({
      type: "logout",
    });
  }

  return (
    <div className="px-2">
      <Link className="mx-1" to="/">
        Home
      </Link>
      {user?.role === "admin" ? (
        <>
          <Link className="mx-1" to="/employee">
            Employees
          </Link>
          <Link className="mx-1" to="/performance-review">
            Performance Reviews
          </Link>
        </>
      ) : null}
      <Link className="mx-1" to="/pending-performance-review">
        Pending Performance Reviews
      </Link>

      <span>Hello {user?.name}</span>
      <button onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </div>
  );
}
