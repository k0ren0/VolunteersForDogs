import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserEvents, deleteEvent, updateEvent } from '../features/events/eventsSlice';
import { fetchUserDogs } from '../features/dogs/dogsSlice';
import {
  TextField, Button, Typography, CircularProgress, Box, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material'; // импортируем иконки

import moment from 'moment';

function EventsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const { events, status, error, isEditing } = useSelector(state => state.events);
  const userDogs = useSelector(state => state.dogs.dogs);

  const [filter, setFilter] = useState({
    title: '',
    city: '',
    date: '',
    event_type: '',
    day_of_week: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      dispatch(fetchUserEvents()).then(() => setLoading(false));
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
    setLoading(true);
    dispatch(fetchUserEvents(filter)).then(() => setLoading(false));
  };

  const handleEditEvent = (event_id) => {
    dispatch(updateEvent({ event_id, eventData: {} }));
  };

  const handleDeleteEvent = (event_id) => {
    dispatch(deleteEvent(event_id));
  };

  const handleEventFieldChange = (event_id, field, value) => {
    dispatch(updateEvent({ event_id, eventData: { [field]: value } }));
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

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{`Error: ${error}`}</Typography>
      ) : status === 'loading' ? (
        <CircularProgress />
      ) : (
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.event_id}>
                  <TableCell>
                    {isEditing === event.event_id ? (
                      <TextField
                        value={event.title}
                        onChange={(e) => handleEventFieldChange(event.event_id, 'title', e.target.value)}
                      />
                    ) : (
                      event.title
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === event.event_id ? (
                      <TextField
                        value={event.city}
                        onChange={(e) => handleEventFieldChange(event.event_id, 'city', e.target.value)}
                      />
                    ) : (
                      event.city
                    )}
                  </TableCell>
                  <TableCell>
                    {moment(event.date).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell>{event.event_type}</TableCell>
                  <TableCell>{event.day_of_week}</TableCell>
                  <TableCell>{userDogs && userDogs.some(dog => dog.user_id === event.user_id) ? userDogs.find(dog => dog.user_id === event.user_id).breed : '-'}</TableCell>
                  <TableCell>
                    {isEditing === event.event_id ? (
                      <Button onClick={() => handleEditEvent(event.event_id)}><SaveIcon /></Button>
                    ) : (
                      <Button onClick={() => handleEditEvent(event.event_id)}><EditIcon /></Button>
                    )}
                    <Button onClick={() => handleDeleteEvent(event.event_id)}><DeleteIcon /></Button>
                  </TableCell>
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


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchUserEvents, deleteEvent, updateEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs } from '../features/dogs/dogsSlice';
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import moment from 'moment';

// function EventsList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector(state => state.auth);
//   const { events, status, error, isEditing } = useSelector(state => state.events);
//   const userDogs = useSelector(state => state.dogs.dogs);

//   const [filter, setFilter] = useState({
//     title: '',
//     city: '',
//     date: '',
//     event_type: '',
//     day_of_week: ''
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (token) {
//       setLoading(true);
//       dispatch(fetchUserEvents()).then(() => setLoading(false));
//       dispatch(fetchUserDogs());
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterEvents = () => {
//     setLoading(true);
//     dispatch(fetchUserEvents(filter)).then(() => setLoading(false));
//   };

//   const handleEditEvent = (event_id) => {
//     dispatch(updateEvent({ event_id, eventData: {} }));
//   };

//   const handleDeleteEvent = (event_id) => {
//     dispatch(deleteEvent(event_id));
//   };

//   const handleEventFieldChange = (event_id, field, value) => {
//     dispatch(updateEvent({ event_id, eventData: { [field]: value } }));
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

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{`Error: ${error}`}</Typography>
//       ) : status === 'loading' ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Day of Week</TableCell>
//                 <TableCell>Dog Breed</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map((event) => (
//                 <TableRow key={event.event_id}>
//                   <TableCell>
//                     {isEditing === event.event_id ? (
//                       <TextField
//                         value={event.title}
//                         onChange={(e) => handleEventFieldChange(event.event_id, 'title', e.target.value)}
//                       />
//                     ) : (
//                       event.title
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {isEditing === event.event_id ? (
//                       <TextField
//                         value={event.city}
//                         onChange={(e) => handleEventFieldChange(event.event_id, 'city', e.target.value)}
//                       />
//                     ) : (
//                       event.city
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {moment(event.date).format('YYYY-MM-DD')}
//                   </TableCell>
//                   <TableCell>{event.event_type}</TableCell>
//                   <TableCell>{event.day_of_week}</TableCell>
//                   <TableCell>{userDogs && userDogs.some(dog => dog.user_id === event.user_id) ? userDogs.find(dog => dog.user_id === event.user_id).breed : '-'}</TableCell>
//                   <TableCell>
//                     {isEditing === event.event_id ? (
//                       <Button onClick={() => handleEditEvent(event.event_id)}>Save</Button>
//                     ) : (
//                       <Button onClick={() => handleEditEvent(event.event_id)}>Edit</Button>
//                     )}
//                     <Button onClick={() => handleDeleteEvent(event.event_id)}>Delete</Button>
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

// export default EventsList;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchUserEvents, deleteEvent, updateEvent } from '../features/events/eventsSlice';
// import { fetchUserDogs } from '../features/dogs/dogsSlice';
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import moment from 'moment';

// function EventsList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector(state => state.auth);
//   const { events, status, error } = useSelector(state => state.events); // Используем status
//   const userDogs = useSelector(state => state.dogs.dogs);

//   const [filter, setFilter] = useState({
//     title: '',
//     city: '',
//     date: '',
//     event_type: '',
//     day_of_week: ''
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (token) {
//       setLoading(true);
//       dispatch(fetchUserEvents()).then(() => setLoading(false));
//       dispatch(fetchUserDogs());
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterEvents = () => {
//     setLoading(true);
//     dispatch(fetchUserEvents(filter)).then(() => setLoading(false));
//   };

//   const handleEditEvent = (event_id) => {
//     console.log(`Editing event with ID: ${event_id}`);
//     // Находим индекс события по ID
//     const eventIndex = events.findIndex(event => event.event_id === event_id);
//     // Создаем копию массива событий
//     const updatedEvents = [...events];
//     // Устанавливаем флаг редактирования для выбранного события
//     updatedEvents[eventIndex].editing = true;
//     // Обновляем состояние событий
//     dispatch({ type: 'events/setEvents', payload: updatedEvents });
//   };

//   const handleSaveEvent = (event_id) => {
//     console.log(`Saving event with ID: ${event_id}`);
//     // Находим индекс события по ID
//     const eventIndex = events.findIndex(event => event.event_id === event_id);
//     // Создаем копию массива событий
//     const updatedEvents = [...events];
//     // Удаляем флаг редактирования для выбранного события
//     delete updatedEvents[eventIndex].editing;
//     // Обновляем состояние событий
//     dispatch({ type: 'events/setEvents', payload: updatedEvents });
//     // Получаем измененные данные
//     const updatedData = {
//       title: updatedEvents[eventIndex].title,
//       city: updatedEvents[eventIndex].city,
//       date: updatedEvents[eventIndex].date,
//       event_type: updatedEvents[eventIndex].event_type,
//       days_of_week: updatedEvents[eventIndex].days_of_week,
//     };
//     // Обновляем событие на сервере
//     dispatch(updateEvent({ event_id, eventData: updatedData }))
//       .then(() => {
//         dispatch(fetchUserEvents()); // После обновления обновляем список событий
//       })
//       .catch((error) => {
//         console.error('Error updating event:', error);
//       });
//   };

//   const handleDeleteEvent = (event_id) => {
//     console.log(`Deleting event with ID: ${event_id}`);
//     dispatch(deleteEvent(event_id))
//       .then(() => {
//         dispatch(fetchUserEvents()); // После удаления обновляем список событий
//       })
//       .catch((error) => {
//         console.error('Error deleting event:', error);
//       });
//   };

//   const handleEditFieldChange = (event_id, fieldName, value) => {
//     // Находим индекс события по ID
//     const eventIndex = events.findIndex(event => event.event_id === event_id);
//     // Создаем копию массива событий
//     const updatedEvents = [...events];
//     // Обновляем значение поля
//     updatedEvents[eventIndex][fieldName] = value;
//     // Обновляем состояние событий
//     dispatch({ type: 'events/setEvents', payload: updatedEvents });
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

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{`Error: ${error}`}</Typography>
//       ) : status === 'loading' ? ( // Добавляем условие для статуса загрузки
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Day of Week</TableCell>
//                 <TableCell>Dog Breed</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map((event, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     {event.editing ? (
//                       <TextField
//                         value={event.title}
//                         onChange={(e) => handleEditFieldChange(event.event_id, 'title', e.target.value)}
//                       />
//                     ) : event.title}
//                   </TableCell>
//                   <TableCell>
//                     {event.editing ? (
//                       <TextField
//                         value={event.city}
//                         onChange={(e) => handleEditFieldChange(event.event_id, 'city', e.target.value)}
//                       />
//                     ) : event.city}
//                   </TableCell>
//                   <TableCell>
//                     {event.editing ? (
//                       <TextField
//                         type="date"
//                         value={moment(event.date).format('YYYY-MM-DD')}
//                         onChange={(e) => handleEditFieldChange(event.event_id, 'date', e.target.value)}
//                       />
//                     ) : moment(event.date).format('YYYY-MM-DD')}
//                   </TableCell>
//                   <TableCell>
//                     {event.editing ? (
//                       <TextField
//                         value={event.event_type}
//                         onChange={(e) => handleEditFieldChange(event.event_id, 'event_type', e.target.value)}
//                       />
//                     ) : event.event_type}
//                   </TableCell>
//                   <TableCell>{event.days_of_week}</TableCell>
//                   <TableCell>{userDogs && userDogs.some(dog => dog.user_id === event.user_id) ? userDogs.find(dog => dog.user_id === event.user_id).breed : '-'}</TableCell>
//                   <TableCell>
//                     {event.editing ? (
//                       <Button onClick={() => handleSaveEvent(event.event_id)}>Save</Button>
//                     ) : (
//                       <Button onClick={() => handleEditEvent(event.event_id)}>Edit</Button>
//                     )}
//                     <Button onClick={() => handleDeleteEvent(event.event_id)}>Delete</Button>
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

// export default EventsList;



///////work


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchUserEvents, deleteEvent, updateEvent } from '../features/events/eventsSlice'; // Updated import
// import { fetchUserDogs } from '../features/dogs/dogsSlice';
// import {
//   TextField, Button, Typography, CircularProgress, Box, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import moment from 'moment';

// function EventsList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector(state => state.auth);
//   const { events, status, error } = useSelector(state => state.events);
//   const userDogs = useSelector(state => state.dogs.dogs);

//   const [filter, setFilter] = useState({
//     title: '',
//     city: '',
//     date: '',
//     event_type: '',
//     day_of_week: ''
//   });

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchUserEvents());
//       dispatch(fetchUserDogs());
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, navigate, token]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterEvents = () => {
//     dispatch(fetchUserEvents(filter));
//   };

//   const handleEditEvent = (event_id) => {
//     console.log(`Editing event with ID: ${event_id}`);
//     // Dispatch the updateEvent action with eventId and eventData
//     dispatch(updateEvent({ event_id, eventData: {} }));
//   };

//   const handleDeleteEvent = (event_id) => {
//     console.log(`Deleting event with ID: ${event_id}`);
//     // Dispatch the deleteEvent action with eventId
//     dispatch(deleteEvent(event_id));
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
//                 <TableCell>Dog Breed</TableCell>
//                 <TableCell>Actions</TableCell> {/* Add a cell for actions */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map((event, index) => (
//                 <TableRow key={index}>
//                     <TableCell>{event.title}</TableCell>
//                     <TableCell>{event.city}</TableCell>
//                     <TableCell>{moment(event.date).format('YYYY-MM-DD')}</TableCell>
//                     <TableCell>{event.event_type}</TableCell>
//                     <TableCell>{event.days_of_week}</TableCell>
//                     <TableCell>{userDogs && userDogs.some(dog => dog.user_id === event.user_id) ? userDogs.find(dog => dog.user_id === event.user_id).breed : '-'}</TableCell>
//                     <TableCell>
//                         <Button onClick={() => handleEditEvent(event.event_id)}>Edit</Button>
//                         <Button onClick={() => handleDeleteEvent(event.event_id)}>Delete</Button>
//                     </TableCell>
//                     </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }

// export default EventsList;



