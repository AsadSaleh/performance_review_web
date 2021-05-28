import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function LoginScreen() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoggedIn(true);
  }

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>LoginScreen</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="username" />
        <input placeholder="password" />

        <input type="submit" />
      </form>
    </div>
  );
}
