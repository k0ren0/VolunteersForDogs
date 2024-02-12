import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const UserProfileForm = ({ userData, onUpdate }) => {
  const [email, setEmail] = useState(userData.email || '');
  const [username, setUsername] = useState(userData.username || '');
  const [firstName, setFirstName] = useState(userData.firstName || '');
  const [lastName, setLastName] = useState(userData.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ email, username, firstName, lastName, dateOfBirth });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </form>
  );
};

export default UserProfileForm;
