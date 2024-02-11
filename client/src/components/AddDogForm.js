import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import axios from 'axios'; 
import { addDog } from '../features/dogs/dogsSlice'; // Import the action creator

const AddDogForm = () => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [breedsList, setBreedsList] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
            if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

            // Dispatch the action to add a new dog
            dispatch(addDog({ name, breed, age: Number(age) }));

            // Update component state and show Snackbar
            setName('');
            setBreed('');
            setAge('');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error saving dog:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& > :not(style)': { m: 1 }
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Select
                label="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
            >
                {breedsList.map((breed, index) => (
                    <MenuItem key={index} value={breed}>{breed}</MenuItem>
                ))}
            </Select>
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







// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addDog } from '../features/dogs/dogsSlice';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';

// const AddDogForm = () => {
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
//                 console.error('Ошибка загрузки пород собак:', error);
//             }
//         };

//         fetchBreeds();
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(addDog({ name, breed, age: Number(age) }));
//         setName('');
//         setBreed('');
//         setAge('');
//         setOpenSnackbar(true); // Открыть Snackbar после отправки формы
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
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




// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addDog } from '../features/dogs/dogsSlice';
// import { TextField, Button, Box } from '@mui/material';

// const AddDogForm = () => {
//     const [name, setName] = useState('');
//     const [breed, setBreed] = useState('');
//     const [age, setAge] = useState('');
//     const dispatch = useDispatch();
//     // Использование useSelector для получения user_id из состояния auth
//     const userId = useSelector((state) => state.auth.user_id);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Логирование перед отправкой данных
//         console.log("Sending dog data with user_id:", userId);

//         if (userId) {
//             dispatch(addDog({ name, breed, age: Number(age), user_id: userId }));
//             setName('');
//             setBreed('');
//             setAge('');
//         } else {
//             console.error("User ID is not available");
//             // Обработка случая, когда user_id недоступен
//         }
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
//             <TextField
//                 label="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <TextField
//                 label="Breed"
//                 value={breed}
//                 onChange={(e) => setBreed(e.target.value)}
//                 required
//             />
//             <TextField
//                 label="Age"
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 required
//             />
//             <Button type="submit" variant="contained">Add Dog</Button>
//         </Box>
//     );
// };

// export default AddDogForm;


