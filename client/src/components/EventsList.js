import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
// Допустим, вы используете date-fns для форматирования даты и времени
import { format } from 'date-fns';

const EventsList = () => {
    const events = useSelector((state) => state.users.userEvents || []); // Предоставление пустого массива по умолчанию
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Events List
            </Typography>
            <List>
                {events.map((event) => (
                    <div key={event.event_id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={event.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {/* Форматирование даты и времени */}
                                            {`${format(new Date(event.date), 'PP')}, ${event.start_time} - ${event.end_time}`}
                                        </Typography>
                                        <br />
                                        {event.description}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </div>
    );
};

export default EventsList;






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


