import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button } from '@mui/material';
import { updateUserProfile, fetchDogs } from '../features/users/usersSlice';
import CustomModal from './CustomModal';

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users, dogs, status, error } = useSelector((state) => state.users);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchDogs());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (users.length > 0) {
      setEmail(users[0].email);
      setUsername(users[0].username);
    }
  }, [users]);

  const handleUpdateProfile = () => {
    const userId = users[0].id;
    dispatch(updateUserProfile({ userId, userData: { email, username } }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
      <h2>My Dogs</h2>
      {dogs.map((dog) => (
        <div key={dog.id}>
          <p>{dog.name}</p>
          <p>{dog.breed}</p>
          <p>{dog.age} years old</p>
        </div>
      ))}
      {status === 'loading' && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
    </div>
  );
};

export default Profile;
