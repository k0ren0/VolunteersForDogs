// DogsList.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDogs, deleteDog } from '../features/dogs/dogsSlice';
import { Typography, CircularProgress, List, ListItem, ListItemText, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const DogsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dogs, status, error } = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(fetchDogs());
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
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>My Dogs</Typography>
            <List>
                {dogs.length ? dogs.map(dog => (
                    <ListItem key={dog.dog_id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditDog(dog.dog_id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDog(dog.dog_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={`${dog.name} - ${dog.breed} - ${dog.age} years`} />
                    </ListItem>
                )) : <Typography>No dogs found</Typography>}
            </List>
        </Box>
    );
};

export default DogsList;





//work

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDogs } from '../features/dogs/dogsSlice';
// import { Typography, CircularProgress, List, ListItem, ListItemText, Box } from '@mui/material';

// const DogsList = () => {
//     const dispatch = useDispatch();
//     const { dogs, status, error } = useSelector((state) => state.dogs);

//     useEffect(() => {
//         dispatch(fetchDogs());
//     }, [dispatch]);

//     if (status === 'loading') return <CircularProgress />;
//     if (error) return <Typography color="error">Error: {error}</Typography>;

//     return (
//         <Box sx={{ p: 2 }}>
//             <Typography variant="h4" gutterBottom>My Dogs</Typography>
//             <List>
//                 {dogs.length ? dogs.map(dog => (
//                     <ListItem key={dog.dog_id}>
//                         <ListItemText primary={`${dog.name} - ${dog.breed} - ${dog.age} years`} />
//                     </ListItem>
//                 )) : <Typography>No dogs found</Typography>}
//             </List>
//         </Box>
//     );
// };

// export default DogsList;
