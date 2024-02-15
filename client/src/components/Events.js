import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFilteredEvents } from '../features/events/eventsSlice';
import { fetchUserDogs } from '../features/dogs/dogsSlice';
import {
  TextField, Button, Typography, CircularProgress, Box, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import moment from 'moment';

function Events() {
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
      dispatch(fetchFilteredEvents(filter));
      dispatch(fetchUserDogs());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, token, filter]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterEvents = () => {
    dispatch(fetchFilteredEvents(filter));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Filter Events</Typography>
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
              {events.map((event) => (
                <TableRow key={event.event_id}>
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

export default Events;






/////// proWORK)
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchFilteredEvents } from '../features/events/eventsSlice';
// import { fetchUserDogs } from '../features/dogs/dogsSlice';
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import moment from 'moment'; // Импорт библиотеки moment для форматирования даты

// function Events() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector(state => state.auth);
//   const { events, status, error } = useSelector(state => state.events);
//   const userDogs = useSelector(state => state.dogs.userDogs); // Добавлено получение списка собак пользователя

//   const [filter, setFilter] = useState({
//     title: '',
//     city: '',
//     date: '',
//     event_type: '',
//     day_of_week: ''
//   });

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchFilteredEvents(filter));
//       dispatch(fetchUserDogs());
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token, filter]);

//   console.log(userDogs); 

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterEvents = () => {
//     dispatch(fetchFilteredEvents(filter));
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>Filter Events</Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//         <TextField name="title" label="Title" value={filter.title} onChange={handleInputChange} />
//         <TextField name="city" label="City" value={filter.city} onChange={handleInputChange} />
//         <TextField name="date" label="Date" type="date" value={filter.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <FormControl fullWidth>
//           <InputLabel>Event Type</InputLabel>
//           <Select name="event_type" value={filter.event_type} label="Event Type" onChange={handleInputChange}>
//             <MenuItem value=""><em>None</em></MenuItem>
//             <MenuItem value="volunteer">Volunteer</MenuItem>
//             <MenuItem value="customer">Customer</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel>Day of Week</InputLabel>
//           <Select name="day_of_week" value={filter.day_of_week} label="Day of Week" onChange={handleInputChange}>
//             <MenuItem value=""><em>Any</em></MenuItem>
//             <MenuItem value="Monday">Monday</MenuItem>
//             <MenuItem value="Tuesday">Tuesday</MenuItem>
//             <MenuItem value="Wednesday">Wednesday</MenuItem>
//             <MenuItem value="Thursday">Thursday</MenuItem>
//             <MenuItem value="Friday">Friday</MenuItem>
//             <MenuItem value="Saturday">Saturday</MenuItem>
//             <MenuItem value="Sunday">Sunday</MenuItem>
//           </Select>
//         </FormControl>
//         <Button variant="contained" color="primary" onClick={handleFilterEvents}>Filter</Button>
//       </Box>

//       {status === 'loading' ? <CircularProgress /> : error ? <Typography color="error">{`Error: ${error}`}</Typography> : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Day of Week</TableCell>
//                 <TableCell>Dog Breed</TableCell> {/* Добавляем столбец для породы собаки */}
//                 {/* <TableCell>Dog ID</TableCell> */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map((event) => (
//                 <TableRow key={event.event_id}>
//                   <TableCell>{event.title}</TableCell>
//                   <TableCell>{event.city}</TableCell>
//                   <TableCell>{moment(event.date).format('YYYY-MM-DD')}</TableCell>
//                   <TableCell>{event.event_type}</TableCell>
//                   {/* <TableCell>{event.dog_id}</TableCell> */}
//                   <TableCell>{event.days_of_week}</TableCell>
//                   <TableCell>
//                     {userDogs && userDogs.some(dog => dog.user_id === event.user_id) ? userDogs.find(dog => dog.user_id === event.user_id).user_id : '-'}
//                     {/* {event.dog_id ? event.dog_id : '-'} */}
//                   </TableCell> {/* Проверка наличия собаки пользователя и отображение ее идентификатора */}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//     </Box>
//   );
// }

// export default Events;



//LAST поменять и рассмотреть создание dog_id в ивентах

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchFilteredEvents } from '../features/events/eventsSlice';
// import { fetchUserDogs } from '../features/dogs/dogsSlice';
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';

// function Events() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector(state => state.auth);
//   const userDogs = useSelector(state => state.dogs.userDogs);
//   const { events, status, error } = useSelector(state => state.events);

//   const [filter, setFilter] = useState({
//     title: '',
//     city: '',
//     date: '',
//     event_type: '',
//     day_of_week: ''
//   });

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchFilteredEvents(filter));
//       dispatch(fetchUserDogs());
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token, filter]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterEvents = () => {
//     dispatch(fetchFilteredEvents(filter));
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>Filter Events</Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//         <TextField name="title" label="Title" value={filter.title} onChange={handleInputChange} />
//         <TextField name="city" label="City" value={filter.city} onChange={handleInputChange} />
//         <TextField name="date" label="Date" type="date" value={filter.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <FormControl fullWidth>
//           <InputLabel>Event Type</InputLabel>
//           <Select name="event_type" value={filter.event_type} label="Event Type" onChange={handleInputChange}>
//             <MenuItem value=""><em>None</em></MenuItem>
//             <MenuItem value="volunteer">Volunteer</MenuItem>
//             <MenuItem value="customer">Customer</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel>Day of Week</InputLabel>
//           <Select name="day_of_week" value={filter.day_of_week} label="Day of Week" onChange={handleInputChange}>
//             <MenuItem value=""><em>Any</em></MenuItem>
//             <MenuItem value="Monday">Monday</MenuItem>
//             <MenuItem value="Tuesday">Tuesday</MenuItem>
//             <MenuItem value="Wednesday">Wednesday</MenuItem>
//             <MenuItem value="Thursday">Thursday</MenuItem>
//             <MenuItem value="Friday">Friday</MenuItem>
//             <MenuItem value="Saturday">Saturday</MenuItem>
//             <MenuItem value="Sunday">Sunday</MenuItem>
//           </Select>
//         </FormControl>
//         <Button variant="contained" color="primary" onClick={handleFilterEvents}>Filter</Button>
//       </Box>

//       {status === 'loading' ? <CircularProgress /> : error ? <Typography color="error">{`Error: ${error}`}</Typography> : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Dog Breed</TableCell>
//                 <TableCell>Day of Week</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map(event => {
//                 const dog = userDogs.find(dog => dog.dog_id === event.dog_id);
//                 return (
//                   <TableRow key={event.event_id}>
//                     <TableCell>{event.title}</TableCell>
//                     <TableCell>{event.city}</TableCell>
//                     <TableCell>{event.date}</TableCell>
//                     <TableCell>{event.event_type}</TableCell>
//                     <TableCell>{dog ? dog.breed : 'Unknown'}</TableCell>
//                     <TableCell>{event.day_of_week}</TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }

// export default Events;





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchFilteredEvents } from '../features/events/eventsSlice';
// import { fetchUserDogs } from '../features/dogs/dogsSlice'; // Assume this action fetches the current user's dogs
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';

// function Events() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // Assuming the state structure includes auth for user token and dogs for user's dogs
//   const { token } = useSelector(state => state.auth);
//   const userDogs = useSelector(state => state.dogs.userDogs); // Assuming this is the state slice where user's dogs are stored
//   const { events, status, error } = useSelector(state => state.events);

//   const [filter, setFilter] = useState({
//     title: '',
//     city: '',
//     date: '',
//     event_type: '',
//     start_time: '',
//     end_time: '',
//     dogBreed: '',
//     day_of_week: '',
//   });

//   const [selectedDog, setSelectedDog] = useState('');

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchFilteredEvents(filter));
//       dispatch(fetchUserDogs()); // Fetch the user's dogs when the component mounts
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token, filter]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDogChange = (event) => {
//     setSelectedDog(event.target.value);
//   };

//   const handleFilterEvents = () => {
//     dispatch(fetchFilteredEvents(filter));
//   };

//   const handleAddDogToEvent = (eventId) => {
//     // Here you would dispatch an action to update the event with the selected dog
//     // This is a placeholder function, implement according to your backend API
//     console.log(`Adding dog ${selectedDog} to event ${eventId}`);
//     // dispatch(addDogToEvent(eventId, selectedDog));
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>Filter Events</Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//         <TextField name="title" label="Title" value={filter.title} onChange={handleInputChange} />
//         <TextField name="city" label="City" value={filter.city} onChange={handleInputChange} />
//         <TextField name="date" label="Date" type="date" value={filter.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <FormControl fullWidth>
//           <InputLabel>Event Type</InputLabel>
//           <Select name="event_type" value={filter.event_type} label="Event Type" onChange={handleInputChange}>
//             <MenuItem value=""><em>None</em></MenuItem>
//             <MenuItem value="volunteer">Volunteer</MenuItem>
//             <MenuItem value="customer">Customer</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField name="start_time" label="Start Time" type="time" value={filter.start_time} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <TextField name="end_time" label="End Time" type="time" value={filter.end_time} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <FormControl fullWidth>
//           <InputLabel>Dog</InputLabel>
//           <Select
//             value={selectedDog}
//             label="Dog"
//             onChange={handleDogChange}
//           >
//             {userDogs && userDogs.map(dog => (
//               <MenuItem key={dog.id} value={dog.id}>{dog.name}</MenuItem>
//             ))}
//           </Select>

//         </FormControl>
//         <Button variant="contained" color="primary" onClick={handleFilterEvents}>Filter</Button>
//       </Box>

//       {status === 'loading' ? <CircularProgress /> : error ? <Typography color="error">{`Error: ${error}`}</Typography> : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Start Time</TableCell>
//                 <TableCell>End Time</TableCell>
//                 <TableCell>Dog Breed</TableCell>
//                 <TableCell>Day of Week</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map(event => (
//                 <TableRow key={event.event_id}>
//                   <TableCell>{event.title}</TableCell>
//                   <TableCell>{event.city}</TableCell>
//                   <TableCell>{event.date}</TableCell>
//                   <TableCell>{event.event_type}</TableCell>
//                   <TableCell>{event.start_time}</TableCell>
//                   <TableCell>{event.end_time}</TableCell>
//                   <TableCell>{event.dogBreed}</TableCell>
//                   <TableCell>{event.day_of_week}</TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleAddDogToEvent(event.event_id)}>Add Dog</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }

// export default Events;





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchFilteredEvents } from '../features/events/eventsSlice';
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';

// function Events() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector(state => state.auth);
//   const { events, status, error } = useSelector(state => state.events);

//   const [filter, setFilter] = useState({
//     title: '',
//     city: '',
//     date: '',
//     event_type: '',
//     start_time: '',
//     end_time: '',
//     dogBreed: '',
//     day_of_week: ''
//   });

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchFilteredEvents(filter));
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token, filter]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterEvents = () => {
//     dispatch(fetchFilteredEvents(filter));
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>Filter Events</Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//         <TextField name="title" label="Title" value={filter.title} onChange={handleInputChange} />
//         <TextField name="city" label="City" value={filter.city} onChange={handleInputChange} />
//         <TextField name="date" label="Date" type="date" value={filter.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <FormControl fullWidth>
//           <InputLabel>Event Type</InputLabel>
//           <Select name="event_type" value={filter.event_type} label="Event Type" onChange={handleInputChange}>
//             <MenuItem value=""><em>None</em></MenuItem>
//             <MenuItem value="volunteer">Volunteer</MenuItem>
//             <MenuItem value="customer">Customer</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField name="start_time" label="Start Time" type="time" value={filter.start_time} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <TextField name="end_time" label="End Time" type="time" value={filter.end_time} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//         <TextField name="dogBreed" label="Dog Breed" value={filter.dogBreed} onChange={handleInputChange} />
//         <FormControl fullWidth>
//           <InputLabel>Day of Week</InputLabel>
//           <Select name="day_of_week" value={filter.day_of_week} label="Day of Week" onChange={handleInputChange}>
//             <MenuItem value=""><em>Any</em></MenuItem>
//             <MenuItem value="Monday">Monday</MenuItem>
//             <MenuItem value="Tuesday">Tuesday</MenuItem>
//             <MenuItem value="Wednesday">Wednesday</MenuItem>
//             <MenuItem value="Thursday">Thursday</MenuItem>
//             <MenuItem value="Friday">Friday</MenuItem>
//             <MenuItem value="Saturday">Saturday</MenuItem>
//             <MenuItem value="Sunday">Sunday</MenuItem>
//           </Select>
//         </FormControl>
//         <Button variant="contained" color="primary" onClick={handleFilterEvents}>Filter</Button>
//       </Box>
      
//       {status === 'loading' ? <CircularProgress /> : error ? <Typography color="error">{`Error: ${error}`}</Typography> : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Start Time</TableCell>
//                 <TableCell>End Time</TableCell>
//                 <TableCell>Dog Breed</TableCell>
//                 <TableCell>Day of Week</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map(event => (
//                 <TableRow key={event.event_id}>
//                   <TableCell>{event.title}</TableCell>
//                   <TableCell>{event.city}</TableCell>
//                   <TableCell>{event.date}</TableCell>
//                   {/* <TableCell>{event.event_type}</TableCell>
//                   <TableCell>{event.start_time}</TableCell> */}
//                   <TableCell>{event.end_time}</TableCell>
//                   {/* <TableCell>{event.dogBreed}</TableCell> */}
//                   <TableCell>{event.day_of_week}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }

// export default Events;





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
// } from '@mui/material';

// function Events() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector(state => state.auth);
//   const { events, status, error } = useSelector(state => state.events);

//   const [newEventData, setNewEventData] = useState({
//     title: '',
//     description: '',
//     date: '',
//     location: '',
//     volunteer_needed: 0,
//     dogBreed: ''
//   });
//   const [editingEventId, setEditingEventId] = useState(null);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchEvents());
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token]);

//   const handleEventAction = async () => {
//     if (editingEventId) {
//       await dispatch(updateEvent({ ...newEventData, id: editingEventId }));
//     } else {
//       await dispatch(addEvent(newEventData));
//     }
//     setNewEventData({
//       title: '',
//       description: '',
//       date: '',
//       location: '',
//       volunteer_needed: 0,
//       dogBreed: ''
//     });
//     setEditingEventId(null);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewEventData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditEvent = (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     setNewEventData(event);
//     setEditingEventId(eventId);
//   };

//   const handleDeleteEvent = async (eventId) => {
//     await dispatch(deleteEvent(eventId));
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>Manage Events</Typography>
//       <Box sx={{ mb: 2 }}>
//         {/* Event Form */}
//         <TextField name="title" label="Title" value={newEventData.title} onChange={handleInputChange} sx={{ mr: 2 }} />
//         <TextField name="description" label="Description" value={newEventData.description} onChange={handleInputChange} sx={{ mr: 2 }} />
//         <TextField name="date" label="Date" type="date" value={newEventData.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} sx={{ mr: 2 }} />
//         <TextField name="location" label="Location" value={newEventData.location} onChange={handleInputChange} sx={{ mr: 2 }} />
//         <TextField name="volunteer_needed" label="Volunteers Needed" type="number" value={newEventData.volunteer_needed} onChange={handleInputChange} sx={{ mr: 2 }} />
//         <TextField name="dogBreed" label="Dog Breed" value={newEventData.dogBreed} onChange={handleInputChange} />
//         <Button variant="contained" color="primary" onClick={handleEventAction} sx={{ mt: 3 }}>
//           {editingEventId ? 'Save Changes' : 'Create Event'}
//         </Button>
//       </Box>

//       {status === 'loading' ? <CircularProgress /> : error ? <Typography color="error">Error: {error}</Typography> : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Location</TableCell>
//                 <TableCell>Volunteers Needed</TableCell>
//                 <TableCell>Dog Breed</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map(event => (
//                 <TableRow key={event.id}>
//                   <TableCell>{event.title}</TableCell>
//                   <TableCell>{event.description}</TableCell>
//                   <TableCell>{event.date}</TableCell>
//                   <TableCell>{event.location}</TableCell>
//                   <TableCell>{event.volunteer_needed}</TableCell>
//                   <TableCell>{event.dogBreed}</TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleEditEvent(event.id)} color="primary" variant="contained" sx={{ mr: 1 }}>
//                       Edit
//                     </Button>
//                     <Button onClick={() => handleDeleteEvent(event.id)} color="secondary" variant="contained">
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }

// export default Events;


