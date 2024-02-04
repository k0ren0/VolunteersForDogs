import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { AuthContext } from "../App";

const Nav = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Stack spacing={2} direction={"row"}>
        <Button component={Link} to="/">
          Home
        </Button>
        {token && ( // Show the "Users" button only when the user is authenticated
          <Button component={Link} to="/users">
            Users
          </Button>
        )}
        <Button component={Link} to="/login">
          Login
        </Button>
        <Button component={Link} to="/register">
          Register
        </Button>
      </Stack>
    </>
  );
};

export default Nav;
