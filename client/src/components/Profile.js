import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, CircularProgress, Card, CardContent, Tab, Tabs, Grid, Paper } from '@mui/material';
import { updateUserProfile, fetchDogs, fetchEvents } from '../features/users/usersSlice';
import CustomModal from './CustomModal';

function Profile() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { user, dogs, events, status, error } = useSelector((state) => state.users);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        if (token) {
            dispatch(fetchDogs());
            dispatch(fetchEvents());
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
            setUsername(user.username || "");
            setFirstName(user.first_name || "");
            setLastName(user.last_name || "");
            setDateOfBirth(user.date_of_birth || "");
        }
    }, [user]);

    const handleUpdateProfile = () => {
        if (!user || !user.user_id) {
            console.error("User or User ID is undefined");
            setModalMessage("User information is not complete.");
            setIsModalOpen(true);
            return;
        }

        dispatch(updateUserProfile({
            userId: user.user_id,
            userData: { email, username, firstName, lastName, dateOfBirth },
        }));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Profile Info</Typography>

            <Paper sx={{ marginBottom: 2 }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs" centered>
                    <Tab label="Info" />
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
                            <Typography variant="h6" gutterBottom>Current Info</Typography>
                            <Typography>Email: {user ? user.email || "-" : "-"}</Typography>
                            <Typography>Username: {user ? user.username || "-" : "-"}</Typography>
                            <Typography>First Name: {user ? user.first_name || "-" : "-"}</Typography>
                            <Typography>Last Name: {user ? user.last_name || "-" : "-"}</Typography>
                            <Typography>Date of Birth: {user ? user.date_of_birth || "-" : "-"}</Typography>
                        </Grid>
                    </Grid>
                )}

                {selectedTab === 1 && (
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

                <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>Update Profile</Button>

                {status === "loading" && <CircularProgress />}
                {error && <Typography color="error">Error: {error}</Typography>}

                <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
            </Box>
        </Box>
    );
}

export default Profile;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, TextField, Button, Typography, CircularProgress, Card, CardContent, Tab, Tabs, Grid, Paper } from '@mui/material';
// import { updateUserProfile, fetchDogs, fetchEvents } from '../features/users/usersSlice';
// import CustomModal from './CustomModal';

// function Profile() {
//     const dispatch = useDispatch();
//     const { token } = useSelector((state) => state.auth);
//     const { user, dogs, events, status, error } = useSelector((state) => state.users);
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMessage, setModalMessage] = useState("");
//     const [selectedTab, setSelectedTab] = useState(0);

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchDogs());
//             dispatch(fetchEvents());
//         }
//     }, [dispatch, token]);

//     useEffect(() => {
//         if (user) {
//             setEmail(user.email);
//             setUsername(user.username);
//             setFirstName(user.first_name || "");
//             setLastName(user.last_name || "");
//             setDateOfBirth(user.date_of_birth || "");
//         }
//     }, [user]);

//     const handleUpdateProfile = () => {
//         if (!user || !user.user_id) {
//             console.error("User or User ID is undefined");
//             setModalMessage("User information is not complete.");
//             setIsModalOpen(true);
//             return;
//         }

//         dispatch(updateUserProfile({
//             userId: user.user_id,
//             userData: { email, username, firstName, lastName, dateOfBirth },
//         }));
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setModalMessage("");
//     };

//     const handleTabChange = (event, newValue) => {
//         setSelectedTab(newValue);
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h4" gutterBottom>Profile Info</Typography>

//             <Paper sx={{ marginBottom: 2 }}>
//                 <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs" centered>
//                     <Tab label="Info" />
//                     <Tab label="My Dogs" />
//                     <Tab label="My Events" />
//                 </Tabs>
//             </Paper>

//             <Box mt={2}>
//                 {selectedTab === 0 && (
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField label="Date of Birth" variant="outlined" fullWidth type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//                         </Grid>
//                     </Grid>
//                 )}

//                 {selectedTab === 1 && (
//                     <Grid container spacing={2}>
//                         {dogs.map((dog) => (
//                             <Grid item xs={12} sm={6} md={4} key={dog.dog_id}>
//                                 <Card variant="outlined">
//                                     <CardContent>
//                                         <Typography variant="h6">{dog.name}</Typography>
//                                         <Typography>Breed: {dog.breed}</Typography>
//                                         <Typography>Age: {dog.age} years old</Typography>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 )}

//                 {selectedTab === 2 && (
//                     <Grid container spacing={2}>
//                         {events.map((event) => (
//                             <Grid item xs={12} sm={6} md={4} key={event.event_id}>
//                                 <Card variant="outlined">
//                                     <CardContent>
//                                         <Typography variant="h6">{event.title}</Typography>
//                                         <Typography>{event.description}</Typography>
//                                         <Typography>Date: {event.date}</Typography>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 )}

//                 <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>Update Profile</Button>

//                 {status === "loading" && <CircularProgress />}
//                 {error && <Typography color="error">Error: {error}</Typography>}

//                 <CustomModal isOpen={isModalOpen} message={modalMessage} onRequestClose={closeModal} />
//             </Box>
//         </Box>
//     );
// }

// export default Profile;







