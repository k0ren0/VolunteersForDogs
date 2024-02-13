import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
import { addEvent } from '../features/events/eventsSlice';
import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

const AddEventForm = ({ updateEventList }) => {
    const [eventType, setEventType] = useState('customer'); // По умолчанию кастомер
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('Israel'); // По умолчанию Израиль
    const [city, setCity] = useState('');
    const [volunteerNeeded, setVolunteerNeeded] = useState(1); // По умолчанию 1 волонтер
    const [startTime, setStartTime] = useState(''); // Только часы, без минут
    const [endTime, setEndTime] = useState(''); // Только часы, без минут
    const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]); // Выбранные дни недели
    const [selectedDate, setSelectedDate] = useState(new Date()); // Выбранная дата
    const [selectedDog, setSelectedDog] = useState(''); // Выбранная собака
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
                country,
                city,
                volunteerNeeded: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
                eventType,
                startTime,
                endTime,
                daysOfWeek: eventType === 'volunteer' ? selectedDaysOfWeek.join(', ') : undefined,
                dogId: eventType === 'customer' ? selectedDog : undefined,
                date: selectedDate.toISOString().split('T')[0] // Преобразование даты в строку в формате YYYY-MM-DD
            }));

            setTitle('');
            setDescription('');
            setCountry('Israel');
            setCity('');
            setEventType('customer');
            setVolunteerNeeded(1);
            setStartTime('');
            setEndTime('');
            setSelectedDaysOfWeek([]);
            setSelectedDog('');
            setSelectedDate(new Date());

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
        setSelectedDaysOfWeek(event.target.value);
    };

    const handleDogChange = (event) => {
        setSelectedDog(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
            {eventType === 'customer' && (
                <>
                    <TextField
                        label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <TextField
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <TextField
                        label="Volunteers Needed"
                        type="number"
                        value={volunteerNeeded}
                        onChange={(e) => setVolunteerNeeded(e.target.value)}
                        required
                    />
                </>
            )}
            <TextField
                label="Start Time (HH:00)"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                inputProps={{
                    step: 3600, // Шаг в секундах (3600 секунд = 1 час)
                }}
            />
            {(eventType === 'volunteer' || (eventType === 'customer' && selectedDaysOfWeek.length > 0)) && (
                <TextField
                    label="End Time (HH:00)"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    inputProps={{
                        step: 3600, // Шаг в секундах (3600 секунд = 1 час)
                    }}
                />
            )}
            {(eventType === 'volunteer' || eventType === 'customer') && (
                <TextField
                    label="Date"
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                    required
                />
            )}
            {(eventType === 'volunteer' || (eventType === 'customer' && selectedDaysOfWeek.length > 0)) && (
                <Select
                    label="Days of Week"
                    multiple
                    value={selectedDaysOfWeek}
                    onChange={handleDayChange}
                    required
                    sx={{ minWidth: '120px' }}
                >
                    <MenuItem disabled={!selectedDaysOfWeek.length}>Select Days</MenuItem>
                    <MenuItem value="Sunday">Sunday</MenuItem>
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                    <MenuItem value="Saturday">Saturday</MenuItem>
                </Select>
            )}
            {eventType === 'customer' && (
                <Select
                    label="Dog"
                    value={selectedDog}
                    onChange={handleDogChange}
                    required
                    sx={{ minWidth: '120px' }}
                >
                    {userDogs.map((dog) => (
                        <MenuItem key={dog.id} value={dog.id}>
                            {dog.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
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
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

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
//     const [selectedDogs, setSelectedDogs] = useState([]); // Состояние для хранения выбранных собак
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs); // Получаем список собак пользователя

//     useEffect(() => {
//         const loadUserDogs = async () => {
//             try {
//                 await dispatch(fetchUserDogs());
//             } catch (error) {
//                 console.error('Error fetching user dogs:', error);
//             }
//         };

//         loadUserDogs();
//     }, [dispatch]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
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
//                 days_of_week: daysOfWeek.join(', '),
//                 dogIds: selectedDogs // Добавляем выбранные собаки в объект события
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
//             setSelectedDogs([]); // Сбрасываем выбранные собаки

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

//     const handleDogChange = (event) => {
//         setSelectedDogs(event.target.value);
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
//                 <MenuItem value="volunteer">Volunteer</MenuItem>
//                 <MenuItem value="customer">Customer</MenuItem>
//             </Select>
//             <TextField
//                 label="Start Time"
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//                 inputProps={{
//                     step: 900, // 15 минут
//                 }}
//             />
//             <TextField
//                 label="End Time"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 inputProps={{
//                     step: 900, // 15 минут
//                 }}
//             />
//             <Select
//                 label="Dogs"
//                 multiple
//                 value={selectedDogs}
//                 onChange={handleDogChange}
//                 required
//             >
//                 {userDogs.map((dog) => (
//                     <MenuItem key={dog.id} value={dog.id}>
//                         {dog.name}
//                     </MenuItem>
//                 ))}
//             </Select>
//             <Select
//                 label="Days of Week"
//                 multiple
//                 value={daysOfWeek}
//                 onChange={handleDayChange}
//             >
//                 <MenuItem value="Sunday">Sunday</MenuItem>
//                 <MenuItem value="Monday">Monday</MenuItem>
//                 <MenuItem value="Tuesday">Tuesday</MenuItem>
//                 <MenuItem value="Wednesday">Wednesday</MenuItem>
//                 <MenuItem value="Thursday">Thursday</MenuItem>
//                 <MenuItem value="Friday">Friday</MenuItem>
//                 <MenuItem value="Saturday">Saturday</MenuItem>
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



