import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserEvents } from '../features/events/eventsSlice';
import { fetchUserDogs } from '../features/dogs/dogsSlice';
import {
  TextField, Button, Typography, CircularProgress, Box, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import moment from 'moment';

function EventsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const { events, status, error } = useSelector(state => state.events);
  const userDogs = useSelector(state => state.dogs.dogs);

  const [filter, setFilter] = useState({
    title: '',
    city: '',
    date: '',
    event_type: '',
    day_of_week: ''
  });

  useEffect(() => {
    if (token) {
      dispatch(fetchUserEvents());
      dispatch(fetchUserDogs());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterEvents = () => {
    dispatch(fetchUserEvents(filter));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Filter Events</Typography>
      {/* Размещаем компонент AddEventForm здесь */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField name="title" label="Title" value={filter.title} onChange={handleInputChange} />
        <TextField name="city" label="City" value={filter.city} onChange={handleInputChange} />
        <TextField name="date" label="Date" type="date" value={filter.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
        <FormControl fullWidth>
          <InputLabel>Event Type</InputLabel>
          <Select name="event_type" value={filter.event_type} label="Event Type" onChange={handleInputChange}>
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="volunteer">Volunteer</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Day of Week</InputLabel>
          <Select name="day_of_week" value={filter.day_of_week} label="Day of Week" onChange={handleInputChange}>
            <MenuItem value=""><em>Any</em></MenuItem>
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
            <MenuItem value="Sunday">Sunday</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleFilterEvents}>Filter</Button>
      </Box>

      {status === 'loading' ? <CircularProgress /> : error ? <Typography color="error">{`Error: ${error}`}</Typography> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Day of Week</TableCell>
                <TableCell>Dog Breed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {events.map((event, index) => ( // Добавлен уникальный ключ index для каждой строки
                <TableRow key={index}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.city}</TableCell>
                    <TableCell>{moment(event.date).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>{event.event_type}</TableCell>
                    <TableCell>{event.days_of_week}</TableCell>
                    <TableCell>{userDogs && userDogs.some(dog => dog.user_id === event.user_id) ? userDogs.find(dog => dog.user_id === event.user_id).breed : '-'}</TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default EventsList;




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserEvents } from '../features/events/eventsSlice';
// import {
//   CircularProgress, Typography, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
// } from '@mui/material';
// import moment from 'moment';

// function EventsList() {
//   const dispatch = useDispatch();
//   const { events, status, error } = useSelector(state => state.events);

//   useEffect(() => {
//     dispatch(fetchUserEvents());
//   }, [dispatch]);

//   if (status === 'loading') return <CircularProgress />;
//   if (error) return <Typography color="error">Error: {error}</Typography>;

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>My Events</Typography>
//       {events.length ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Day of Week</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map((event) => (
//                 <TableRow key={event.id}>
//                   <TableCell>{event.title || 'No data'}</TableCell>
//                   <TableCell>{event.city || 'No data'}</TableCell>
//                   <TableCell>{moment(event.date).format('YYYY-MM-DD')}</TableCell>
//                   <TableCell>{event.event_type || 'No data'}</TableCell>
//                   <TableCell>{event.days_of_week || 'No data'}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : <Typography>No events found</Typography>}
//     </Box>
//   );
// }

// export default EventsList;











// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEvents, deleteEvent } from '../features/events/eventsSlice';
// import { Typography, CircularProgress, List, ListItem, ListItemText, Box, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
// import AddEventForm from './AddEventForm';

// const EventsList = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { events, status, error } = useSelector((state) => state.events);

//     useEffect(() => {
//         dispatch(fetchEvents());
//     }, [dispatch]);

//     const handleEditEvent = (eventId) => {
//         navigate(`/events/${eventId}/edit`);
//     };

//     const handleDeleteEvent = (eventId) => {
//         dispatch(deleteEvent(eventId));
//     };

//     const updateEventList = () => {
//         dispatch(fetchEvents());
//     };

//     if (status === 'loading') return <CircularProgress />;
//     if (error) return <Typography color="error">Error: {error}</Typography>;

//     return (
//         <Box sx={{ p: 2 }}>
//             <Typography variant="h4" gutterBottom>Events List</Typography>
//             <AddEventForm updateEventList={updateEventList} />
//             <List>
//                 {events.length ? events.map((event, index) => (
//                     <ListItem key={`${event.event_id}-${index}`} secondaryAction={
//                         <>
//                             <IconButton edge="end" aria-label="edit" onClick={() => handleEditEvent(event.event_id)}>
//                                 <EditIcon />
//                             </IconButton>
//                             <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEvent(event.event_id)}>
//                                 <DeleteIcon />
//                             </IconButton>
//                         </>
//                     }>
//                         <ListItemText primary={`${event.title} - ${event.date} - ${event.location}`} />
//                     </ListItem>
//                 )) : <Typography>No events found</Typography>}
//             </List>
//         </Box>
//     );
// };

// export default EventsList;


