import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { AuthContext } from "../App";

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginregister = async () => {
    const url = `http://localhost:5005/users/${page.toLowerCase()}`;
    try {
      const response = await axios.post(url, {
        email,
        password,
      }, { withCredentials: true });
      
      if (response.status === 200) {
        if (page === "Login") {
          // Предполагаем, что сервер автоматически устанавливает куки с токеном
          setToken(response.data.token); // Обновляем токен в контексте, если нужно
          navigate("/");
        } else {
          navigate("/login");
        }
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div>
      <h1>{page}</h1>
      <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
        <TextField sx={{ m: 1 }} id="email" type="email" label="Enter your email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
        <TextField sx={{ m: 1 }} id="password" type="password" label="Enter your password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" onClick={loginregister}>{page}</Button>
      </Box>
      <div>{message}</div>
    </div>
  );
};

export default LoginRegister;
