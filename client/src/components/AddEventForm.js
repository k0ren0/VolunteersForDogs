import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
import { addEvent } from '../features/events/eventsSlice';
import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

const AddEventForm = ({ updateEventList }) => {
    const [eventType, setEventType] = useState('customer'); // Default event type
    const [title, setTitle] = useState(''); // Event title
    const [description, setDescription] = useState(''); // Event description
    const [country, setCountry] = useState('Israel'); // Default country
    const [city, setCity] = useState(''); // Event city
    const [volunteerNeeded, setVolunteerNeeded] = useState(1); // Number of volunteers needed, default is 1
    const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]); // Selected days of the week for the event
    const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date for the event
    const [selectedDog, setSelectedDog] = useState(''); // Selected dog ID, optional
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message displayed in the snackbar
    const dispatch = useDispatch();
    const userDogs = useSelector(selectUserDogs); // Fetch user dogs from the store

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
    
        // Adjust validation based on event type
        const isVolunteerEvent = eventType === 'volunteer';
        const isValidVolunteerEvent = isVolunteerEvent && selectedDaysOfWeek.length > 0;
        const isValidCustomerEvent = eventType === 'customer' && title && description && country && city && selectedDate;
        
        // Common required fields
        if (!title || !description) {
            setSnackbarMessage('Please fill in all required fields.');
            setOpenSnackbar(true);
            return;
        }
        
        // Additional validation for customer events
        if (eventType === 'customer' && (!country || !city || volunteerNeeded <= 0)) {
            setSnackbarMessage('Please fill in all required fields for customer event.');
            setOpenSnackbar(true);
            return;
        }
        
        // Additional validation for volunteer events
        if (isVolunteerEvent && !isValidVolunteerEvent) {
            setSnackbarMessage('Please fill in all required fields for volunteer event.');
            setOpenSnackbar(true);
            return;
        }
    
        try {
            await dispatch(addEvent({
                title,
                description,
                event_type: eventType,
                date: selectedDate.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
                country: eventType === 'customer' ? country : undefined,
                city: eventType === 'customer' ? city : undefined,
                volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
                days_of_week: isVolunteerEvent ? selectedDaysOfWeek.join(',') : undefined,
                dogId: selectedDog || undefined // Make dogId optional
            }));
    
            resetForm();
            setSnackbarMessage('Event added successfully.');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error adding event:', error);
            setSnackbarMessage('Error adding event.');
            setOpenSnackbar(true);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCountry('Israel');
        setCity('');
        setVolunteerNeeded(1);
        setEventType('customer');
        setSelectedDaysOfWeek([]);
        setSelectedDate(new Date());
        setSelectedDog('');
        setOpenSnackbar(false);
    };

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

    const handleDogChange = (event) => setSelectedDog(event.target.value || '');

    const handleDateChange = (date) => setSelectedDate(date);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ '& > :not(style)': { m: 1 } }}
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
                label="Date"
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                required
            />
            <Select
                label="Days of Week"
                multiple
                value={selectedDaysOfWeek}
                onChange={handleDayChange}
                required
                sx={{ minWidth: '120px' }}
            >
                <MenuItem value="Sunday">Sunday</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
            {eventType === 'customer' && (
                <>
                    <TextField
                        label="Volunteers Needed"
                        type="number"
                        value={volunteerNeeded}
                        onChange={(e) => setVolunteerNeeded(e.target.value)}
                        required
                    />
                    
                    <Select
                        label="Dog"
                        value={selectedDog}
                        onChange={handleDogChange}
                        displayEmpty
                        sx={{ minWidth: '120px' }}
                    >
                        <MenuItem value="">None (Optional)</MenuItem>
                        {userDogs.map((dog) => (
                            <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
                        ))}
                    </Select>
                </>
            )}
            <Button type="submit" variant="contained">Add Event</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
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
//     const [eventType, setEventType] = useState('customer'); // Default event type
//     const [title, setTitle] = useState(''); // Event title
//     const [description, setDescription] = useState(''); // Event description
//     const [country, setCountry] = useState('Israel'); // Default country
//     const [city, setCity] = useState(''); // Event city
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]); // Selected days of the week for the event
//     const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date for the event
//     const [selectedWeekDay, setSelectedWeekDay] = useState('Sunday'); // Selected week day for the event
//     const [selectedStartDate, setSelectedStartDate] = useState(new Date()); // Selected start date for the event
//     const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility
//     const [snackbarMessage, setSnackbarMessage] = useState(''); // Message displayed in the snackbar
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs); // Fetch user dogs from the store

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
    
//         // Adjust validation based on event type
//         const isValidCustomerEvent = eventType === 'customer' && title && description && country && city && selectedDate;
//         const isValidVolunteerEvent = eventType === 'volunteer' && selectedStartDate;
        
//         // Common required fields
//         if (!title || !description) {
//             setSnackbarMessage('Please fill in all required fields.');
//             setOpenSnackbar(true);
//             return;
//         }
        
//         // Additional validation for customer events
//         if (eventType === 'customer' && (!country || !city)) {
//             setSnackbarMessage('Please fill in all required fields for customer event.');
//             setOpenSnackbar(true);
//             return;
//         }

//         // Additional validation for volunteer events
//         if (eventType === 'volunteer' && !isValidVolunteerEvent) {
//             setSnackbarMessage('Please fill in all required fields for volunteer event.');
//             setOpenSnackbar(true);
//             return;
//         }
    
//         try {
//             await dispatch(addEvent({
//                 title,
//                 description,
//                 event_type: eventType,
//                 date: selectedDate.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
//                 country: eventType === 'customer' ? country : undefined,
//                 city: eventType === 'customer' ? city : undefined,
//                 days_of_week: eventType === 'volunteer' ? selectedDaysOfWeek.join(',') : undefined,
//                 start_date: eventType === 'volunteer' ? selectedStartDate.toISOString().split('T')[0] : undefined // Format the start date to YYYY-MM-DD for volunteer events
//             }));
    
//             resetForm();
//             setSnackbarMessage('Event added successfully.');
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setSnackbarMessage('Error adding event.');
//             setOpenSnackbar(true);
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setEventType('customer');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedWeekDay('Sunday');
//         setSelectedStartDate(new Date());
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDateChange = (date) => setSelectedDate(date);

//     const handleWeekDayChange = (event) => setSelectedWeekDay(event.target.value);

//     const handleStartDateChange = (date) => setSelectedStartDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Date"
//                         type="date"
//                         value={selectedDate.toISOString().split('T')[0]}
//                         onChange={(e) => handleDateChange(new Date(e.target.value))}
//                         required
//                     />
//                 </>
//             )}
//             {eventType === 'volunteer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Start Date"
//                         type="date"
//                         value={selectedStartDate.toISOString().split('T')[0]}
//                         onChange={(e) => handleStartDateChange(new Date(e.target.value))}
//                         required
//                     />
//                 </>
//             )}
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem value="Sunday">Sunday</MenuItem>
//                     <MenuItem value="Monday">Monday</MenuItem>
//                     <MenuItem value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem value="Thursday">Thursday</MenuItem>
//                     <MenuItem value="Friday">Friday</MenuItem>
//                     <MenuItem value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             <Button type="submit" variant="contained">Add Event</Button>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 message={snackbarMessage}
//             />
//         </Box>
//     );
// };

// export default AddEventForm;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer'); // Default event type
//     const [title, setTitle] = useState(''); // Event title
//     const [description, setDescription] = useState(''); // Event description
//     const [country, setCountry] = useState('Israel'); // Default country
//     const [city, setCity] = useState(''); // Event city
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]); // Selected days of the week for the event
//     const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date for the event
//     const [selectedDog, setSelectedDog] = useState(''); // Selected dog ID, optional
//     const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility
//     const [snackbarMessage, setSnackbarMessage] = useState(''); // Message displayed in the snackbar
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs); // Fetch user dogs from the store

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
    
//         // Adjust validation based on event type
//         const isValidCustomerEvent = eventType === 'customer' && title && description && country && city && selectedDate;
        
//         // Common required fields
//         if (!title || !description || !selectedDate) {
//             setSnackbarMessage('Please fill in all required fields.');
//             setOpenSnackbar(true);
//             return;
//         }
        
//         // Additional validation for customer events
//         if (eventType === 'customer' && (!country || !city)) {
//             setSnackbarMessage('Please fill in all required fields for customer event.');
//             setOpenSnackbar(true);
//             return;
//         }
    
//         try {
//             await dispatch(addEvent({
//                 title,
//                 description,
//                 event_type: eventType,
//                 date: selectedDate.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
//                 country: eventType === 'customer' ? country : undefined,
//                 city: eventType === 'customer' ? city : undefined,
//                 days_of_week: eventType === 'volunteer' ? selectedDaysOfWeek.join(',') : undefined,
//                 dogId: eventType === 'customer' ? selectedDog || undefined : undefined // Make dogId optional only for customer events
//             }));
    
//             resetForm();
//             setSnackbarMessage('Event added successfully.');
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setSnackbarMessage('Error adding event.');
//             setOpenSnackbar(true);
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setEventType('customer');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <Select
//                         label="Dog"
//                         value={selectedDog}
//                         onChange={handleDogChange}
//                         displayEmpty
//                         sx={{ minWidth: '120px' }}
//                     >
//                         <MenuItem value="">None (Optional)</MenuItem>
//                         {userDogs.map((dog) => (
//                             <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                         ))}
//                     </Select>
//                 </>
//             )}
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem value="Sunday">Sunday</MenuItem>
//                     <MenuItem value="Monday">Monday</MenuItem>
//                     <MenuItem value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem value="Thursday">Thursday</MenuItem>
//                     <MenuItem value="Friday">Friday</MenuItem>
//                     <MenuItem value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             <Button type="submit" variant="contained">Add Event</Button>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 message={snackbarMessage}
//             />
//         </Box>
//     );
// };

// export default AddEventForm;





//WORK

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer'); // Default event type
//     const [title, setTitle] = useState(''); // Event title
//     const [description, setDescription] = useState(''); // Event description
//     const [country, setCountry] = useState('Israel'); // Default country
//     const [city, setCity] = useState(''); // Event city
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1); // Number of volunteers needed, default is 1
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]); // Selected days of the week for the event
//     const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date for the event
//     const [selectedDog, setSelectedDog] = useState(''); // Selected dog ID, optional
//     const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility
//     const [snackbarMessage, setSnackbarMessage] = useState(''); // Message displayed in the snackbar
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs); // Fetch user dogs from the store

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
    
//         // Adjust validation based on event type
//         const isVolunteerEvent = eventType === 'volunteer';
//         const isValidVolunteerEvent = isVolunteerEvent && selectedDaysOfWeek.length > 0;
//         const isValidCustomerEvent = eventType === 'customer' && title && description && country && city && selectedDate;
        
//         // Common required fields
//         if (!title || !description || !selectedDate) {
//             setSnackbarMessage('Please fill in all required fields.');
//             setOpenSnackbar(true);
//             return;
//         }
        
//         // Additional validation for customer events
//         if (eventType === 'customer' && (!country || !city || volunteerNeeded <= 0)) {
//             setSnackbarMessage('Please fill in all required fields for customer event.');
//             setOpenSnackbar(true);
//             return;
//         }
        
//         // Additional validation for volunteer events
//         if (isVolunteerEvent && !isValidVolunteerEvent) {
//             setSnackbarMessage('Please fill in all required fields for volunteer event.');
//             setOpenSnackbar(true);
//             return;
//         }
    
//         try {
//             await dispatch(addEvent({
//                 title,
//                 description,
//                 event_type: eventType,
//                 date: selectedDate.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
//                 country: eventType === 'customer' ? country : undefined,
//                 city: eventType === 'customer' ? city : undefined,
//                 volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//                 days_of_week: isVolunteerEvent ? selectedDaysOfWeek.join(',') : undefined,
//                 dogId: selectedDog || undefined // Make dogId optional
//             }));
    
//             resetForm();
//             setSnackbarMessage('Event added successfully.');
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setSnackbarMessage('Error adding event.');
//             setOpenSnackbar(true);
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setVolunteerNeeded(1);
//         setEventType('customer');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem value="Sunday">Sunday</MenuItem>
//                     <MenuItem value="Monday">Monday</MenuItem>
//                     <MenuItem value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem value="Thursday">Thursday</MenuItem>
//                     <MenuItem value="Friday">Friday</MenuItem>
//                     <MenuItem value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     displayEmpty
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem value="">None (Optional)</MenuItem>
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                     ))}
//                 </Select>
//             )}
//             <Button type="submit" variant="contained">Add Event</Button>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 message={snackbarMessage}
//             />
//         </Box>
//     );
// };

// export default AddEventForm;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer'); // Default event type
//     const [title, setTitle] = useState(''); // Event title
//     const [description, setDescription] = useState(''); // Event description
//     const [country, setCountry] = useState('Israel'); // Default country
//     const [city, setCity] = useState(''); // Event city
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1); // Number of volunteers needed, default is 1
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]); // Selected days of the week for the event
//     const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date for the event
//     const [selectedDog, setSelectedDog] = useState(''); // Selected dog ID, optional
//     const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility
//     const [snackbarMessage, setSnackbarMessage] = useState(''); // Message displayed in the snackbar
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs); // Fetch user dogs from the store

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
    
//         // Adjust validation based on event type
//         const isVolunteerEvent = eventType === 'volunteer';
//         const isValidVolunteerEvent = isVolunteerEvent && selectedDaysOfWeek.length > 0;
//         const isValidCustomerEvent = eventType === 'customer' && title && description && country && city && selectedDate;
        
//         // Common required fields
//         if (!title || !description || !selectedDate) {
//             setSnackbarMessage('Please fill in all required fields.');
//             setOpenSnackbar(true);
//             return;
//         }
        
//         // Additional validation for customer events
//         if (eventType === 'customer' && (!country || !city || volunteerNeeded <= 0)) {
//             setSnackbarMessage('Please fill in all required fields for customer event.');
//             setOpenSnackbar(true);
//             return;
//         }
        
//         // Additional validation for volunteer events
//         if (isVolunteerEvent && !isValidVolunteerEvent) {
//             setSnackbarMessage('Please fill in all required fields for volunteer event.');
//             setOpenSnackbar(true);
//             return;
//         }
    
//         try {
//             await dispatch(addEvent({
//                 title,
//                 description,
//                 event_type: eventType,
//                 date: selectedDate.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
//                 country: eventType === 'customer' ? country : undefined,
//                 city: eventType === 'customer' ? city : undefined,
//                 volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//                 days_of_week: isVolunteerEvent ? selectedDaysOfWeek.join(',') : undefined,
//                 dogId: selectedDog || undefined // Make dogId optional
//             }));
    
//             resetForm();
//             setSnackbarMessage('Event added successfully.');
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setSnackbarMessage('Error adding event.');
//             setOpenSnackbar(true);
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setVolunteerNeeded(1);
//         setEventType('customer');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem value="Sunday">Sunday</MenuItem>
//                     <MenuItem value="Monday">Monday</MenuItem>
//                     <MenuItem value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem value="Thursday">Thursday</MenuItem>
//                     <MenuItem value="Friday">Friday</MenuItem>
//                     <MenuItem value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'customer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     displayEmpty
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem value="">None (Optional)</MenuItem>
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                     ))}
//                 </Select>
//             )}
//             <Button type="submit" variant="contained">Add Event</Button>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 message={snackbarMessage}
//             />
//         </Box>
//     );
// };

// export default AddEventForm;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [country, setCountry] = useState('Israel');
//     const [city, setCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1);
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedDog, setSelectedDog] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs);

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

//         let eventData = {
//             title,
//             description,
//             event_type: eventType,
//             date: selectedDate.toISOString(),
//             country,
//             city,
//             volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//             days_of_week: eventType === 'volunteer' ? selectedDaysOfWeek.join(',') : undefined,
//             dogId: eventType === 'customer' ? selectedDog : undefined
//         };

//         // Remove fields with undefined values before sending
//         eventData = Object.fromEntries(Object.entries(eventData).filter(([_, v]) => v !== undefined));

//         console.log('Sending eventData:', eventData);

//         try {
//             await dispatch(addEvent(eventData));
//             resetForm();
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setOpenSnackbar(true); // Show error notification
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setVolunteerNeeded(1);
//         setEventType('customer');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem key="Sunday" value="Sunday">Sunday</MenuItem>
//                     <MenuItem key="Monday" value="Monday">Monday</MenuItem>
//                     <MenuItem key="Tuesday" value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem key="Wednesday" value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem key="Thursday" value="Thursday">Thursday</MenuItem>
//                     <MenuItem key="Friday" value="Friday">Friday</MenuItem>
//                     <MenuItem key="Saturday" value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'customer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                     ))}
//                 </Select>
//             )}
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
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [country, setCountry] = useState('Israel');
//     const [city, setCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1);
//     // const [startTime, setStartTime] = useState('');
//     // const [endTime, setEndTime] = useState('');
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedDog, setSelectedDog] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs);

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

//         let eventData = {
//             title,
//             description,
//             event_type: eventType,
//             // start_time: startTime + ':00', // Формат сохранен как есть
//             // end_time: endTime + ':00', // Формат сохранен как есть
//             date: selectedDate.toISOString(), // Прямое использование ISO строки
//             country,
//             city,
//             volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//             days_of_week: eventType === 'volunteer' ? selectedDaysOfWeek.join(',') : undefined, // Условное включение
//             dogId: eventType === 'customer' ? selectedDog : undefined
//         };

//         // Удаление полей с undefined значениями перед отправкой
//         eventData = Object.fromEntries(Object.entries(eventData).filter(([_, v]) => v !== undefined));

//         console.log('Sending eventData:', eventData);

//         try {
//             await dispatch(addEvent(eventData));
//             resetForm();
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setOpenSnackbar(true); // Показываем уведомление об ошибке
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setVolunteerNeeded(1);
//         setEventType('customer');
//         // setStartTime('');
//         // setEndTime('');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             {/* <TextField
//                 label="Start Time (HH:00)"
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//                 inputProps={{ step: 3600 }}
//             />
//             <TextField
//                 label="End Time (HH:00)"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 inputProps={{ step: 3600 }}
//             /> */}
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem key="Sunday" value="Sunday">Sunday</MenuItem>
//                     <MenuItem key="Monday" value="Monday">Monday</MenuItem>
//                     <MenuItem key="Tuesday" value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem key="Wednesday" value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem key="Thursday" value="Thursday">Thursday</MenuItem>
//                     <MenuItem key="Friday" value="Friday">Friday</MenuItem>
//                     <MenuItem key="Saturday" value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'customer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                     ))}
//                 </Select>
//             )}
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



// last

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [country, setCountry] = useState('Israel');
//     const [city, setCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1);
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedDog, setSelectedDog] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs);

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

//         const eventData = {
//             title,
//             description,
//             event_type: eventType,
//             date: selectedDate.toISOString(),
//             country,
//             city,
//             volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//             days_of_week: eventType === 'volunteer' ? selectedDaysOfWeek.join(',') : undefined,
//             ...(selectedDog && { dogId: selectedDog })
//         };

//         try {
//             await dispatch(addEvent(eventData));
//             resetForm();
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setOpenSnackbar(true);
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setVolunteerNeeded(1);
//         setEventType('customer');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem key="Sunday" value="Sunday">Sunday</MenuItem>
//                     <MenuItem key="Monday" value="Monday">Monday</MenuItem>
//                     <MenuItem key="Tuesday" value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem key="Wednesday" value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem key="Thursday" value="Thursday">Thursday</MenuItem>
//                     <MenuItem key="Friday" value="Friday">Friday</MenuItem>
//                     <MenuItem key="Saturday" value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'customer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     displayEmpty
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem value="">None (Optional)</MenuItem>
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                     ))}
//                 </Select>
//             )}
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
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [country, setCountry] = useState('Israel');
//     const [city, setCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1);
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedDog, setSelectedDog] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs);

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
//             const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
//             if (!REACT_APP_API_URL) throw new Error('REACT_APP_API_URL is not defined');

//             await dispatch(addEvent({
//                 title,
//                 description,
//                 event_type: eventType,
//                 date: selectedDate.toISOString(),
//                 country,
//                 city,
//                 volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//                 days_of_week: eventType === 'volunteer' ? selectedDaysOfWeek.join(',') : undefined,
//             //     dogId: eventType === 'customer' ? selectedDog : undefined
//             // }));
//                 ...(selectedDog && { dogId: selectedDog })
//             }));
//             resetForm();
//             setOpenSnackbar(true);
//             updateEventList();
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setOpenSnackbar(true); // Показываем уведомление об ошибке
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setVolunteerNeeded(1);
//         setEventType('customer');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
        
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m:  1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem key="Sunday" value="Sunday">Sunday</MenuItem>
//                     <MenuItem key="Monday" value="Monday">Monday</MenuItem>
//                     <MenuItem key="Tuesday" value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem key="Wednesday" value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem key="Thursday" value="Thursday">Thursday</MenuItem>
//                     <MenuItem key="Friday" value="Friday">Friday</MenuItem>
//                     <MenuItem key="Saturday" value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'customer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     // required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                     ))}
//                 </Select>
//             )}
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








// до того как убрать время

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [country, setCountry] = useState('Israel');
//     const [city, setCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1);
//     const [startTime, setStartTime] = useState('');
//     const [endTime, setEndTime] = useState('');
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedDog, setSelectedDog] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs);

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

//         let eventData = {
//             title,
//             description,
//             event_type: eventType,
//             start_time: startTime + ':00', // Формат сохранен как есть
//             end_time: endTime + ':00', // Формат сохранен как есть
//             date: selectedDate.toISOString(), // Прямое использование ISO строки
//             country,
//             city,
//             volunteer_needed: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//             days_of_week: eventType === 'volunteer' ? selectedDaysOfWeek.join(',') : undefined, // Условное включение
//             dogId: eventType === 'customer' ? selectedDog : undefined
//         };

//         // Удаление полей с undefined значениями перед отправкой
//         eventData = Object.fromEntries(Object.entries(eventData).filter(([_, v]) => v !== undefined));

//         console.log('Sending eventData:', eventData);

//         try {
//             await dispatch(addEvent(eventData));
//             resetForm();
//             setOpenSnackbar(true);
//         } catch (error) {
//             console.error('Error adding event:', error);
//             setOpenSnackbar(true); // Показываем уведомление об ошибке
//         }
//     };

//     const resetForm = () => {
//         setTitle('');
//         setDescription('');
//         setCountry('Israel');
//         setCity('');
//         setVolunteerNeeded(1);
//         setEventType('customer');
//         setStartTime('');
//         setEndTime('');
//         setSelectedDaysOfWeek([]);
//         setSelectedDate(new Date());
//         setSelectedDog('');
//         setOpenSnackbar(false);
//     };

//     const handleCloseSnackbar = () => setOpenSnackbar(false);

//     const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//     const handleDogChange = (event) => setSelectedDog(event.target.value || '');

//     const handleDateChange = (date) => setSelectedDate(date);

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ '& > :not(style)': { m: 1 } }}
//             noValidate
//             autoComplete="off"
//         >
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             <TextField
//                 label="Start Time (HH:00)"
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//                 inputProps={{ step: 3600 }}
//             />
//             <TextField
//                 label="End Time (HH:00)"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 inputProps={{ step: 3600 }}
//             />
//             <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate.toISOString().split('T')[0]}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//                 required
//             />
//             {eventType === 'volunteer' && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem key="Sunday" value="Sunday">Sunday</MenuItem>
//                     <MenuItem key="Monday" value="Monday">Monday</MenuItem>
//                     <MenuItem key="Tuesday" value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem key="Wednesday" value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem key="Thursday" value="Thursday">Thursday</MenuItem>
//                     <MenuItem key="Friday" value="Friday">Friday</MenuItem>
//                     <MenuItem key="Saturday" value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'customer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//                     ))}
//                 </Select>
//             )}
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


//last work

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { addEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';

// const AddEventForm = ({ updateEventList }) => {
//     const [eventType, setEventType] = useState('customer'); 
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [country, setCountry] = useState('Israel'); 
//     const [city, setCity] = useState('');
//     const [volunteerNeeded, setVolunteerNeeded] = useState(1); 
//     const [startTime, setStartTime] = useState(''); 
//     const [endTime, setEndTime] = useState(''); 
//     const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]); 
//     const [selectedDate, setSelectedDate] = useState(new Date()); 
//     const [selectedDog, setSelectedDog] = useState(''); 
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const dispatch = useDispatch();
//     const userDogs = useSelector(selectUserDogs); 

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

//         const eventData = {
//             title,
//             description,
//             eventType,
//             startTime,
//             endTime,
//             date: selectedDate.toISOString().split('T')[0],
//             country,
//             city,
//             volunteerNeeded: eventType === 'customer' ? Number(volunteerNeeded) : undefined,
//             daysOfWeek: eventType === 'volunteer' ? selectedDaysOfWeek.join(', ') : undefined,
//             dogId: eventType === 'customer' ? selectedDog : undefined
//         };

//         const requiredFields = ['title', 'description', 'eventType', 'startTime', 'endTime'];
//         const emptyFields = requiredFields.filter(field => !eventData[field]);
//         if (emptyFields.length > 0) {
//             console.error('Empty fields:', emptyFields);
//             alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
//             return;
//         }

//         try {
//             await dispatch(addEvent(eventData));

//             setTitle('');
//             setDescription('');
//             setCountry('Israel');
//             setCity('');
//             setVolunteerNeeded(1);
//             setEventType('customer');
//             setStartTime('');
//             setEndTime('');
//             setSelectedDaysOfWeek([]);
//             setSelectedDog('');
//             setSelectedDate(new Date());

//             setOpenSnackbar(true);

//             if (updateEventList) {
//                 updateEventList();
//             }
//         } catch (error) {
//             console.error('Error adding event:', error);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     const handleDayChange = (event) => {
//         setSelectedDaysOfWeek(event.target.value);
//     };

//     const handleDogChange = (event) => {
//         setSelectedDog(event.target.value || ''); 
//     };

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
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
//             {eventType === 'customer' && (
//                 <>
//                     <TextField
//                         label="Country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Volunteers Needed"
//                         type="number"
//                         value={volunteerNeeded}
//                         onChange={(e) => setVolunteerNeeded(e.target.value)}
//                         required
//                     />
//                 </>
//             )}
//             <TextField
//                 label="Start Time (HH:00)"
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//                 inputProps={{
//                     step: 3600, 
//                 }}
//             />
//             <TextField
//                 label="End Time (HH:00)"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 inputProps={{
//                     step: 3600, 
//                 }}
//             />
//             {(eventType === 'volunteer' || (eventType === 'customer' && selectedDaysOfWeek.length > 0)) && (
//                 <TextField
//                     label="Date"
//                     type="date"
//                     value={selectedDate.toISOString().split('T')[0]}
//                     onChange={(e) => handleDateChange(new Date(e.target.value))}
//                     required
//                 />
//             )}
//             {(eventType === 'volunteer' || (eventType === 'customer' && selectedDaysOfWeek.length > 0)) && (
//                 <Select
//                     label="Days of Week"
//                     multiple
//                     value={selectedDaysOfWeek}
//                     onChange={handleDayChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     <MenuItem disabled={!selectedDaysOfWeek.length}>Select Days</MenuItem>
//                     <MenuItem key="Sunday" value="Sunday">Sunday</MenuItem>
//                     <MenuItem key="Monday" value="Monday">Monday</MenuItem>
//                     <MenuItem key="Tuesday" value="Tuesday">Tuesday</MenuItem>
//                     <MenuItem key="Wednesday" value="Wednesday">Wednesday</MenuItem>
//                     <MenuItem key="Thursday" value="Thursday">Thursday</MenuItem>
//                     <MenuItem key="Friday" value="Friday">Friday</MenuItem>
//                     <MenuItem key="Saturday" value="Saturday">Saturday</MenuItem>
//                 </Select>
//             )}
//             {eventType === 'customer' && (
//                 <Select
//                     label="Dog"
//                     value={selectedDog}
//                     onChange={handleDogChange}
//                     required
//                     sx={{ minWidth: '120px' }}
//                 >
//                     {userDogs.map((dog) => (
//                         <MenuItem key={dog.dog_id} value={dog.dog_id}>
//                             {dog.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             )}
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



