import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import { updateUserProfile, fetchDogs } from "../features/users/usersSlice";
import CustomModal from "./CustomModal";

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user, dogs, status, error } = useSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (token) {
      dispatch(fetchDogs());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setDateOfBirth(user.date_of_birth || "");
    }
  }, [user]);

  // const handleUpdateProfile = () => {
  //   if (user && user.user_id) {
  //     dispatch(
  //       updateUserProfile({
  //         userId: user.user_id,
  //         userData: { email, username, firstName, lastName, dateOfBirth },
  //       })
  //     );
  //   } else {
  //     console.error("User ID is undefined");
  //   }
  // };

  const handleUpdateProfile = () => {
    if (!user || !user.user_id) {
      console.error("User or User ID is undefined");
      // Вы можете также установить сообщение об ошибке в состояние, чтобы отобразить его пользователю
      setModalMessage("User information is not complete.");
      setIsModalOpen(true);
      return;
    }
  
    dispatch(
      updateUserProfile({
        userId: user.user_id,
        userData: { email, username, firstName, lastName, dateOfBirth },
      })
    );
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Date of Birth"
        variant="outlined"
        fullWidth
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </Button>

      <Tabs value={activeTab} onChange={handleTabChange} mt={3}>
        <Tab label="My Info" />
        <Tab label="My Dogs" />
      </Tabs>

      {activeTab === 0 && (
        <Box mt={2}>
          <Typography variant="h5" gutterBottom>
            Edit My Info
          </Typography>
        </Box>
      )}

      {activeTab === 1 && (
        <Box mt={2}>
          <Typography variant="h5" gutterBottom>
            My Dogs
          </Typography>
          {dogs.map((dog) => (
            <Box
              key={dog.dog_id}
              p={2}
              border={1}
              borderColor="grey.200"
              borderRadius={4}
              mt={2}
            >
              <Typography variant="h6">{dog.name}</Typography>
              <Typography>Breed: {dog.breed}</Typography>
              <Typography>Age: {dog.age} years old</Typography>
            </Box>
          ))}
        </Box>
      )}

      {status === "loading" && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}

      <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
    </Box>
  );
};

export default Profile;
