import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Snackbar, Select, MenuItem, CircularProgress } from '@mui/material';
import { updateEvent } from '../features/events/eventsSlice';
import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';
import moment from 'moment';

const EditEventForm = ({ event, updateEventList }) => {
  const dispatch = useDispatch();
  const userDogs = useSelector(selectUserDogs);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('Israel');
  const [city, setCity] = useState('');
  const [volunteerNeeded, setVolunteerNeeded] = useState(1);
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedDog, setSelectedDog] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchUserDogs());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setCountry(event.country || 'Israel');
      setCity(event.city || '');
      setVolunteerNeeded(event.volunteer_needed || 1);
      setSelectedDaysOfWeek(event.days_of_week ? event.days_of_week.split(',') : []);
      setSelectedDate(moment(event.date).format('YYYY-MM-DD'));
      setSelectedDog(event.dog_id || '');
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    
    const eventData = {
      event_id: event.event_id,
      title,
      description,
      event_type: event.event_type,
      date: formattedDate,
      country: country || undefined,
      city: city || undefined,
      volunteer_needed: Number(volunteerNeeded) || undefined,
      days_of_week: selectedDaysOfWeek.join(',') || undefined,
      dog_id: selectedDog || undefined
    };
  
    dispatch(updateEvent(eventData))
      .then((result) => {
        if (result.payload === 'success') {
          resetForm();
          setSnackbarMessage('Event updated successfully.');
          setOpenSnackbar(true);
          updateEventList && updateEventList();
        } else {
          setError('Error updating event.');
          setSnackbarMessage('Error updating event.');
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        setError('Error updating event.');
        setSnackbarMessage('Error updating event.');
        setOpenSnackbar(true);
      })
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCountry('Israel');
    setCity('');
    setVolunteerNeeded(1);
    setSelectedDaysOfWeek([]);
    setSelectedDate(moment().format('YYYY-MM-DD'));
    setSelectedDog('');
    setOpenSnackbar(false);
    setError(''); // Reset any errors
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

  const handleDogChange = (event) => setSelectedDog(event.target.value);

  const handleDateChange = (date) => setSelectedDate(date);

  if (loading) {
    return <CircularProgress />;
  }

  if (!userDogs.length) {
    return <div>Loading...</div>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
      <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
      <TextField label="Date" type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} required InputLabelProps={{ shrink: true }} />
      <Select label="Days of Week" multiple value={selectedDaysOfWeek} onChange={handleDayChange} required sx={{ minWidth: '120px' }}>
        <MenuItem value="Sunday">Sunday</MenuItem>
        <MenuItem value="Monday">Monday</MenuItem>
        <MenuItem value="Tuesday">Tuesday</MenuItem>
        <MenuItem value="Wednesday">Wednesday</MenuItem>
        <MenuItem value="Thursday">Thursday</MenuItem>
        <MenuItem value="Friday">Friday</MenuItem>
        <MenuItem value="Saturday">Saturday</MenuItem>
      </Select>
      <TextField label="Volunteers Needed" type="number" value={volunteerNeeded} onChange={(e) => setVolunteerNeeded(e.target.value)} required />
      <Select label="Dog" value={selectedDog} onChange={handleDogChange} displayEmpty sx={{ minWidth: '120px' }}>
        <MenuItem value="">None (Optional)</MenuItem>
        {userDogs.map((dog) => (
          <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" disabled={loading}>Update Event</Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Box>
  );
};

export default EditEventForm;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Snackbar, Select, MenuItem } from '@mui/material';
// import { updateEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs, selectUserDogs } from '../features/dogs/dogsSlice';
// import moment from 'moment';

// const EditEventForm = ({ event, updateEventList }) => {
//   const dispatch = useDispatch();
//   const userDogs = useSelector(selectUserDogs);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [country, setCountry] = useState('Israel');
//   const [city, setCity] = useState('');
//   const [volunteerNeeded, setVolunteerNeeded] = useState(1);
//   const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
//   const [selectedDog, setSelectedDog] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   useEffect(() => {
//     dispatch(fetchUserDogs());
//   }, [dispatch]); 

//   useEffect(() => {
//     if (event) {
//       setTitle(event.title || '');
//       setDescription(event.description || '');
//       setCountry(event.country || 'Israel');
//       setCity(event.city || '');
//       setVolunteerNeeded(event.volunteer_needed || 1);
//       setSelectedDaysOfWeek(event.days_of_week ? event.days_of_week.split(',') : []);
//       setSelectedDate(moment(event.date).format('YYYY-MM-DD'));
//       setSelectedDog(event.dog_id || '');
//     }
//   }, [event]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    
//     const eventData = {
//       event_id: event.event_id,
//       title,
//       description,
//       event_type: event.event_type,
//       date: formattedDate,
//       country: country || undefined,
//       city: city || undefined,
//       volunteer_needed: Number(volunteerNeeded) || undefined,
//       days_of_week: selectedDaysOfWeek.join(',') || undefined,
//       dog_id: selectedDog || undefined
//     };
  
//     dispatch(updateEvent(eventData))
//     .then((result) => {
//       if (result.payload === 'success') {
//         resetForm();
//         setSnackbarMessage('Event updated successfully.');
//         setOpenSnackbar(true);
//         updateEventList && updateEventList();
//       } else {
//         console.error('Error updating event:', result.error);
//         setSnackbarMessage('Error updating event.');
//         setOpenSnackbar(true);
//       }
//     })
//     .catch((error) => {
//       console.error('Error updating event:', error);
//       setSnackbarMessage('Error updating event.');
//       setOpenSnackbar(true);
//     });
//   };

//   const resetForm = () => {
//     setTitle('');
//     setDescription('');
//     setCountry('Israel');
//     setCity('');
//     setVolunteerNeeded(1);
//     setSelectedDaysOfWeek([]);
//     setSelectedDate(moment().format('YYYY-MM-DD'));
//     setSelectedDog('');
//     setOpenSnackbar(false);
//   };

//   const handleCloseSnackbar = () => setOpenSnackbar(false);

//   const handleDayChange = (event) => setSelectedDaysOfWeek(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);

//   const handleDogChange = (event) => setSelectedDog(event.target.value);

//   const handleDateChange = (date) => setSelectedDate(date);
  
//   if (!userDogs) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
//       <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//       <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//       <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
//       <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
//       <TextField label="Date" type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} required InputLabelProps={{ shrink: true }} />
//       <Select label="Days of Week" multiple value={selectedDaysOfWeek} onChange={handleDayChange} required sx={{ minWidth: '120px' }}>
//         <MenuItem value="Sunday">Sunday</MenuItem>
//         <MenuItem value="Monday">Monday</MenuItem>
//         <MenuItem value="Tuesday">Tuesday</MenuItem>
//         <MenuItem value="Wednesday">Wednesday</MenuItem>
//         <MenuItem value="Thursday">Thursday</MenuItem>
//         <MenuItem value="Friday">Friday</MenuItem>
//         <MenuItem value="Saturday">Saturday</MenuItem>
//       </Select>
//       <TextField label="Volunteers Needed" type="number" value={volunteerNeeded} onChange={(e) => setVolunteerNeeded(e.target.value)} required />
//       <Select label="Dog" value={selectedDog} onChange={handleDogChange} displayEmpty sx={{ minWidth: '120px' }}>
//         <MenuItem value="">None (Optional)</MenuItem>
//         {userDogs.map((dog) => (
//           <MenuItem key={dog.dog_id} value={dog.dog_id}>{dog.name}</MenuItem>
//         ))}
//       </Select>
//       <Button type="submit" variant="contained">Update Event</Button>
//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
//     </Box>
//   );
// };

// export default EditEventForm;






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



