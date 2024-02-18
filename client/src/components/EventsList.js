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
                  <TableCell>{event.days_of_week}</TableCell>
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
// import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';

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

//   // Не требует изменений, так как фильтрация будет происходить на клиенте
//   const handleFilterEvents = () => {
//     // Функция остается для сохранения интерфейса, но не выполняет запрос к серверу
//   };

//   // Прямо здесь реализуем фильтрацию
//   const filteredEvents = events.filter(event => {
//     return (!filter.title || event.title.toLowerCase().includes(filter.title.toLowerCase())) &&
//            (!filter.city || event.city.toLowerCase().includes(filter.city.toLowerCase())) &&
//            (!filter.date || moment(event.date).format('YYYY-MM-DD') === filter.date) &&
//            (!filter.event_type || event.event_type === filter.event_type) &&
//            (!filter.day_of_week || moment(event.date).format('dddd') === filter.day_of_week);
//   });

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>Filter Events</Typography>
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//         {/* Форма фильтрации - без изменений */}
//       </Box>

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{`Error: ${error}`}</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               {/* Заголовок таблицы - без изменений */}
//             </TableHead>
//             <TableBody>
//               {filteredEvents.map((event) => (
//                 <TableRow key={event.event_id}>
//                   {/* Строки таблицы - без изменений */}
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
