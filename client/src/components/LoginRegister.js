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
  const [isSuccess, setIsSuccess] = useState(false); // Added state for success flag
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error } = useSelector((state) => state.auth);

  const loginRegister = async () => {
    setIsSuccess(false); // Assume failure by default
    try {
      await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
      // Successful registration or login
      if (page === 'Register') {
        setModalMessage('Congrats! You have been successfully registered! Please login.');
        setIsSuccess(true); // Set success flag to true
      } else {
        // For successful login, you might want to handle differently or not show a modal at all
      }
      setIsModalOpen(true);
    } catch (dispatchError) {
      // Handling authentication errors
      const errorMessage = dispatchError.message || 'Authentication failed. Please check your credentials and try again.';
      setModalMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(page === 'Register' ? '/login' : '/profile');
    }
  }, [token, page, navigate]);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setIsModalOpen(true);
    }
  }, [error]);

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

      <CustomModal 
        isOpen={isModalOpen} 
        message={modalMessage} 
        onRequestClose={() => {
          setIsModalOpen(false);
          // Navigate to login page after modal closes and registration was successful
          if (page === 'Register' && isSuccess) {
            navigate('/login');
          }
        }} 
        isSuccess={isSuccess} // Pass the success flag to CustomModal
      />
    </div>
  );
};

export default LoginRegister;






