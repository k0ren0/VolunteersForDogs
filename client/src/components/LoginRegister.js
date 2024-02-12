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
  const { error, token, user } = useSelector((state) => state.auth);

  const loginRegister = async () => {
    try {
      await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
      if (page === 'Register') {
        setModalMessage('You have been successfully registered! Please login.');
        setIsModalOpen(true);
      }
    } catch (dispatchError) {
      const errorMessage = dispatchError.message || 'Authentication failed. Please check your credentials and try again.';
      setModalMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (token && user && user.user_id) {
      navigate(page === 'Register' ? '/login' : '/profile');
    }
  }, [token, user, page, navigate]);

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

      <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LoginRegister;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authenticateUser } from '../features/auth/authSlice';
// import { TextField, Button, Box } from '@mui/material';
// import CustomModal from './CustomModal';

// const LoginRegister = ({ page }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error, token, user } = useSelector((state) => state.auth);

//   const loginRegister = async () => {
//     try {
//       console.log('Trying to login/register...');
//       console.log('Email:', email);
//       console.log('Password:', password);
//       await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
//       console.log('Login/Register successful!');
//     } catch (dispatchError) {
//       console.error('Authentication Error:', dispatchError);
//       if (dispatchError.message === 'Email already exists') {
//         setModalMessage('This email is already in use. Please choose another one.');
//       } else {
//         setModalMessage('Authentication failed. Please check your credentials and try again.');
//       }
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalMessage('');
//   };

//   useEffect(() => {
//     if (token && user && user.user_id) {
//       if (page === 'Register') {
//         console.log("[LoginRegister] Redirecting to login page...");
//         navigate('/login');
//         setModalMessage('You have been successfully registered!');
//         setIsModalOpen(true);
//       } else if (page === 'Login') {
//         console.log("[LoginRegister] Redirecting to profile page...");
//         navigate('/profile');
//       }
//     }
//   }, [token, user, page, navigate]);


//   if (error) {
//     console.error(`[LoginRegister] Error: ${error}`);
//     setModalMessage(error);
//     setIsModalOpen(true);
//   }

//   return (
//     <div>
//       <h1>{page}</h1>
//       <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
//         <TextField
//           sx={{ m: 1 }}
//           id="email"
//           type="email"
//           label="Enter your email"
//           variant="outlined"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           sx={{ m: 1 }}
//           id="password"
//           type="password"
//           label="Enter your password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button variant="contained" onClick={loginRegister}>
//           {page}
//         </Button>
//       </Box>

//       <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
//     </div>
//   );
// };

// export default LoginRegister;
