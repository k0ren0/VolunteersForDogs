import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../features/auth/authSlice';
import { TextField, Button, Box } from '@mui/material';
import CustomModal from './CustomModal'; // Adjust the file path based on your project structure

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && (page === 'Login' || page === 'Register')) {
      navigate('/profile');
    }
    // Если есть ошибка, отображаем её в модальном окне
    if (error) {
      setModalMessage(error);
      setIsModalOpen(true);
    }
  }, [token, navigate, page, error]);

  const loginregister = async () => {
    try {
      await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
      // Модальное окно автоматически закрывается через useEffect при успешном входе
    } catch (dispatchError) {
      // Обработка ошибки перенесена в useEffect
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          type="password"
          label="Enter your password"
          variant="outlined"
          value={password}
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


