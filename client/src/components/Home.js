import React from 'react';
import { Typography, Container, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { keyframes } from '@mui/system';

// Создаем анимацию для карточек
const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

// Стилизованная компонента для карточек с анимацией
const AnimatedCard = styled(Card)({
  animation: `${fadeIn} 0.5s ease-out`,
});

// Стилизованная компонента для изображений с анимацией
const AnimatedImage = styled('img')({
  width: '100%',
  height: 'auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom align="center">Welcome to our Application!</Typography>
      <Typography variant="body1" gutterBottom align="justify">
        Thank you for visiting our application. We are dedicated to making a positive impact in our community.
      </Typography>
      <Typography variant="body1" gutterBottom align="justify">
        Volunteering in Israel is an incredible way to contribute to society and make a difference. Despite the challenges, including periods of conflict and war, volunteers play a crucial role in supporting communities in need.
      </Typography>
      <Typography variant="body1" gutterBottom align="justify">
        Whether it's providing aid to those affected by conflict, supporting local initiatives, or helping to build a brighter future for all, volunteering in Israel offers rewarding opportunities for personal growth and social impact.
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={6}>
          <AnimatedCard>
            <AnimatedImage src="volunteer_image_1.jpg" alt="Volunteer in Israel" />
            <CardContent>
              <Typography variant="h5" gutterBottom>Volunteering in Israel</Typography>
              <Typography variant="body2">
                Join us in making a difference. Explore volunteer opportunities in Israel today!
              </Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <AnimatedCard>
            <AnimatedImage src="volunteer_image_2.jpg" alt="Volunteer in Israel" />
            <CardContent>
              <Typography variant="h5" gutterBottom>Support Communities in Need</Typography>
              <Typography variant="body2">
                Your contribution matters. Learn how you can support communities affected by conflict and war.
              </Typography>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
        Learn More
      </Button>
      <IconButton
        sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
    </Container>
  );
};

export default Home;








// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../features/users/usersSlice';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { users, status, error } = useSelector((state) => state.users);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   if (status === 'loading') return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.user_id}>{user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
