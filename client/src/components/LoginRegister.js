import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../features/auth/authSlice';
import { Box, TextField, Button } from '@mui/material';

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const loginregister = () => {
    dispatch(authenticateUser({ email, password, url: page.toLowerCase() }))
      .unwrap()
      .then(() => navigate('/'))
      .catch((error) => {
        // Если используется RTK Query, ошибку можно обработать здесь
        console.error("Error during authentication", error);
      });
  };

  const renderErrorMessage = () => {
    if (error) {
      if (error.includes("email already in use")) {
        return "This email is already in use. Please use a different email.";
      } else if (error.includes("incorrect password")) {
        return "The password you entered is incorrect. Please try again.";
      } else {
        // Обработка других типов ошибок
        return error;
      }
    }
    return null; // В случае отсутствия ошибки, не отображаем ничего
  };

  return (
    <div>
      <h1>{page}</h1>
      <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
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
        <Button variant="contained" onClick={loginregister}>{page}</Button>
        {status === 'failed' && <div>{renderErrorMessage()}</div>}
      </Box>
    </div>
  );
};

export default LoginRegister;
