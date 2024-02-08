import axios from 'axios';
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

  const currentPage = location.pathname; // Current page from route

  useEffect(() => {
    checkTokenValidity();
  }, [token]);

  const checkTokenValidity = async () => {
    try {
      if (token) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verifytoken`, null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Passing token in header
            
          },
        });
        console.log('API URL:', process.env.REACT_APP_API_URL);

        if (response.status === 200) {
          // If token is valid, keep the user on the current page
        } else if (response.status === 401) {
          // If token is invalid, redirect the user to the /login page
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
      // If current page matches menu item route, do nothing
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
        {links.map((link) => !link.hidden && (
          <ListItem key={link.title} disablePadding>
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


