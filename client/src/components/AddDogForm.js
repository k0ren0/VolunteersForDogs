import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addDog } from '../features/dogs/dogsSlice';
import { Container, Typography, TextField, Button, Select, MenuItem, Box, Snackbar, CircularProgress } from '@mui/material';

const AddDogForm = ({ updateDogList }) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [breedsList, setBreedsList] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBreeds = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.thedogapi.com/v1/breeds');
                const breeds = await response.json();
                setBreedsList(breeds.map(breed => breed.name));
            } catch (error) {
                console.error('Error loading dog breeds:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBreeds();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await dispatch(addDog({ name, breed, age: Number(age) }));
            setName('');
            setBreed('');
            setAge('');
            setOpenSnackbar(true);

            // После успешного добавления обновляем список собак
            if (updateDogList) updateDogList();
        } catch (error) {
            console.error('Error saving dog:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>Add New Dog</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    margin="normal"
                />
                <Select
                    fullWidth
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    required
                    displayEmpty
                    inputProps={{ 'aria-label': 'Breed' }}
                    margin="normal"
                >
                    <MenuItem value="" disabled>Select Breed</MenuItem>
                    {breedsList.map((breed, index) => (
                        <MenuItem key={index} value={breed}>{breed}</MenuItem>
                    ))}
                </Select>
                <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Add Dog
                </Button>
                {loading && <CircularProgress />}
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Dog added successfully"
            />
        </Container>
    );
};

export default AddDogForm;




// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addDog } from '../features/dogs/dogsSlice';

// const AddDogForm = ({ updateDogList }) => {
//     const [name, setName] = useState('');
//     const [breed, setBreed] = useState('');
//     const [age, setAge] = useState('');
//     const [breedsList, setBreedsList] = useState([]);
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchBreeds = async () => {
//             try {
//                 const response = await fetch('https://api.thedogapi.com/v1/breeds');
//                 const breeds = await response.json();
//                 setBreedsList(breeds.map(breed => breed.name));
//             } catch (error) {
//                 console.error('Error loading dog breeds:', error);
//             }
//         };

//         fetchBreeds();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
//             if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

//             await dispatch(addDog({ name, breed, age: Number(age) }));
//             setName('');
//             setBreed('');
//             setAge('');
//             setOpenSnackbar(true);

//             // После успешного добавления обновляем список собак
//             updateDogList();
//         } catch (error) {
//             console.error('Error saving dog:', error);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//                 '& > :not(style)': { m: 1 }
//             }}
//             noValidate
//             autoComplete="off"
//         >
//             <TextField
//                 label="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <Select
//                 label="Breed"
//                 value={breed}
//                 onChange={(e) => setBreed(e.target.value)}
//                 required
//             >
//                 {breedsList.map((breed, index) => (
//                     <MenuItem key={index} value={breed}>{breed}</MenuItem>
//                 ))}
//             </Select>
//             <TextField
//                 label="Age"
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 required
//             />
//             <Button type="submit" variant="contained">Add Dog</Button>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 message="Dog added successfully"
//             />
//         </Box>
//     );
// };

// export default AddDogForm;






