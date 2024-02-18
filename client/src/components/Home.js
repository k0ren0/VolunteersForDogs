import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container, Grid, Card, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, keyframes } from '@mui/system';

// Definitions of animation and styled components
const fadeIn = keyframes`
  from { opacity: 0; transform: 'translateY(20px)'; }
  to { opacity: 1; transform: 'translateY(0)'; }
`;

const AnimatedCard = styled(Card)({
  animation: `${fadeIn} 0.5s ease-out`,
});

const AnimatedImage = styled('img')({
  width: '100%',
  height: 'auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const Home = () => {
  // Using useSelector to access state from the Redux store
  const { title, introduction, sections } = useSelector((state) => state.home);
  const { images } = useSelector((state) => state.gallery);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Title and Introduction */}
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom align="center">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom align="justify">{introduction}</Typography>
      </Grid>

      {/* Displaying sections with text */}
      {sections.map((section, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>{section.title}</Typography>
            <Typography variant="body1" gutterBottom align="justify">{section.content}</Typography>
          </Grid>
        </Grid>
      ))}

      {/* Image Gallery */}
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>Our Gallery</Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AnimatedCard>
              {/* Using images from Amazon S3 */}
              <AnimatedImage src={`https://your-bucket-name.s3.amazonaws.com/${image}`} alt={`Image ${index}`} />
              {/* Content of cards can be added here if needed */}
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>

      {/* "Learn More" Button and Floating Menu Button */}
      <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" size="large">Learn More</Button>
      </Grid>
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


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Typography, Container, Grid, Card, IconButton, Button } from '@mui/material'; //CardContent,
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled, keyframes } from '@mui/system';

// // Definitions of animation and styled components
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const AnimatedCard = styled(Card)({
//   animation: `${fadeIn} 0.5s ease-out`,
// });

// const AnimatedImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const Home = () => {
//   // Using useSelector to access state from Redux store
//   const { title, introduction, sections } = useSelector((state) => state.home);
//   const { images } = useSelector((state) => state.gallery);

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       {/* Title and Introduction */}
//       <Grid item xs={12}>
//         <Typography variant="h3" gutterBottom align="center">{title}</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="body1" gutterBottom align="justify">{introduction}</Typography>
//       </Grid>

//       {/* Displaying sections with text */}
//       {sections.map((section, index) => (
//         <Grid container spacing={2} key={index}>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>{section.title}</Typography>
//             <Typography variant="body1" gutterBottom align="justify">{section.content}</Typography>
//           </Grid>
//         </Grid>
//       ))}

//       {/* Image gallery */}
//       <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>Our Gallery</Typography>
//       <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//         {images.map((image, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <AnimatedCard>
//               <AnimatedImage src={image} alt={`Image ${index}`} />
//               {/* Card content can be added here if necessary */}
//             </AnimatedCard>
//           </Grid>
//         ))}
//       </Grid>

//       {/* "Learn More" button and floating menu button */}
//       <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
//         <Button variant="contained" color="primary" size="large">Learn More</Button>
//       </Grid>
//       <IconButton
//         sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
//         aria-label="menu"
//       >
//         <MenuIcon />
//       </IconButton>
//     </Container>
//   );
// };

// export default Home;




// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Typography, Container, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled, keyframes } from '@mui/system';

// const fadeIn = keyframes`
//   from { opacity: 0; transform: 'translateY(20px)'; }
//   to { opacity: 1; transform: 'translateY(0)'; }
// `;

// const AnimatedCard = styled(Card)({
//   animation: `${fadeIn} 0.5s ease-out`,
// });

// const AnimatedImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const Home = () => {
//   const { title, introduction, sections } = useSelector((state) => state.home);
//   const { images } = useSelector((state) => state.gallery);

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Grid item xs={12}>
//         <Typography variant="h3" gutterBottom align="center">{title}</Typography>
//       </Grid>

//       <Grid item xs={12}>
//         <Typography variant="body1" gutterBottom align="justify">{introduction}</Typography>
//       </Grid>

//       {sections.map((section, index) => (
//         <Grid container spacing={2} key={index}>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>{section.title}</Typography>
//             <Typography variant="body1" gutterBottom align="justify">{section.content}</Typography>
//           </Grid>
//         </Grid>
//       ))}

//       {/* Добавление нового текстового раздела */}
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom>New Opportunities</Typography>
//           <Typography variant="body1" gutterBottom align="justify">
//             Discover new volunteering opportunities across the globe. Engage with international communities and make a worldwide impact. Join us in our mission to bring positive change.
//           </Typography>
//         </Grid>
//       </Grid>

//       {/* Расширенная галерея изображений */}
//       <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mt: 4 }}>
//         {images.map((image, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <AnimatedCard>
//               <AnimatedImage src={image} alt={`Image ${index}`} />
//               <CardContent>
//                 {/* Контент карточек может быть добавлен здесь */}
//               </CardContent>
//             </AnimatedCard>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
//         <Button variant="contained" color="primary" size="large">
//           Learn More
//         </Button>
//       </Grid>

//       <IconButton
//         sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
//         aria-label="menu"
//       >
//         <MenuIcon />
//       </IconButton>
//     </Container>
//   );
// };

// export default Home;



// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Typography, Container, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled, keyframes } from '@mui/system';

// const fadeIn = keyframes`
//   from { opacity: 0; transform: 'translateY(20px)'; }
//   to { opacity: 1; transform: 'translateY(0)'; }
// `;

// const AnimatedCard = styled(Card)({
//   animation: `${fadeIn} 0.5s ease-out`,
// });

// const AnimatedImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const Home = () => {
//   const { title, introduction, sections } = useSelector((state) => state.home);
//   const { images } = useSelector((state) => state.gallery);

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Grid item xs={12}>
//         <Typography variant="h3" gutterBottom align="center">{title}</Typography>
//       </Grid>

//       <Grid item xs={12}>
//         <Typography variant="body1" gutterBottom align="justify">{introduction}</Typography>
//       </Grid>

//       {sections.map((section, index) => (
//         <Grid container spacing={2} key={index}>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>{section.title}</Typography>
//             <Typography variant="body1" gutterBottom align="justify">{section.content}</Typography>
//           </Grid>
//         </Grid>
//       ))}

//       <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//         {images.map((image, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <AnimatedCard>
//               <AnimatedImage src={image} alt={`Image ${index}`} />
//               <CardContent>
//                 {/* Контент карточек может быть добавлен здесь */}
//               </CardContent>
//             </AnimatedCard>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
//         <Button variant="contained" color="primary" size="large">
//           Learn More
//         </Button>
//       </Grid>

//       <IconButton
//         sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
//         aria-label="menu"
//       >
//         <MenuIcon />
//       </IconButton>
//     </Container>
//   );
// };

// export default Home;



// // Import statements for React, Material UI components, and styling utilities
// import React from 'react';
// import { Typography, Container, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled, keyframes } from '@mui/system';

// // Animation definitions
// const fadeIn = keyframes`
//   from { opacity: 0; transform: 'translateY(20px)'; }
//   to { opacity: 1; transform: 'translateY(0)'; }
// `;

// // Styled components
// const AnimatedCard = styled(Card)({
//   animation: `${fadeIn} 0.5s ease-out`,
// });

// const AnimatedImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// // Home component
// const Home = () => {
//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       {/* Application title */}
//       <Grid item xs={12}>
//         <Typography variant="h3" gutterBottom align="center">Welcome to Our Application!</Typography>
//       </Grid>

//       {/* Introduction text */}
//       <Grid item xs={12}>
//         <Typography variant="body1" gutterBottom align="justify">
//           Thank you for visiting our application. We are dedicated to making a positive impact in our community.
//         </Typography>
//       </Grid>

//       {/* Additional paragraphs with titles */}
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom>Volunteering in Israel</Typography>
//           <Typography variant="body1" gutterBottom align="justify">
//             Volunteering in Israel is an incredible way to contribute to society and make a difference. Despite the challenges, including periods of conflict and war, volunteers play a crucial role in supporting communities in need.
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom>Supporting Communities</Typography>
//           <Typography variant="body1" gutterBottom align="justify">
//             Whether it's providing aid to those affected by conflict, supporting local initiatives, or helping to build a brighter future for all, volunteering in Israel offers rewarding opportunities for personal growth and social impact.
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom>Working with Diverse Groups</Typography>
//           <Typography variant="body1" gutterBottom align="justify">
//             Additionally, volunteering often involves working with various groups, including mobilized or conscripted dogs, and lone soldier repatriates who have returned to Israel to serve in the military.
//           </Typography>
//         </Grid>
//       </Grid>

//       {/* Cards section */}
//       <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//         {/* Card 1: Volunteering Opportunities */}
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_1.jpg" alt="Volunteering in Israel" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Volunteering in Israel</Typography>
//               <Typography variant="body2">
//                 Join us in making a difference. Explore volunteer opportunities in Israel today!
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//         {/* Card 2: Support Communities */}
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_2.jpg" alt="Supporting Communities" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Support Communities in Need</Typography>
//               <Typography variant="body2">
//                 Your contribution matters. Learn how you can support communities affected by conflict and war.
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//       </Grid>

//       {/* Learn More button */}
//       <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
//         <Button variant="contained" color="primary" size="large">
//           Learn More
//         </Button>
//       </Grid>

//       {/* Floating menu button */}
//       <IconButton
//         sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
//         aria-label="menu"
//       >
//         <MenuIcon />
//       </IconButton>

//       {/* Dog image gallery */}
//       <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
//         {/* Images placeholders - replace src with your images paths */}
//         {Array.from({ length: 6 }).map((_, index) => (
//           <Grid item xs={6} md={4} lg={3} key={index}>
//             <img src={`dog_image_${index + 1}.jpg`} alt={`Dog ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Home;




// import React from 'react';
// import { Typography, Container, Grid, Card, CardContent, IconButton, Button, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled, keyframes } from '@mui/system';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


// // Анимация для карточек
// const fadeIn = keyframes`
//   from { opacity: 0; transform: 'translateY(20px)'; }
//   to { opacity: 1; transform: 'translateY(0)'; }
// `;

// // Стилизованные компоненты
// const AnimatedCard = styled(Card)({
//   animation: `${fadeIn} 0.5s ease-out`,
// });

// const AnimatedImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// // Настройки для слайдера
// const sliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   responsive: [
//     { breakpoint: 1024, settings: { slidesToShow: 2 } },
//     { breakpoint: 600, settings: { slidesToShow: 1 } },
//   ],
// };

// const Home = () => {
//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Typography variant="h3" gutterBottom align="center">Welcome to our Application!</Typography>
//       <Typography variant="body1" gutterBottom align="justify">
//         Thank you for visiting our application. We are dedicated to making a positive impact in our community.
//       </Typography>
//       <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_1.jpg" alt="Volunteer in Israel" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Volunteering in Israel</Typography>
//               <Typography variant="body2">
//                 Join us in making a difference. Explore volunteer opportunities in Israel today!
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_2.jpg" alt="Volunteer in Israel" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Support Communities in Need</Typography>
//               <Typography variant="body2">
//                 Your contribution matters. Learn how you can support communities affected by conflict and war.
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//       </Grid>
//       <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
//         Learn More
//       </Button>
//       <IconButton
//         sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
//         aria-label="menu"
//       >
//         <MenuIcon />
//       </IconButton>

//       {/* Слайдер для галереи собак */}
//       <Box sx={{ mt: 4 }}>
//         <Slider {...sliderSettings}>
//           {[...Array(6)].map((_, i) => (
//             <Box key={i} sx={{ padding: '0 10px' }}>
//               <img src={`dog_image_${i + 1}.jpg`} alt={`Dog ${i + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
//             </Box>
//           ))}
//         </Slider>
//       </Box>
//     </Container>
//   );
// };

// export default Home;



// // Import statements for React, Material-UI components, and style utilities
// import React from 'react';
// import { Typography, Container, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled, keyframes } from '@mui/system';

// // Animation definitions
// // Fade-in animation for cards
// const fadeIn = keyframes`
//   from { opacity: 0; transform: 'translateY(20px)'; }
//   to { opacity: 1; transform: 'translateY(0)'; }
// `;

// // Styled components
// // Card component with fade-in animation
// const AnimatedCard = styled(Card)({
//   animation: `${fadeIn} 0.5s ease-out`,
// });

// // Image component with hover animation
// const AnimatedImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// // Home component
// const Home = () => {
//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Typography variant="h3" gutterBottom align="center">Welcome to our Application!</Typography>
//       <Typography variant="body1" gutterBottom align="justify">
//         Thank you for visiting our application. We are dedicated to making a positive impact in our community.
//       </Typography>

//       {/* Additional descriptive text */}
//       <Typography variant="body1" gutterBottom align="justify">
//         Volunteering in Israel is an incredible way to contribute to society and make a difference. Despite the challenges, including periods of conflict and war, volunteers play a crucial role in supporting communities in need.
//       </Typography>
//       <Typography variant="body1" gutterBottom align="justify">
//         Whether it's providing aid to those affected by conflict, supporting local initiatives, or helping to build a brighter future for all, volunteering in Israel offers rewarding opportunities for personal growth and social impact.
//       </Typography>
//       <Typography variant="body1" gutterBottom align="justify">
//         Additionally, volunteering often involves working with various groups, including mobilized or conscripted dogs, and lone soldier repatriates who have returned to Israel to serve in the military.
//       </Typography>

//       {/* Card display section */}
//       <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//         {/* Volunteer opportunities card */}
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_1.jpg" alt="Volunteer in Israel" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Volunteering in Israel</Typography>
//               <Typography variant="body2">
//                 Join us in making a difference. Explore volunteer opportunities in Israel today!
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//         {/* Support communities card */}
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_2.jpg" alt="Volunteer in Israel" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Support Communities in Need</Typography>
//               <Typography variant="body2">
//                 Your contribution matters. Learn how you can support communities affected by conflict and war.
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//       </Grid>

//       {/* Call to action button */}
//       <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
//         Learn More
//       </Button>

//       {/* Floating action button */}
//       <IconButton
//         sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
//         aria-label="menu"
//       >
//         <MenuIcon />
//       </IconButton>

//       {/* Dog image gallery */}
//       <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
//         {/* Image placeholders - replace src with your image paths */}
//         {Array.from({ length: 6 }).map((_, index) => (
//           <Grid item xs={6} md={4} lg={3} key={index}>
//             <img src={`dog_image_${index + 1}.jpg`} alt={`Dog ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Home;




// import React from 'react';
// import { Typography, Container, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled } from '@mui/system';
// import { keyframes } from '@mui/system';

// // Создаем анимацию для карточек
// const fadeIn = keyframes({
//   from: { opacity: 0, transform: 'translateY(20px)' },
//   to: { opacity: 1, transform: 'translateY(0)' },
// });

// // Стилизованная компонента для карточек с анимацией
// const AnimatedCard = styled(Card)({
//   animation: `${fadeIn} 0.5s ease-out`,
// });

// // Стилизованная компонента для изображений с анимацией
// const AnimatedImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const Home = () => {
//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Typography variant="h3" gutterBottom align="center">Welcome to our Application!</Typography>
//       <Typography variant="body1" gutterBottom align="justify">
//         Thank you for visiting our application. We are dedicated to making a positive impact in our community.
//       </Typography>
//       <Typography variant="body1" gutterBottom align="justify">
//         Volunteering in Israel is an incredible way to contribute to society and make a difference. Despite the challenges, including periods of conflict and war, volunteers play a crucial role in supporting communities in need.
//       </Typography>
//       <Typography variant="body1" gutterBottom align="justify">
//         Whether it's providing aid to those affected by conflict, supporting local initiatives, or helping to build a brighter future for all, volunteering in Israel offers rewarding opportunities for personal growth and social impact.
//       </Typography>
//       <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_1.jpg" alt="Volunteer in Israel" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Volunteering in Israel</Typography>
//               <Typography variant="body2">
//                 Join us in making a difference. Explore volunteer opportunities in Israel today!
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <AnimatedCard>
//             <AnimatedImage src="volunteer_image_2.jpg" alt="Volunteer in Israel" />
//             <CardContent>
//               <Typography variant="h5" gutterBottom>Support Communities in Need</Typography>
//               <Typography variant="body2">
//                 Your contribution matters. Learn how you can support communities affected by conflict and war.
//               </Typography>
//             </CardContent>
//           </AnimatedCard>
//         </Grid>
//       </Grid>
//       <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
//         Learn More
//       </Button>
//       <IconButton
//         sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
//         aria-label="menu"
//       >
//         <MenuIcon />
//       </IconButton>
//     </Container>
//   );
// };

// export default Home;








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
