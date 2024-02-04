import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const Info = () => {
  const { token } = useContext(AuthContext);

  return (
    <div>
      {token ? (
        <div>
          <h1>Information</h1>
          <p>This is a protected page with information.</p>
          <Link to="/">Go back to home</Link>
        </div>
      ) : (
        <div>
          <p>You need to log in to access this information.</p>
          <Link to="/login">Log In</Link>
          <p>If you don't have an account, you can</p>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Info;
