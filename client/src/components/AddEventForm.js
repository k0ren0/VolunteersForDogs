import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
import { addEvent } from '../features/events/eventsSlice';
import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

const AddEventForm = ({ updateEventList }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [volunteerNeeded, setVolunteerNeeded] = useState('');
    const [eventType, setEventType] = useState('volunteer');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [selectedDog, setSelectedDog] = useState(''); // Состояние для хранения выбранной собаки
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    const userDogs = useSelector(selectUserDogs); // Получаем список собак пользователя

    useEffect(() => {
        const loadUserDogs = async () => {
            try {
                await dispatch(fetchUserDogs());
            } catch (error) {
                console.error('Error fetching user dogs:', error);
            }
        };

        loadUserDogs();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await dispatch(addEvent({
                title,
                description,
                date,
                country,
                city,
                volunteerNeeded: Number(volunteerNeeded),
                eventType,
                startTime,
                endTime,
                days_of_week: daysOfWeek.join(', '),
                dogId: selectedDog // Добавляем выбранную собаку в объект события
            }));

            setTitle('');
            setDescription('');
            setDate('');
            setCountry('');
            setCity('');
            setVolunteerNeeded('');
            setEventType('volunteer');
            setStartTime('');
            setEndTime('');
            setDaysOfWeek([]);
            setSelectedDog(''); // Сбрасываем выбранную собаку

            setOpenSnackbar(true);

            updateEventList();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleDayChange = (event) => {
        setDaysOfWeek(event.target.value);
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
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <TextField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <TextField
                label="Volunteers Needed"
                type="number"
                value={volunteerNeeded}
                onChange={(e) => setVolunteerNeeded(e.target.value)}
                required
            />
            <Select
                label="Event Type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
            >
                <MenuItem value="volunteer">Volunteer</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
            </Select>
            <TextField
                label="Start Time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                inputProps={{
                    step: 900, // 15 минут
                }}
            />
            <TextField
                label="End Time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                inputProps={{
                    step: 900, // 15 минут
                }}
            />
            <Select
                label="Dog"
                value={selectedDog}
                onChange={(e) => setSelectedDog(e.target.value)}
                required
            >
                {userDogs.map((dog) => (
                    <MenuItem key={dog.id} value={dog.id}>
                        {dog.name}
                    </MenuItem>
                ))}
            </Select>
            <Select
                label="Days of Week"
                multiple
                value={daysOfWeek}
                onChange={handleDayChange}
            >
                <MenuItem value="Sunday">Sunday</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
            <Button type="submit" variant="contained">Add Event</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Event added successfully"
            />
        </Box>
    );
};

export default AddEventForm;






// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';

// const eventTypes = ['volunteer', 'customer'];
// const daysOfWeekOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const AddEventForm = ({ updateEventList }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [date, setDate] = useState('');
//     const [country, setCountry] = useState('');
//     const [city, setCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState('');
//     const [eventType, setEventType] = useState('volunteer');
//     const [startTime, setStartTime] = useState('');
//     const [endTime, setEndTime] = useState('');
//     const [daysOfWeek, setDaysOfWeek] = useState([]);
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         // Заглушка для API, которая будет выполняться при монтировании компонента
//         // В реальном проекте здесь должен быть код для получения данных
//         console.log('API call placeholder');
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
//             if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

//             await dispatch(addEvent({
//                 title,
//                 description,
//                 date,
//                 country,
//                 city,
//                 volunteerNeeded: Number(volunteerNeeded),
//                 eventType,
//                 startTime,
//                 endTime,
//                 days_of_week: daysOfWeek.join(', ')
//             }));

//             setTitle('');
//             setDescription('');
//             setDate('');
//             setCountry('');
//             setCity('');
//             setVolunteerNeeded('');
//             setEventType('volunteer');
//             setStartTime('');
//             setEndTime('');
//             setDaysOfWeek([]);

//             setOpenSnackbar(true);

//             updateEventList();
//         } catch (error) {
//             console.error('Error adding event:', error);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     const handleDayChange = (event) => {
//         setDaysOfWeek(event.target.value);
//     };

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//                 '& > :not(style)': { m:   1 }
//             }}
//             noValidate
//             autoComplete="off"
//         >
//             <TextField
//                 label="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//             />
//             <TextField
//                 label="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//             />
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//             />
//             <TextField
//                 label="Country"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//             />
//             <TextField
//                 label="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//             />
//             <TextField
//                 label="Volunteers Needed"
//                 type="number"
//                 value={volunteerNeeded}
//                 onChange={(e) => setVolunteerNeeded(e.target.value)}
//                 required
//             />
//             <Select
//                 label="Event Type"
//                 value={eventType}
//                 onChange={(e) => setEventType(e.target.value)}
//                 required
//             >
//                 {eventTypes.map((type) => (
//                     <MenuItem key={type} value={type}>
//                         {type}
//                     </MenuItem>
//                 ))}
//             </Select>
//             <TextField
//                 label="Start Time"
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//                 inputProps={{
//                     step:   900, //   15 минут
//                 }}
//             />
//             <TextField
//                 label="End Time"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 inputProps={{
//                     step:   900, //   15 минут
//                 }}
//             />
//             <Select
//                 label="Days of Week"
//                 multiple
//                 value={daysOfWeek}
//                 onChange={handleDayChange}
//             >
//                 {daysOfWeekOptions.map((day, index) => (
//                     <MenuItem key={index} value={day}>{day}</MenuItem>
//                 ))}
//             </Select>
//             <Button type="submit" variant="contained">Add Event</Button>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 message="Event added successfully"
//             />
//         </Box>
//     );
// };

// export default AddEventForm;



