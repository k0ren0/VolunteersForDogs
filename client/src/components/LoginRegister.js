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
  const { error } = useSelector((state) => state.auth);

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





// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { authenticateUser } from '../features/auth/authSlice';
// import { Box, TextField, Button } from '@mui/material';

// const LoginRegister = ({ page }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error } = useSelector((state) => state.auth);

//   const loginregister = async () => {
//     try {
//       const response = await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
//       navigate('/');
//     } catch (error) {
//       let errorMessage = '';

//       if (page === 'Login') {
//         if (error && error.message) {
//           if (error.message.includes('email not found')) {
//             errorMessage = 'This email is not registered. Please sign up.';
//           } else if (error.message.includes('incorrect password')) {
//             errorMessage = 'The password you entered is incorrect. Please try again.';
//           } else {
//             errorMessage = 'Error during login.';
//           }
//         } else {
//           errorMessage = 'Error during login.';
//         }
//       } else if (page === 'Register') {
//         if (error && error.message) {
//           if (error.message.includes('email already in use')) {
//             errorMessage = 'This email is already in use. Please use a different email.';
//           } else {
//             errorMessage = 'Error during registration.';
//           }
//         } else {
//           errorMessage = 'Error during registration.';
//         }
//       }

//       alert(errorMessage);
//     }
//   };

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
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           sx={{ m: 1 }}
//           id="password"
//           type="password"
//           label="Enter your password"
//           variant="outlined"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button variant="contained" onClick={loginregister}>
//           {page}
//         </Button>
//       </Box>
//     </div>
//   );
// };

// export default LoginRegister;
