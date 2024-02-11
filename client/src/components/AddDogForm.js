import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDog } from '../features/dogs/dogsSlice';
import { TextField, Button, Box, Snackbar } from '@mui/material';

const AddDogForm = () => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addDog({ name, breed, age: Number(age) }));
        setName('');
        setBreed('');
        setAge('');
        setOpenSnackbar(true); // Открыть Snackbar после отправки формы
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
            />
            <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            <Button type="submit" variant="contained">Add Dog</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Dog added successfully"
            />
        </Box>
    );
};

export default AddDogForm;
