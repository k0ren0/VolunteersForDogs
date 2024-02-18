import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../features/auth/authSlice';
import { TextField, Button, Box, Typography, Grid, useTheme } from '@mui/material';
import CustomModal from './CustomModal';

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error } = useSelector((state) => state.auth);
  const theme = useTheme();

  const loginRegister = async () => {
    setIsSuccess(false);
    try {
      await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
      if (page === 'Register') {
        setModalMessage('Congrats! You have been successfully registered! Please login.');
        setIsSuccess(true);
      } else {
        // For successful login, you might want to handle differently or not show a modal at all
        // Here you can redirect the user or perform any other action upon successful login
        navigate('/profile'); // Example: Redirect to profile page after successful login
      }
      setIsModalOpen(true);
    } catch (dispatchError) {
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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Box sx={{
          p: 4,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          maxWidth: '420px',
          width: '100%',
          margin: 'auto',
        }}>
          <Typography variant="h4" gutterBottom>
            {page}
          </Typography>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="dense"
              id="email"
              type="email"
              label="Enter your email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              id="password"
              type="password"
              label="Enter your password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth variant="contained" onClick={loginRegister} sx={{ mt: 2 }}>
              {page}
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {page === 'Register' ? "Already have an account? " : "Don't have an account? "}
            <Link 
              to={page === 'Register' ? '/login' : '/register'} 
              color="primary" 
              underline="hover" 
              style={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}
            >
              {page === 'Register' ? "Login here" : "Register here"}
            </Link>
          </Typography>
        </Box>
      </Grid>

      <CustomModal 
        isOpen={isModalOpen} 
        message={modalMessage} 
        onRequestClose={() => {
          setIsModalOpen(false);
          if (page === 'Register' && isSuccess) {
            navigate('/login');
          }
        }} 
        isSuccess={isSuccess} 
      />
    </Grid>
  );
};

export default LoginRegister;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authenticateUser } from '../features/auth/authSlice';
// import { TextField, Button, Box, Typography, Grid, useTheme } from '@mui/material';
// import CustomModal from './CustomModal';

// const LoginRegister = ({ page }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [isSuccess, setIsSuccess] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token, error } = useSelector((state) => state.auth);
//   const theme = useTheme();

//   const loginRegister = async () => {
//     setIsSuccess(false);
//     try {
//       await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
//       if (page === 'Register') {
//         setModalMessage('Congrats! You have been successfully registered! Please login.');
//         setIsSuccess(true);
//       } else {
//         // For successful login, you might want to handle differently or not show a modal at all
//       }
//       setIsModalOpen(true);
//     } catch (dispatchError) {
//       const errorMessage = dispatchError.message || 'Authentication failed. Please check your credentials and try again.';
//       setModalMessage(errorMessage);
//       setIsModalOpen(true);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate(page === 'Register' ? '/login' : '/profile');
//     }
//   }, [token, page, navigate]);

//   useEffect(() => {
//     if (error) {
//       setModalMessage(error);
//       setIsModalOpen(true);
//     }
//   }, [error]);

//   return (
//     <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
//       <Grid item xs={12} sm={10} md={8} lg={6}>
//         <Box sx={{
//           p: 4,
//           boxShadow: 2,
//           borderRadius: 2,
//           bgcolor: 'background.paper',
//           maxWidth: '420px',
//           width: '100%',
//           '@media (min-width: 600px)': {
//             maxWidth: '440px',
//           },
//           '@media (min-width: 960px)': {
//             maxWidth: '460px',
//           },
//           '@media (min-width: 1280px)': {
//             maxWidth: '480px',
//           },
//         }}>
//           <Typography variant="h4" gutterBottom>
//             {page}
//           </Typography>
//           <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               margin="normal"
//               id="email"
//               type="email"
//               label="Enter your email"
//               variant="outlined"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               id="password"
//               type="password"
//               label="Enter your password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button fullWidth variant="contained" onClick={loginRegister} sx={{ mt: 2 }}>
//               {page}
//             </Button>
//           </Box>
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             {page === 'Register' ? "Already have an account? " : "Don't have an account? "}
//             <Link 
//               to={page === 'Register' ? '/login' : '/register'} 
//               color="primary" 
//               underline="hover" 
//               style={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}
//             >
//               {page === 'Register' ? "Login here" : "Register here"}
//             </Link>
//           </Typography>
//         </Box>
//       </Grid>

//       <CustomModal 
//         isOpen={isModalOpen} 
//         message={modalMessage} 
//         onRequestClose={() => {
//           setIsModalOpen(false);
//           if (page === 'Register' && isSuccess) {
//             navigate('/login');
//           }
//         }} 
//         isSuccess={isSuccess} 
//       />
//     </Grid>
//   );
// };

// export default LoginRegister;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authenticateUser } from '../features/auth/authSlice';
// import { TextField, Button, Box, Typography, Grid, useTheme } from '@mui/material';
// import CustomModal from './CustomModal';

// const LoginRegister = ({ page }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [isSuccess, setIsSuccess] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token, error } = useSelector((state) => state.auth);
//   const theme = useTheme();

//   const loginRegister = async () => {
//     setIsSuccess(false);
//     try {
//       await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
//       if (page === 'Register') {
//         setModalMessage('Congrats! You have been successfully registered! Please login.');
//         setIsSuccess(true);
//       } else {
//         // For successful login, you might want to handle differently or not show a modal at all
//       }
//       setIsModalOpen(true);
//     } catch (dispatchError) {
//       const errorMessage = dispatchError.message || 'Authentication failed. Please check your credentials and try again.';
//       setModalMessage(errorMessage);
//       setIsModalOpen(true);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate(page === 'Register' ? '/login' : '/profile');
//     }
//   }, [token, page, navigate]);

//   useEffect(() => {
//     if (error) {
//       setModalMessage(error);
//       setIsModalOpen(true);
//     }
//   }, [error]);

//   return (
//     <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
//       <Grid item xs={12} sm={8} md={6} lg={4}>
//         <Box sx={{ p: 4, boxShadow: 2, borderRadius: 2, bgcolor: 'background.paper', maxWidth: '400px' }}>
//           <Typography variant="h4" gutterBottom>
//             {page}
//           </Typography>
//           <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               margin="normal"
//               id="email"
//               type="email"
//               label="Enter your email"
//               variant="outlined"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               id="password"
//               type="password"
//               label="Enter your password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button fullWidth variant="contained" onClick={loginRegister} sx={{ mt: 2 }}>
//               {page}
//             </Button>
//           </Box>
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             {page === 'Register' ? "Already have an account? " : "Don't have an account? "}
//             <Link 
//               to={page === 'Register' ? '/login' : '/register'} 
//               color="primary" 
//               underline="hover" 
//               style={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}
//             >
//               {page === 'Register' ? "Login here" : "Register here"}
//             </Link>
//           </Typography>
//         </Box>
//       </Grid>

//       <CustomModal 
//         isOpen={isModalOpen} 
//         message={modalMessage} 
//         onRequestClose={() => {
//           setIsModalOpen(false);
//           if (page === 'Register' && isSuccess) {
//             navigate('/login');
//           }
//         }} 
//         isSuccess={isSuccess} 
//       />
//     </Grid>
//   );
// };

// export default LoginRegister;





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
//   const [isSuccess, setIsSuccess] = useState(false); // Added state for success flag
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token, error } = useSelector((state) => state.auth);

//   const loginRegister = async () => {
//     setIsSuccess(false); // Assume failure by default
//     try {
//       await dispatch(authenticateUser({ email, password, url: page.toLowerCase() })).unwrap();
//       // Successful registration or login
//       if (page === 'Register') {
//         setModalMessage('Congrats! You have been successfully registered! Please login.');
//         setIsSuccess(true); // Set success flag to true
//       } else {
//         // For successful login, you might want to handle differently or not show a modal at all
//       }
//       setIsModalOpen(true);
//     } catch (dispatchError) {
//       // Handling authentication errors
//       const errorMessage = dispatchError.message || 'Authentication failed. Please check your credentials and try again.';
//       setModalMessage(errorMessage);
//       setIsModalOpen(true);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate(page === 'Register' ? '/login' : '/profile');
//     }
//   }, [token, page, navigate]);

//   useEffect(() => {
//     if (error) {
//       setModalMessage(error);
//       setIsModalOpen(true);
//     }
//   }, [error]);

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

//       <CustomModal 
//         isOpen={isModalOpen} 
//         message={modalMessage} 
//         onRequestClose={() => {
//           setIsModalOpen(false);
//           // Navigate to login page after modal closes and registration was successful
//           if (page === 'Register' && isSuccess) {
//             navigate('/login');
//           }
//         }} 
//         isSuccess={isSuccess} // Pass the success flag to CustomModal
//       />
//     </div>
//   );
// };

// export default LoginRegister;






