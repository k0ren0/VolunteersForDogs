import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    dispatch(logout());
    if (isMobile) setDrawerOpen(false); // Закрываем Drawer при выходе на мобильных устройствах
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const links = [
    { title: "Home", path: "/", hidden: false },
    { title: "Login", path: "/login", hidden: token },
    { title: "Register", path: "/register", hidden: token },
    { title: "Profile", path: "/profile", hidden: !token },
    { title: "Events", path: "/events", hidden: !token },
  ];

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
              edge="end" // Изменено на "end", чтобы кнопка была справа
              onClick={toggleDrawer(true)}
              sx={{ ml: 'auto' }} // Используем `ml: 'auto'`, чтобы отодвинуть иконку к правому краю
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            App Name
          </Typography>
          {!isMobile && links.map((link) => !link.hidden && (
            <Button key={link.title} color="inherit" component={RouterLink} to={link.path} sx={{ ml: 'auto' }}>
              {link.title}
            </Button>
          ))}
          {!isMobile && token && (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right" // Изменено на "right" для отображения Drawer с правой стороны
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Nav;
