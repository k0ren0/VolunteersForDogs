import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, CircularProgress, Card, CardContent, Tab, Tabs, Grid, Paper } from '@mui/material';
import { updateUserProfile, fetchUsers, fetchDogs, fetchEvents, addDog } from '../features/users/usersSlice'; 
import CustomModal from './CustomModal';
// Удалено импортирование selectUserProfile, так как оно не используется после исправления

function Profile() {
  const dispatch = useDispatch();
  // Изменено на прямой доступ к auth и users из состояния
  const { token } = useSelector((state) => state.auth);
  const usersState = useSelector((state) => state.users); // Получаем весь state users
  const { user, events, dogs, status, error } = usersState; // Деструктуризация уже из usersState

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(fetchEvents());
      dispatch(fetchUsers(id)); // Здесь нужно убедиться, что id правильно используется в fetchUsers
      dispatch(fetchDogs(id)); // Обновлено для передачи id пользователя
    }
  }, [dispatch, token, id]);

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
  
    dispatch(updateUserProfile({
      userId: user.user_id,
      userData: { email, username, firstName, lastName, dateOfBirth },
    }));
  };
  

  const handleAddDog = () => {
    dispatch(addDog({ name: dogName, breed: dogBreed, age: dogAge }));
    setDogName('');
    setDogBreed('');
    setDogAge('');
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
        {selectedTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Date of Birth" variant="outlined" fullWidth type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>Save</Button>
            </Grid>
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>Add New Dog</Typography>
            <TextField label="Name" variant="outlined" value={dogName} onChange={(e) => setDogName(e.target.value)} fullWidth margin="normal" />
            <TextField label="Breed" variant="outlined" value={dogBreed} onChange={(e) => setDogBreed(e.target.value)} fullWidth margin="normal" />
            <TextField label="Age" variant="outlined" value={dogAge} onChange={(e) => setDogAge(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleAddDog} sx={{ mt: 2 }}>Add Dog</Button>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>My Dogs</Typography>
            <Grid container spacing={2}>
              {dogs.map((dog) => (
                <Grid item xs={12} sm={6} md={4} key={dog.dog_id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{dog.name}</Typography>
                      <Typography>Breed: {dog.breed}</Typography>
                      <Typography>Age: {dog.age} years old</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {selectedTab === 2 && (
          <Grid container spacing={2}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.event_id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography>{event.description}</Typography>
                    <Typography>Date: {event.date}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {status === 'loading' && <CircularProgress />}
        {error && <Typography color="error">Error: {error}</Typography>}

        <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
      </Box>
    </Box>
  );
}

export default Profile;

//new

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, TextField, Button, Typography, CircularProgress, Card, CardContent, Tab, Tabs, Grid, Paper } from '@mui/material';
// import { updateUserProfile, fetchUsers, fetchDogs, fetchEvents, addDog } from '../features/users/usersSlice'; // Исправлены импорты
// import CustomModal from './CustomModal';
// import { selectUserProfile } from '../features/users/usersSlice';

// function Profile() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { user, events, dogs, status, error } = useSelector(selectUserProfile);
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

//   const { id } = useParams();

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchEvents());
//       dispatch(fetchUsers(id));
//       dispatch(fetchDogs());
//     }
//   }, [dispatch, token, id]);

//   useEffect(() => {
//     if (user) {
//       setEmail(user.email || '');
//       setUsername(user.username || '');
//       setFirstName(user.firstName || '');
//       setLastName(user.lastName || '');
//       setDateOfBirth(user.dateOfBirth || '');
//     }
//   }, [user]);

//   const handleUpdateProfile = () => {
//     if (!user || !user.user_id) {
//       console.error('User or User ID is undefined');
//       setModalMessage('User information is not complete.');
//       setIsModalOpen(true);
//       return;
//     }
  
//     dispatch(updateUserProfile({
//       userId: user.user_id,
//       userData: { email, username, firstName, lastName, dateOfBirth },
//     }));
//   };
  

//   const handleAddDog = () => {
//     dispatch(addDog({ name: dogName, breed: dogBreed, age: dogAge }));
//     setDogName('');
//     setDogBreed('');
//     setDogAge('');
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalMessage('');
//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>My Info</Typography>

//       <Paper sx={{ marginBottom: 2 }}>
//         <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs" centered>
//           <Tab label="My Info" />
//           <Tab label="My Dogs" />
//           <Tab label="My Events" />
//         </Tabs>
//       </Paper>

//       <Box mt={2}>
//         {selectedTab === 0 && (
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
//           <Box>
//             <Typography variant="h5" gutterBottom>Add New Dog</Typography>
//             <TextField label="Name" variant="outlined" value={dogName} onChange={(e) => setDogName(e.target.value)} fullWidth margin="normal" />
//             <TextField label="Breed" variant="outlined" value={dogBreed} onChange={(e) => setDogBreed(e.target.value)} fullWidth margin="normal" />
//             <TextField label="Age" variant="outlined" value={dogAge} onChange={(e) => setDogAge(e.target.value)} fullWidth margin="normal" />
//             <Button variant="contained" color="primary" onClick={handleAddDog} sx={{ mt: 2 }}>Add Dog</Button>

//             <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>My Dogs</Typography>
//             <Grid container spacing={2}>
//               {dogs.map((dog) => (
//                 <Grid item xs={12} sm={6} md={4} key={dog.dog_id}>
//                   <Card variant="outlined">
//                     <CardContent>
//                       <Typography variant="h6">{dog.name}</Typography>
//                       <Typography>Breed: {dog.breed}</Typography>
//                       <Typography>Age: {dog.age} years old</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         )}

//         {selectedTab === 2 && (
//           <Grid container spacing={2}>
//             {events.map((event) => (
//               <Grid item xs={12} sm={6} md={4} key={event.event_id}>
//                 <Card variant="outlined">
//                   <CardContent>
//                     <Typography variant="h6">{event.title}</Typography>
//                     <Typography>{event.description}</Typography>
//                     <Typography>Date: {event.date}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {status === 'loading' && <CircularProgress />}
//         {error && <Typography color="error">Error: {error}</Typography>}

//         <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
//       </Box>
//     </Box>
//   );
// }

// export default Profile;
