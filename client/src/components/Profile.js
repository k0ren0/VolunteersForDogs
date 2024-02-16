import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, Tabs, Tab, Grid } from '@mui/material';
import { updateUserById, fetchUserById, fetchUserEvents, fetchUserDogs, fetchEvents } from '../features/users/usersSlice';
import CustomModal from './CustomModal';
import DogsList from './DogsList';
import EditDogForm from './EditDogForm';
import UserProfileForm from './UserProfileForm';
// import AddDogForm from './AddDogForm';
import AddEventForm from './AddEventForm';
import EventsList from './EventsList';
// import EditEventForm from './EditEventForm';

function Profile() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const usersState = useSelector((state) => state.users);
  const { user } = usersState;
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
      dispatch(fetchUserDogs(user_id));
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

  const handleUpdateById = () => {
    if (!user || !user_id) {
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
            <UserProfileForm userData={user} onUpdate={handleUpdateById} />
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box mt={2}>
            <Typography variant="h5" gutterBottom>My Dogs</Typography>
            <DogsList />
            <EditDogForm />
            {/* <AddDogForm/> */}
          </Box>
        )}

        {selectedTab === 2 && (
          <Box mt={2}>
            <Typography variant="h5" gutterBottom>My Events</Typography>
            <AddEventForm />
            <EventsList />
            {/* <EditEventForm /> */}
            </Box>
        )}

        <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
      </Box>
    </Box>
  );
}

export default Profile;




