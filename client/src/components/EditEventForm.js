import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { updateEvent } from '../features/events/eventsSlice';

const daysOfWeekOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
];

const EditEventForm = ({ events, updateEventList }) => {
    const [selectedEventId, setSelectedEventId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('Israel');
    const [city, setCity] = useState('');
    const [volunteerNeeded, setVolunteerNeeded] = useState('');
    const [eventType, setEventType] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();

    const handleEventChange = (eventId) => {
        const selectedEvent = events.find(event => event.event_id === eventId);
        setSelectedEventId(eventId);
        setTitle(selectedEvent.title || '');
        setDescription(selectedEvent.description || '');
        setDate(selectedEvent.date || '');
        setCountry(selectedEvent.country || 'Israel');
        setCity(selectedEvent.city || '');
        setVolunteerNeeded(selectedEvent.volunteerNeeded || '');
        setEventType(selectedEvent.eventType || '');
        setStartTime(selectedEvent.startTime || '');
        setEndTime(selectedEvent.endTime || '');
        setDaysOfWeek(selectedEvent.daysOfWeek ? selectedEvent.daysOfWeek.split(', ') : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateEvent({ 
                id: selectedEventId,
                title, 
                description, 
                date, 
                country, 
                city, 
                volunteerNeeded: Number(volunteerNeeded),
                eventType, 
                startTime, 
                endTime, 
                daysOfWeek: daysOfWeek.join(', ')
            }));
            setOpenSnackbar(true);
            updateEventList();
        } catch (error) {
            console.error('Error updating event:', error);
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
            <FormControl>
                <InputLabel id="event-select-label">Select Event</InputLabel>
                <Select
                    labelId="event-select-label"
                    value={selectedEventId}
                    onChange={(e) => handleEventChange(e.target.value)}
                    required
                >
                    <MenuItem value="" disabled>Select Event</MenuItem>
                    {events.map((event) => (
                        <MenuItem key={event.event_id} value={event.event_id}>{event.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
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
            <FormControl>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                    labelId="country-label"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                >
                    <MenuItem value="Israel">Israel</MenuItem>
                    {/* Add other countries as MenuItem */}
                </Select>
            </FormControl>
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
            <FormControl>
                <InputLabel id="event-type-label">Event Type</InputLabel>
                <Select
                    labelId="event-type-label"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                >
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Start Time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                inputProps={{
                    step: 900, // 15 minutes
                }}
            />
            <TextField
                label="End Time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                inputProps={{
                    step: 900, // 15 minutes
                }}
            />
            <FormControl>
                <InputLabel id="days-of-week-label">Days of Week</InputLabel>
                <Select
                    labelId="days-of-week-label"
                    multiple
                    value={daysOfWeek}
                    onChange={(e) => setDaysOfWeek(e.target.value)}
                    required
                    renderValue={(selected) => selected.join(', ')}
                >
                    {daysOfWeekOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained">Update Event</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Event updated successfully"
            />
        </Box>
    );
};

export default EditEventForm;





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



