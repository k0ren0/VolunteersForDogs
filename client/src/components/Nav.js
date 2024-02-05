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
        {token && (
          <>
            <Button component={Link} to="/profile">
              Profile
            </Button>
            <Button component={Link} to="/events">
              Events
            </Button>
          </>
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
