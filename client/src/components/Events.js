import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';
import {
  TextField, Button, Typography, CircularProgress, Box, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const { events, status, error } = useSelector(state => state.events);

  const [newEventData, setNewEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    volunteer_needed: 0,
    dogBreed: ''
  });
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchEvents());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, token]);

  const handleEventAction = async () => {
    if (editingEventId) {
      await dispatch(updateEvent({ ...newEventData, id: editingEventId }));
    } else {
      await dispatch(createEvent(newEventData));
    }
    setNewEventData({
      title: '',
      description: '',
      date: '',
      location: '',
      volunteer_needed: 0,
      dogBreed: ''
    });
    setEditingEventId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    setNewEventData(event);
    setEditingEventId(eventId);
  };

  const handleDeleteEvent = async (eventId) => {
    await dispatch(deleteEvent(eventId));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Manage Events</Typography>
      <Box sx={{ mb: 2 }}>
        {/* Event Form */}
        <TextField name="title" label="Title" value={newEventData.title} onChange={handleInputChange} sx={{ mr: 2 }} />
        <TextField name="description" label="Description" value={newEventData.description} onChange={handleInputChange} sx={{ mr: 2 }} />
        <TextField name="date" label="Date" type="date" value={newEventData.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} sx={{ mr: 2 }} />
        <TextField name="location" label="Location" value={newEventData.location} onChange={handleInputChange} sx={{ mr: 2 }} />
        <TextField name="volunteer_needed" label="Volunteers Needed" type="number" value={newEventData.volunteer_needed} onChange={handleInputChange} sx={{ mr: 2 }} />
        <TextField name="dogBreed" label="Dog Breed" value={newEventData.dogBreed} onChange={handleInputChange} />
        <Button variant="contained" color="primary" onClick={handleEventAction} sx={{ mt: 3 }}>
          {editingEventId ? 'Save Changes' : 'Create Event'}
        </Button>
      </Box>

      {status === 'loading' ? <CircularProgress /> : error ? <Typography color="error">Error: {error}</Typography> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Volunteers Needed</TableCell>
                <TableCell>Dog Breed</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.volunteer_needed}</TableCell>
                  <TableCell>{event.dogBreed}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditEvent(event.id)} color="primary" variant="contained" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteEvent(event.id)} color="secondary" variant="contained">
                      Delete
                    </Button>
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

export default Events;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';
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
//   const [filters, setFilters] = useState({
//     title: '',
//     description: '',
//     date: '',
//     location: '',
//     volunteer_needed: '',
//     dogBreed: ''
//   });

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
//       await dispatch(createEvent(newEventData));
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
//     dispatch(fetchEvents());
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewEventData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
//   };

//   const handleEditEvent = (eventId) => {
//     const event = events.find(e => e.id === eventId);
//     setNewEventData(event);
//     setEditingEventId(eventId);
//   };

//   const handleDeleteEvent = async (eventId) => {
//     await dispatch(deleteEvent(eventId));
//     dispatch(fetchEvents());
//   };

//   const filteredEvents = events.filter(event =>
//     Object.entries(filters).every(([key, value]) =>
//       !value || event[key].toString().toLowerCase().includes(value.toLowerCase())
//     )
//   );

//   if (status === 'loading') return <CircularProgress />;
//   if (error) return <Typography color="error">Error: {error}</Typography>;

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h4" gutterBottom>Manage Events</Typography>
//       <Box sx={{ mb: 2 }}>
//         {/* Form fields and action button */}
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

//       <Box sx={{ mb: 2 }}>
//         {/* Filters */}
//         {Object.keys(filters).map(key => (
//           <TextField
//             key={key}
//             name={key}
//             label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
//             value={filters[key]}
//             onChange={handleFilterChange}
//             sx={{ m: 1 }}
//             type={key === 'date' ? 'date' : 'text'}
//             InputLabelProps={key === 'date' ? { shrink: true } : undefined}
//           />
//         ))}
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Volunteers Needed</TableCell>
//               <TableCell>Dog Breed</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredEvents.map(event => (
//               <TableRow key={event.id}>
//                 <TableCell>{event.title}</TableCell>
//                 <TableCell>{event.description}</TableCell>
//                 <TableCell>{event.date}</TableCell>
//                 <TableCell>{event.location}</TableCell>
//                 <TableCell>{event.volunteer_needed}</TableCell>
//                 <TableCell>{event.dogBreed}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleEditEvent(event.id)} color="primary" variant="contained" sx={{ mr: 1 }}>
//                     Edit
//                   </Button>
//                   <Button onClick={() => handleDeleteEvent(event.id)} color="secondary" variant="contained">
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default Events;





