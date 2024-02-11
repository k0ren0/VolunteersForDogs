import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../features/auth/authSlice';
import { TextField, Button, Box } from '@mui/material';
import CustomModal from './CustomModal';

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(`[LoginRegister] Page: ${page}, Token: ${token ? token : 'undefined'}, Error: ${error}`);
  
    if (token && page === 'Register') {
      console.log("[LoginRegister] Redirecting to login page...");
      navigate('/login');
      setModalMessage('You have been successfully registered!');
      setIsModalOpen(true);
    }
  
    if (token && page === 'Login') {
      console.log("[LoginRegister] Redirecting to profile page...");
      navigate('/profile');
    }
  
    if (error) {
      console.error(`[LoginRegister] Error: ${error}`);
      setModalMessage(error);
      setIsModalOpen(true);
    }
  }, [token, navigate, page, error]);
  

  const loginRegister = async () => {
    try {
      console.log(`[LoginRegister] Attempting to ${page.toLowerCase()}...`);
      await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
      console.log(`[LoginRegister] ${page} successful!`);
    } catch (dispatchError) {
      console.error(`[LoginRegister] Authentication Error: ${dispatchError}`);
      if (dispatchError.message === 'Email already exists') {
        setModalMessage('This email is already in use. Please choose another one.');
      } else {
        setModalMessage('Authentication failed. Please check your credentials and try again.');
      }
      setIsModalOpen(true);
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
        <Button variant="contained" onClick={loginRegister}>
          {page}
        </Button>
      </Box>

      <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
    </div>
  );
};

export default LoginRegister;
