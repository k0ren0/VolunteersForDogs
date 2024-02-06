import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../features/auth/authSlice';
import { Box, TextField, Button } from '@mui/material';
import CustomModal from './CustomModal';

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, token } = useSelector((state) => state.auth); // Получаем токен из состояния

  const loginregister = async () => {
    try {
      const response = await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
      navigate('/');
    } catch (error) {
      let errorMessage = '';

      if (page === 'Login') {
        if (error?.message === 'email not found') {
          errorMessage = 'This email is not registered. Please sign up.';
        } else if (error?.message === 'incorrect password') {
          errorMessage = 'The password you entered is incorrect. Please try again.';
        } else {
          errorMessage = 'Error during login.';
        }
      } else if (page === 'Register') {
        if (error?.message === 'email already in use') {
          errorMessage = 'This email is already in use. Please use a different email.';
        } else {
          errorMessage = 'Error during registration.';
        }
      }

      setModalMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  // Проверяем наличие токена и решаем, куда перенаправить пользователя
  if (token) {
    // Если есть токен, перенаправляем на "Profile" или "Events" (в зависимости от page)
    navigate(page === 'Login' ? '/profile' : '/events');
    return null; // Рендер не требуется, так как происходит перенаправление
  }

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
        <Button variant="contained" onClick={loginregister}>
          {page}
        </Button>
      </Box>

      <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
    </div>
  );
};

export default LoginRegister;

