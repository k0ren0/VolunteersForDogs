import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDog, fetchUserDogs } from '../features/dogs/dogsSlice';
import { Container, Typography, TextField, Button, Select, MenuItem, Box, Snackbar, CircularProgress } from '@mui/material';

const EditDogForm = () => {
    const [selectedDogId, setSelectedDogId] = useState('');
    const [name, setName] = useState('');
    const [selectedBreed, setSelectedBreed] = useState('');
    const [age, setAge] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loadingBreeds, setLoadingBreeds] = useState(false);
    const [breedsError, setBreedsError] = useState('');
    const dispatch = useDispatch();
    const { dogs } = useSelector((state) => state.dogs);
    const [breedsList, setBreedsList] = useState([]);

    useEffect(() => {
        dispatch(fetchUserDogs());
        const fetchBreeds = async () => {
            setLoadingBreeds(true);
            try {
                const response = await fetch('https://api.thedogapi.com/v1/breeds');
                if (!response.ok) throw new Error('Failed to fetch breeds.');
                const breeds = await response.json();
                setBreedsList(breeds.map(breed => breed.name));
                setLoadingBreeds(false);
            } catch (error) {
                console.error('Error loading dog breeds:', error);
                setBreedsError('Could not load breeds. Please try again later.');
                setLoadingBreeds(false);
            }
        };
        fetchBreeds();
    }, [dispatch]);

    useEffect(() => {
        if (selectedDogId) {
            const dog = dogs.find(dog => dog.dog_id === selectedDogId);
            if (dog) {
                setName(dog.name);
                setSelectedBreed(dog.breed);
                setAge(dog.age.toString());
            }
        }
    }, [selectedDogId, dogs]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateDog({ dogId: selectedDogId, dogData: { name, breed: selectedBreed, age: Number(age) } }));
        setOpenSnackbar(true);
        dispatch(fetchUserDogs());
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>Edit Dog</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {loadingBreeds ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Select
                            fullWidth
                            value={selectedDogId}
                            onChange={(e) => setSelectedDogId(e.target.value)}
                            displayEmpty
                            required
                            margin="dense"
                        >
                            <MenuItem value="" disabled>Select Dog</MenuItem>
                            {dogs.map((dog) => (
                                <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Select
                            fullWidth
                            value={selectedBreed}
                            onChange={(e) => setSelectedBreed(e.target.value)}
                            displayEmpty
                            required
                            margin="dense"
                        >
                            <MenuItem value="" disabled>Breed</MenuItem>
                            {breedsList.map((breed, index) => (
                                <MenuItem key={index} value={breed}>{breed}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Dog
                        </Button>
                        {breedsError && <Typography color="error">{breedsError}</Typography>}
                    </>
                )}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message="Dog updated successfully"
                />
            </Box>
        </Container>
    );
};

export default EditDogForm;




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem, CircularProgress, Typography } from '@mui/material';
// // Убран import { useNavigate }, так как он закомментирован и не используется
// import { updateDog, fetchUserDogs } from '../features/dogs/dogsSlice';

// const EditDogForm = () => {
//     const [selectedDogId, setSelectedDogId] = useState('');
//     const [name, setName] = useState('');
//     const [selectedBreed, setSelectedBreed] = useState('');
//     const [age, setAge] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [loadingBreeds, setLoadingBreeds] = useState(false);
//     const [breedsError, setBreedsError] = useState('');
//     const dispatch = useDispatch();
//     const { dogs } = useSelector((state) => state.dogs);
//     const [breedsList, setBreedsList] = useState([]);

//     useEffect(() => {
//         dispatch(fetchUserDogs());
//         const fetchBreeds = async () => {
//             setLoadingBreeds(true);
//             try {
//                 const response = await fetch('https://api.thedogapi.com/v1/breeds');
//                 if (!response.ok) throw new Error('Failed to fetch breeds.');
//                 const breeds = await response.json();
//                 setBreedsList(breeds.map(breed => breed.name));
//                 setLoadingBreeds(false);
//             } catch (error) {
//                 console.error('Error loading dog breeds:', error);
//                 setBreedsError('Could not load breeds. Please try again later.');
//                 setLoadingBreeds(false);
//             }
//         };
//         fetchBreeds();
//     }, [dispatch]);

//     useEffect(() => {
//         if (selectedDogId) {
//             const dog = dogs.find(dog => dog.dog_id && dog.dog_id.toString() === selectedDogId);
//             if (dog) {
//                 setName(dog.name || '');
//                 setSelectedBreed(dog.breed || '');
//                 setAge(typeof dog.age === 'number' ? dog.age.toString() : '');
//             } else {
//                 setName('');
//                 setSelectedBreed('');
//                 setAge('');
//             }
//         }
//     }, [selectedDogId, dogs]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await dispatch(updateDog({ dogId: selectedDogId, dogData: { name, breed: selectedBreed, age: Number(age) } }));
//         setOpenSnackbar(true);
//         // После обновления собаки, обновляем список собак в состоянии приложения
//         dispatch(fetchUserDogs());
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
//             {loadingBreeds ? <CircularProgress /> : breedsError ? <Typography color="error">{breedsError}</Typography> :
//             <>
//                 <Select value={selectedDogId || ''} onChange={(e) => setSelectedDogId(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Select Dog' }} required>
//                     <MenuItem value="" disabled>Select Dog</MenuItem>
//                     {dogs.map((dog) => (
//                         dog.dog_id ? <MenuItem key={dog.dog_id} value={dog.dog_id.toString()}>{dog.name}</MenuItem> : null
//                     ))}
//                 </Select>
//                 <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                 <Select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)} displayEmpty required>
//                     <MenuItem value="" disabled>Breed</MenuItem>
//                     {breedsList.map((breed, index) => (
//                         breed ? <MenuItem key={index} value={breed}>{breed}</MenuItem> : null
//                     ))}
//                 </Select>
//                 <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
//                 <Button type="submit" variant="contained">Update Dog</Button>
//             </>}
//             <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Dog updated successfully" />
//         </Box>
//     );
// };

// export default EditDogForm;





