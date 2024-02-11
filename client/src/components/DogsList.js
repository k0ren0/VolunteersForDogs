import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDogs } from '../features/dogs/dogsSlice';
import { Typography, CircularProgress, List, ListItem, ListItemText, Box } from '@mui/material';

const DogsList = () => {
    const dispatch = useDispatch();
    const { dogs, status, error } = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(fetchDogs());
    }, [dispatch]);

    if (status === 'loading') return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>My Dogs</Typography>
            <List>
                {dogs.length ? dogs.map(dog => (
                    <ListItem key={dog.dog_id}>
                        <ListItemText primary={`${dog.name} - ${dog.breed} - ${dog.age} years`} />
                    </ListItem>
                )) : <Typography>No dogs found</Typography>}
            </List>
        </Box>
    );
};

export default DogsList;
