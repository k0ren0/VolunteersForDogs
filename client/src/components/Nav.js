import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

const Nav = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    if (isMobile) setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const currentPage = location.pathname; // Текущая страница из маршрута

  useEffect(() => {
    checkTokenValidity();
  }, [token, navigate]);

  const checkTokenValidity = async () => {
    try {
      if (token) {
        const response = await fetch('http://localhost:5005/api/verifytoken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Передача токена в заголовке
          },
        });

        if (response.status === 200) {
          // Если токен действителен, оставляем пользователя на текущей странице
        } else if (response.status === 401) {
          // Если токен не действителен, перенаправляем пользователя на страницу /login
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  };

  const links = [
    { title: "Home", path: "/", hidden: false },
    { title: "Login", path: "/login", hidden: !!token },
    { title: "Register", path: "/register", hidden: !!token },
    { title: "Profile", path: "/profile", hidden: !token },
    { title: "Events", path: "/events", hidden: !token },
  ];

  const handleMenuItemClick = (path) => {
    if (currentPage === path) {
      // Если текущая страница совпадает с маршрутом элемента меню, ничего не делать
      return;
    }
    navigate(path);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {links.map((link, index) => !link.hidden && (
          <ListItem key={index} disablePadding>
            <ListItemButton component={RouterLink} to={link.path}>
              <ListItemText primary={link.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {token && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            App Name
          </Typography>
          {!isMobile && links.map((link) => !link.hidden && (
            <Button
              key={link.title}
              color="inherit"
              component={RouterLink}
              to={link.path}
              sx={{ ml: 'auto' }}
            >
              {link.title}
            </Button>
          ))}
          {!isMobile && token && (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Nav;



// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

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

//   const currentPage = location.pathname; // Текущая страница из маршрута

//   const checkTokenValidity = async () => {
//     try {
//       if (token) {
//         const response = await fetch('http://localhost:5005/api/verifytoken', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`, // Передача токена в заголовке
//           },
//         });

//         if (response.status === 200) {
//           // Если токен действителен, оставляем пользователя на текущей странице
//         } else if (response.status === 401) {
//           // Если токен не действителен, перенаправляем пользователя на страницу /login
//           navigate('/login');
//         }
//       }
//     } catch (error) {
//       console.error('Error checking token validity:', error);
//     }
//   };

//   useEffect(() => {
//     checkTokenValidity();
//   }, [token, navigate]);

//   const links = [
//     { title: "Home", path: "/", hidden: false },
//     { title: "Login", path: "/login", hidden: !!token },
//     { title: "Register", path: "/register", hidden: !!token },
//     { title: "Profile", path: "/profile", hidden: !token }, //!
//     { title: "Events", path: "/events", hidden: !token }, //!
//   ];

//   const handleMenuItemClick = (path) => {
//     if (currentPage === path) {
//       // Если текущая страница совпадает с маршрутом элемента меню, ничего не делать
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
//         {links.map((link, index) => !link.hidden && (
//           <ListItem key={index} disablePadding>
//             <ListItemButton onClick={() => handleMenuItemClick(link.path)}>
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
//               onClick={() => handleMenuItemClick(link.path)}
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
