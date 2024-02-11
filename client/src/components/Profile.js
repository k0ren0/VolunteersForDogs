import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, Card, CardContent, Tab, Tabs, Grid, Paper } from '@mui/material';
import { updateUserById, fetchUserById, fetchUserEvents, fetchDogs, fetchEvents, addDog } from '../features/users/usersSlice';
import CustomModal from './CustomModal';
// Убедитесь, что пути к этим компонентам указаны правильно
import DogsList from './DogsList';
import AddDogForm from './AddDogForm';

function Profile() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const usersState = useSelector((state) => state.users);
  const { user, dogs, events } = usersState;
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const { id: user_id } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(fetchEvents());
      dispatch(fetchUserById(user_id));
      dispatch(fetchDogs(user_id));
      dispatch(fetchUserEvents(user_id));
    }
  }, [dispatch, token, user_id]);
  
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setUsername(user.username || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setDateOfBirth(user.dateOfBirth || '');
    }
  }, [user]);

  const handleUpdateProfile = () => {
    if (!user || !user.user_id) {
      console.error('User or User ID is undefined');
      setModalMessage('User information is not complete.');
      setIsModalOpen(true);
      return;
    }
  
    dispatch(updateUserById({
      userId: user.user_id,
      userData: { email, username, firstName, lastName, dateOfBirth },
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Info</Typography>
      <Paper sx={{ marginBottom: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs" centered>
          <Tab label="My Profile" />
          <Tab label="My Dogs" />
          <Tab label="My Events" />
        </Tabs>
      </Paper>

      <Box mt={2}>
        {selectedTab === 0 && user && (
          <Grid container spacing={2}>
            {/* Форма профиля пользователя */}
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box mt={2}>
            <Typography variant="h5" gutterBottom>My Dogs</Typography>
            <DogsList />
            <AddDogForm />
          </Box>
        )}

        {selectedTab === 2 && (
          <Box mt={2}>
            <Typography variant="h5" gutterBottom>My Events</Typography>
            {/* Код для отображения событий пользователя */}
          </Box>
        )}

        <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
      </Box>
    </Box>
  );
}

export default Profile;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, TextField, Button, Typography, Card, CardContent, Tab, Tabs, Grid, Paper } from '@mui/material';
// import { updateUserById, fetchUserById, fetchUserEvents, fetchDogs, fetchEvents, addDog } from '../features/users/usersSlice';
// import CustomModal from './CustomModal';

// function Profile() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const usersState = useSelector((state) => state.users);
//   const { user, dogs, events } = usersState;
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [dogName, setDogName] = useState('');
//   const [dogBreed, setDogBreed] = useState('');
//   const [dogAge, setDogAge] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   const [selectedTab, setSelectedTab] = useState(0);
//   const { id: user_id } = useParams();

//   useEffect(() => {
//     console.log('Effect for fetching data with token:', token);
//     if (token) {
//       dispatch(fetchEvents());
//       dispatch(fetchUserById(user_id));
//       dispatch(fetchDogs(user_id));
//       dispatch(fetchUserEvents(user_id));
//     }
//   }, [dispatch, token, user_id]);
  
//   useEffect(() => {
//     console.log('User data effect:', user);
//     if (user) {
//       setEmail(user.email || '');
//       setUsername(user.username || '');
//       setFirstName(user.firstName || '');
//       setLastName(user.lastName || '');
//       setDateOfBirth(user.dateOfBirth || '');
//     }
//   }, [user]);

//   const handleUpdateProfile = () => {
//     console.log('Updating profile with data:', { email, username, firstName, lastName, dateOfBirth });
//     if (!user || !user.user_id) {
//       console.error('User or User ID is undefined');
//       setModalMessage('User information is not complete.');
//       setIsModalOpen(true);
//       return;
//     }
  
//     dispatch(updateUserById({
//       userId: user.user_id,
//       userData: { email, username, firstName, lastName, dateOfBirth },
//     }));
//   };

//   const handleAddDog = () => {
//     console.log('Adding dog with data:', { dogName, dogBreed, dogAge });
//     dispatch(addDog({ name: dogName, breed: dogBreed, age: dogAge }));
//     setDogName('');
//     setDogBreed('');
//     setDogAge('');
//   };

//   const closeModal = () => {
//     console.log('Closing modal');
//     setIsModalOpen(false);
//     setModalMessage('');
//   };

//   const handleTabChange = (event, newValue) => {
//     console.log('Changing tab to:', newValue);
//     setSelectedTab(newValue);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>My Info</Typography>

//       <Paper sx={{ marginBottom: 2 }}>
//         <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs" centered>
//           <Tab label="My Profile" />
//           <Tab label="My Dogs" />
//           <Tab label="My Events" />
//         </Tabs>
//       </Paper>

//       <Box mt={2}>
//         {selectedTab === 0 && user && (
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Date of Birth" variant="outlined" fullWidth type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>Save</Button>
//             </Grid>
//           </Grid>
//         )}

//         {selectedTab === 1 && (
//           <Box mt={2}>
//             <Typography variant="h5" gutterBottom>My Dogs</Typography>
//             {dogs.map((dog) => (
//               <Card key={dog.dog_id}>
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     {dog.name}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     Breed: {dog.breed}, Age: {dog.age}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//             <Grid container spacing={2} mt={2}>
//               <Grid item xs={12} sm={4}>
//                 <TextField label="Dog Name" variant="outlined" fullWidth value={dogName} onChange={(e) => setDogName(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField label="Dog Breed" variant="outlined" fullWidth value={dogBreed} onChange={(e) => setDogBreed(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField label="Dog Age" variant="outlined" fullWidth value={dogAge} onChange={(e) => setDogAge(e.target.value)} />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary" onClick={handleAddDog}>Add Dog</Button>
//               </Grid>
//             </Grid>
//           </Box>
//         )}

//         {selectedTab === 2 && (
//           <Box mt={2}>
//             <Typography variant="h5" gutterBottom>My Events</Typography>
//             {/* Рендеринг событий пользователя */}
//             {events.map((event) => (
//               <Card key={event.event_id}>
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     {event.name}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     Date: {event.date}, Location: {event.location}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         )}

//         <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
//       </Box>
//     </Box>
//   );
// }

// export default Profile;




