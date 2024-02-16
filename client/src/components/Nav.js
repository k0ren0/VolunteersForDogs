import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useMediaQuery, useTheme, Switch, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import { NavLink } from 'react-router-dom';
import { useThemeContext } from './themeContext';

const CustomNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  '&.active': {
    fontWeight: 'bold',
  },
  '&:hover': {
    filter: 'brightness(90%)',
    transition: 'filter 0.3s ease', // Плавная трансформация при наведении
  },
  '&:active': {
    filter: 'brightness(80%)',
    transition: 'filter 0.3s ease', // Плавная трансформация при нажатии
  },
}));

const Nav = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleColorMode } = useThemeContext();

  const handleLogoutClick = () => {
    dispatch(logout());
    setDrawerOpen(false);
  };

  const links = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login", hidden: token },
    { title: "Register", path: "/register", hidden: token },
    { title: "Profile", path: "/profile", hidden: !token },
    { title: "Events", path: "/events", hidden: !token },
    { title: "Logout", onClick: handleLogoutClick, hidden: !token },
  ];

  return (
    <>
      <AppBar position="static" sx={{
        backgroundImage: theme.palette.mode === 'dark' ? 'linear-gradient(to right, #607D8B, #283593)' : 'linear-gradient(to right, #64B5F6, #2196F3)',
        boxShadow: 'none',
      }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <PetsIcon sx={{ marginRight: 1 }} />
            Volunteer App
          </Typography>
          {!isMobile && links.filter(link => !link.hidden).map((link, index) => (
            <Button
              key={index}
              color="inherit"
              component={CustomNavLink}
              to={link.path || ''}
              onClick={link.onClick}
            >
              {link.title}
            </Button>
          ))}
          <Switch
            checked={theme.palette.mode === 'dark'}
            onChange={toggleColorMode}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: theme.palette.mode === 'dark' ? '#0D47A1' : '#2196F3',
              },
              '& .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#757575' : '#d9d9d9',
              },
            }}
          />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <List>
            {links.filter(link => !link.hidden).map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={CustomNavLink} to={link.path || ''} onClick={link.onClick}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Nav;







// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { NavLink } from 'react-router-dom'; // Убедитесь, что импортировали NavLink

// const Nav = () => {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const handleLogout = () => {
//     dispatch(logout());
//     setDrawerOpen(false);
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const links = [
//     { title: "Home", path: "/" },
//     { title: "Login", path: "/login", hidden: !!token },
//     { title: "Register", path: "/register", hidden: !!token },
//     { title: "Profile", path: "/profile", hidden: !token },
//     { title: "Events", path: "/events", hidden: !token },
//     { title: "Logout", action: handleLogout, hidden: !token },
//   ];

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           {isMobile && (
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Volunteer App
//           </Typography>
//           {!isMobile && links.filter(link => !link.hidden).map((link, index) => (
//             <Button
//               key={index}
//               color="inherit"
//               component={NavLink}
//               to={link.path}
//               onClick={link.action ? (event) => { event.preventDefault(); link.action(); } : null} // Изменено для корректной обработки клика
//               style={({ isActive }) => isActive ? { textDecoration: 'underline' } : null} // Используйте inline стиль для активной ссылки
//             >
//               {link.title}
//             </Button>
//           ))}
//         </Toolbar>
//       </AppBar>
//       {isMobile && (
//         <Drawer
//           anchor="left"
//           open={drawerOpen}
//           onClose={toggleDrawer(false)}
//         >
//           <Box
//             sx={{ width: 250 }}
//             role="presentation"
//             onClick={toggleDrawer(false)}
//             onKeyDown={toggleDrawer(false)}
//           >
//             <List>
//               {links.filter(link => !link.hidden).map((link, index) => (
//                 <ListItem key={index} disablePadding>
//                   <ListItemButton
//                     component={NavLink}
//                     to={link.path}
//                     onClick={link.action ? () => { setDrawerOpen(false); link.action(); } : () => setDrawerOpen(false)} // Исправлено для использования NavLink и обработки действий
//                   >
//                     <ListItemText primary={link.title} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Nav;



// // import axios from 'axios';
// import React, { useState, } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link as RouterLink } from 'react-router-dom'; //useNavigate

// const Nav = () => {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   // const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     if (isMobile) setDrawerOpen(false);
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   // useEffect(() => {
//   //   const checkTokenValidity = async () => {
//   //     try {
//   //       if (token) {
//   //         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verifytoken`, null, {
//   //           headers: {
//   //             'Content-Type': 'application/json',
//   //             'Authorization': `Bearer ${token}`,
//   //           },
//   //         });

//   //         if (response.status === 200) {
//   //           // If token is valid, keep the user on the current page
//   //         } else if (response.status === 401) {
//   //           // If token is invalid, redirect the user to the /login page
//   //           navigate('/login');
//   //         }
//   //       }
//   //     } catch (error) {
//   //       console.error('Error checking token validity:', error);
//   //     }
//   //   };

//   //   checkTokenValidity(); 
//   // }, [token, navigate]);

//   const links = [
//     { title: "Home", path: "/", hidden: false },
//     { title: "Login", path: "/login", hidden: !!token },
//     { title: "Register", path: "/register", hidden: !!token },
//     { title: "Profile", path: "/profile", hidden: !token },
//     { title: "Events", path: "/events", hidden: !token },
//   ];

//   const drawerList = () => (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {links.map((link) => !link.hidden && (
//           <ListItem key={link.title} disablePadding>
//             <ListItemButton component={RouterLink} to={link.path}>
//               <ListItemText primary={link.title} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//         {token && (
//           <ListItem disablePadding>
//             <ListItemButton onClick={handleLogout}>
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           {isMobile && (
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="end"
//               onClick={toggleDrawer(true)}
//               sx={{ ml: 'auto' }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
//             App Name
//           </Typography>
//           {!isMobile && links.map((link) => !link.hidden && (
//             <Button
//               key={link.title}
//               color="inherit"
//               component={RouterLink}
//               to={link.path}
//               sx={{ ml: 'auto' }}
//             >
//               {link.title}
//             </Button>
//           ))}
//           {!isMobile && token && (
//             <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//       >
//         {drawerList()}
//       </Drawer>
//     </>
//   );
// };

// export default Nav;



// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

// const Nav = () => {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     dispatch(logout());
//     if (isMobile) setDrawerOpen(false);
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const currentPage = location.pathname; // Current page from route

//   useEffect(() => {
//     checkTokenValidity();
//   }, [token]);

//   const checkTokenValidity = async () => {
//     try {
//       if (token) {
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verifytoken`, null, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`, // Passing token in header
            
//           },
//         });
//         console.log('API URL:', process.env.REACT_APP_API_URL);

//         if (response.status === 200) {
//           // If token is valid, keep the user on the current page
//         } else if (response.status === 401) {
//           // If token is invalid, redirect the user to the /login page
//           navigate('/login');
//         }
//       }
//     } catch (error) {
//       console.error('Error checking token validity:', error);
//     }
//   };

//   const links = [
//     { title: "Home", path: "/", hidden: false },
//     { title: "Login", path: "/login", hidden: !!token },
//     { title: "Register", path: "/register", hidden: !!token },
//     { title: "Profile", path: "/profile", hidden: !token },
//     { title: "Events", path: "/events", hidden: !token },
//   ];

//   const handleMenuItemClick = (path) => {
//     if (currentPage === path) {
//       // If current page matches menu item route, do nothing
//       return;
//     }
//     navigate(path);
//   };

//   const drawerList = () => (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {links.map((link) => !link.hidden && (
//           <ListItem key={link.title} disablePadding>
//             <ListItemButton component={RouterLink} to={link.path}>
//               <ListItemText primary={link.title} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//         {token && (
//           <ListItem disablePadding>
//             <ListItemButton onClick={handleLogout}>
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           {isMobile && (
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="end"
//               onClick={toggleDrawer(true)}
//               sx={{ ml: 'auto' }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
//             App Name
//           </Typography>
//           {!isMobile && links.map((link) => !link.hidden && (
//             <Button
//               key={link.title}
//               color="inherit"
//               component={RouterLink}
//               to={link.path}
//               sx={{ ml: 'auto' }}
//             >
//               {link.title}
//             </Button>
//           ))}
//           {!isMobile && token && (
//             <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//       >
//         {drawerList()}
//       </Drawer>
//     </>
//   );
// };

// export default Nav;


