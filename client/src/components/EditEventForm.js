import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { updateDog, fetchUserDogs } from '../features/dogs/dogsSlice';

const EditDogForm = ({ updateDogList }) => {
    const [selectedDogId, setSelectedDogId] = useState('');
    const [name, setName] = useState('');
    const [selectedBreed, setSelectedBreed] = useState('');
    const [age, setAge] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs.dogs); 

    useEffect(() => {
        if (selectedDogId) {
            const dog = dogs.find(dog => dog.dog_id && dog.dog_id.toString() === selectedDogId);
            if (dog) {
                setName(dog.name || '');
                setSelectedBreed(dog.breed || '');
                setAge(typeof dog.age === 'number' ? dog.age.toString() : '');
            } else {
                setName('');
                setSelectedBreed('');
                setAge('');
            }
        }
    }, [selectedDogId, dogs]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateDog({ dogId: selectedDogId, dogData: { name, breed: selectedBreed, age: Number(age) } }));
        setOpenSnackbar(true);
        dispatch(fetchUserDogs());
        updateDogList();
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
            <FormControl>
                <InputLabel id="dog-select-label">Select Dog</InputLabel>
                <Select
                    labelId="dog-select-label"
                    value={selectedDogId}
                    onChange={(e) => setSelectedDogId(e.target.value)}
                    required
                >
                    <MenuItem value="" disabled>Select Dog</MenuItem>
                    {dogs && dogs.map((dog) => (
                        <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            <FormControl>
                <InputLabel id="breed-label">Breed</InputLabel>
                <Select
                    labelId="breed-label"
                    value={selectedBreed}
                    onChange={(e) => setSelectedBreed(e.target.value)}
                    required
                >
                    {/* Add breed options */}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained">Update Dog</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Dog updated successfully"
            />
        </Box>
    );
};

export default EditDogForm;







// // EditEventForm.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem, CircularProgress, Typography } from '@mui/material';
// import { updateEvent, fetchEvents } from '../features/events/eventsSlice';

// const EditEventForm = ({ eventId }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [date, setDate] = useState('');
//     const [selectedCountry, setSelectedCountry] = useState('Israel'); // Установка Израиля по умолчанию
//     const [selectedCity, setSelectedCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState('');
//     const [eventType, setEventType] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [endTime, setEndTime] = useState('');
//     const [daysOfWeek, setDaysOfWeek] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const { events } = useSelector((state) => state.events);

//     useEffect(() => {
//         if (eventId) {
//             const event = events.find(event => event.event_id && event.event_id.toString() === eventId);
//             if (event) {
//                 setTitle(event.title || '');
//                 setDescription(event.description || '');
//                 setDate(event.date || '');
//                 setSelectedCountry(event.country || '');
//                 setSelectedCity(event.city || '');
//                 setVolunteerNeeded(event.volunteerNeeded || '');
//                 setEventType(event.eventType || '');
//                 setStartTime(event.startTime || '');
//                 setEndTime(event.endTime || '');
//                 setDaysOfWeek(event.daysOfWeek || '');
//             }
//         }
//     }, [eventId, events]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             await dispatch(updateEvent({
//                 eventId,
//                 eventData: {
//                     title,
//                     description,
//                     date,
//                     country: selectedCountry,
//                     city: selectedCity,
//                     volunteerNeeded: Number(volunteerNeeded),
//                     eventType,
//                     startTime,
//                     endTime,
//                     daysOfWeek
//                 }
//             }));
//             setOpenSnackbar(true);
//             dispatch(fetchEvents());
//         } catch (error) {
//             console.error('Error updating event:', error);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
//             <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//             <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//             <TextField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//             <Select label="Country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
//                 {/* Здесь можно динамически загружать список стран из API, но Израиль будет установлен по умолчанию */}
//                 <MenuItem value="Israel">Israel</MenuItem>
//                 {/* Остальные страны будут загружены из API */}
//             </Select>
//             <TextField label="City" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required />
//             <TextField label="Volunteer Needed" type="number" value={volunteerNeeded} onChange={(e) => setVolunteerNeeded(e.target.value)} required />
//             <Select label="Event Type" value={eventType} onChange={(e) => setEventType(e.target.value)} required>
//                 <MenuItem value="volunteer">Volunteer</MenuItem>
//                 <MenuItem value="customer">Customer</MenuItem>
//             </Select>
//             <TextField label="Start Time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
//             <TextField label="End Time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
//             <TextField label="Days of Week" value={daysOfWeek} onChange={(e) => setDaysOfWeek(e.target.value)} required />
//             <Button type="submit" variant="contained">Update Event</Button>
//             <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Event updated successfully" />
//         </Box>
//     );
// };

// export default EditEventForm;



