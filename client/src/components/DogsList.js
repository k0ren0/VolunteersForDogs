import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDogs, deleteDog } from '../features/dogs/dogsSlice';
import { Container, Typography, CircularProgress, IconButton, Card, CardActions, CardContent, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AddDogForm from './AddDogForm';


const DogsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dogs, status, error } = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(fetchUserDogs());
    }, [dispatch]);

    const handleEditDog = (dogId) => {
        navigate(`/dogs/${dogId}/edit`);
    };

    const handleDeleteDog = (dogId) => {
        dispatch(deleteDog(dogId));
    };

    if (status === 'loading') return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>My Dogs</Typography>
            <AddDogForm updateDogList={() => dispatch(fetchUserDogs())} />
            <Grid container spacing={2}>
                {dogs.length ? dogs.map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${dog.dog_id}-${index}`}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">{dog.name}</Typography>
                                <Typography color="text.secondary">{dog.breed}</Typography>
                                <Typography variant="body2">{dog.age} years old</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => handleEditDog(dog.dog_id)}><EditIcon /></IconButton>
                                <IconButton onClick={() => handleDeleteDog(dog.dog_id)}><DeleteIcon /></IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                )) : <Typography sx={{ mt: 2 }}>No dogs found</Typography>}
            </Grid>
        </Container>
    );
};

export default DogsList;



// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserDogs, deleteDog } from '../features/dogs/dogsSlice';
// import { Typography, CircularProgress, List, ListItem, ListItemText, Box, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
// import AddDogForm from './AddDogForm';

// const DogsList = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { dogs, status, error } = useSelector((state) => state.dogs);

//     useEffect(() => {
//         dispatch(fetchUserDogs());
//     }, [dispatch]);

//     const handleEditDog = (dogId) => {
//         navigate(`/dogs/${dogId}/edit`);
//     };

//     const handleDeleteDog = (dogId) => {
//         dispatch(deleteDog(dogId));
//     };

//     const updateDogList = () => {
//         dispatch(fetchUserDogs());
//     };

//     if (status === 'loading') return <CircularProgress />;
//     if (error) return <Typography color="error">Error: {error}</Typography>;

//     return (
//         <Box sx={{ p: 2 }}>
//             <Typography variant="h4" gutterBottom>My Dogs</Typography>
//             <AddDogForm updateDogList={updateDogList} />
//             <List>
//                 {dogs.length ? dogs.map((dog, index) => (
//                     <ListItem key={`${dog.dog_id}-${index}`} secondaryAction={
//                         <>
//                             <IconButton edge="end" aria-label="edit" onClick={() => handleEditDog(dog.dog_id)}>
//                                 <EditIcon />
//                             </IconButton>
//                             <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDog(dog.dog_id)}>
//                                 <DeleteIcon />
//                             </IconButton>
//                         </>
//                     }>
//                         <ListItemText primary={`${dog.name} - ${dog.breed} - ${dog.age} years`} />
//                     </ListItem>
//                 )) : <Typography>No dogs found</Typography>}
//             </List>
//         </Box>
//     );
// };

// export default DogsList;



