import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
import { updateDog, fetchDogs } from '../features/dogs/dogsSlice';

const EditDogForm = () => {
    const [selectedDogId, setSelectedDogId] = useState('');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    const { dogs } = useSelector((state) => state.dogs);
    const [breedsList, setBreedsList] = useState([]);

    useEffect(() => {
        dispatch(fetchDogs());
        const fetchBreeds = async () => {
            try {
                const response = await fetch('https://api.thedogapi.com/v1/breeds');
                const breeds = await response.json();
                setBreedsList(breeds.map(breed => breed.name));
            } catch (error) {
                console.error('Error loading dog breeds:', error);
            }
        };
        fetchBreeds();
    }, [dispatch]);

    useEffect(() => {
        if (selectedDogId) {
            const dog = dogs.find(dog => dog.dog_id.toString() === selectedDogId);
            if (dog) {
                setName(dog.name);
                setBreed(dog.breed);
                // Убедитесь, что возраст является строкой для TextField
                setAge(dog.age ? dog.age.toString() : '');
            }
        }
    }, [selectedDogId, dogs]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Обеспечиваем, что age передается как число
        dispatch(updateDog({ dogId: selectedDogId, dogData: { name, breed, age: Number(age) } }));
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
            <Select value={selectedDogId} onChange={(e) => setSelectedDogId(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Select Dog' }} required>
                <MenuItem value="" disabled>Select Dog</MenuItem>
                {dogs.map((dog) => (
                    <MenuItem key={dog.dog_id} value={dog.dog_id.toString()}>{dog.name}</MenuItem>
                ))}
            </Select>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Select label="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} required>
                {breedsList.map((breed, index) => (
                    <MenuItem key={index} value={breed}>{breed}</MenuItem>
                ))}
            </Select>
            <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            <Button type="submit" variant="contained">Update Dog</Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Dog updated successfully" />
        </Box>
    );
};

export default EditDogForm;
