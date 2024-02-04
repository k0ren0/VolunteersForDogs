import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { AuthContext } from "../App";

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginRegister = async () => {
    if (!email || !password) {
      setMessage("Please fill in both fields: email and password.");
      return;
    }

    try {
      if (page === "Login") {
        const response = await axios.post(
          "http://localhost:5005/users/login",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          setMessage("");
          const { token } = response.data; // Получаем токен из ответа
          localStorage.setItem("token", token); // Сохраняем токен в localStorage
          setToken(token); // Устанавливаем токен в контекст
          navigate("/");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5005/users/register",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          setMessage("");
          const { token } = response.data; // Получаем токен из ответа
          localStorage.setItem("token", token); // Сохраняем токен в localStorage
          setToken(token); // Устанавливаем токен в контекст
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <>
      <h1>{page}</h1>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete="off">
        <TextField
          sx={{ m: 1 }}
          id="email"
          type="email"
          label="Enter your email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          sx={{ m: 1 }}
          id="password"
          type="password"
          label="Enter your password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={loginRegister}>
        {page}
      </Button>
      <div>{message}</div>
    </>
  );
};

export default LoginRegister;
