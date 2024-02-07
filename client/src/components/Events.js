import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchUsers } from '../features/users/usersSlice';

function Events() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, user } = useSelector((state) => state.auth);
    const { events, status, error } = useSelector((state) => state.events);
    const users = useSelector((state) => state.users.list);

    const [filter, setFilter] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [newEventData, setNewEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        volunteer_needed: 0,
        dogBreed: '' // Добавляем поле для пародии собаки
    });

    useEffect(() => {
        if (token) {
            dispatch(fetchEvents());
            if (!users) {
                dispatch(fetchUsers());
            }
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, token, users]);

    const handleCreateEvent = async () => {
        try {
            await dispatch(createEvent(newEventData));
            setNewEventData({
                title: '',
                description: '',
                date: '',
                location: '',
                volunteer_needed: 0,
                dogBreed: ''
            });
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEventData({
            ...newEventData,
            [name]: value,
        });
    };

    const handleEditEvent = (eventId) => {
        const updatedEvents = events.map(event =>
            event.id === eventId ? { ...event, isEditing: true } : event
        );
        dispatch({ type: 'UPDATE_EVENTS', payload: updatedEvents });
    };

    const handleSaveEvent = async (eventId, eventData) => {
        try {
            await dispatch(updateEvent({ eventId, eventData: { ...eventData, isEditing: false } }));
            dispatch(fetchEvents());
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await dispatch(deleteEvent(eventId));
            dispatch(fetchEvents());
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    if (status === 'loading') return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    // Фильтрация событий по введенной информации
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(filter.toLowerCase()) ||
        event.description.toLowerCase().includes(filter.toLowerCase()) ||
        event.location.toLowerCase().includes(filter.toLowerCase()) ||
        event.creator.name.toLowerCase().includes(filter.toLowerCase()) ||
        event.date.includes(filter) ||  // Добавляем фильтрацию по дате
        event.dogBreed.toLowerCase().includes(filter.toLowerCase()) // Фильтрация по пародии собаки
    );

    return (
        <Box>
            <Typography variant="h1">Events</Typography>
            <Button variant="contained" onClick={handleCreateEvent}>Create Event</Button>
            <FormControl>
                <InputLabel id="filter-label">Filter</InputLabel>
                <Select
                    labelId="filter-label"
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">All Users</MenuItem>
                    {users && users.map(user => (
                        <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="h4">Events List</Typography>
            <Box>
                <TextField
                    name="title"
                    label="Title"
                    value={newEventData.title}
                    onChange={handleInputChange}
                />
                <TextField
                    name="description"
                    label="Description"
                    value={newEventData.description}
                    onChange={handleInputChange}
                />
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    value={newEventData.date}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    name="location"
                    label="Location"
                    value={newEventData.location}
                    onChange={handleInputChange}
                />
                <TextField
                    name="volunteer_needed"
                    label="Volunteers Needed"
                    type="number"
                    value={newEventData.volunteer_needed}
                    onChange={handleInputChange}
                />
                <TextField
                    name="dogBreed"
                    label="Dog Breed"
                    value={newEventData.dogBreed}
                    onChange={handleInputChange}
                />
                <Button onClick={handleCreateEvent}>Create</Button>
            </Box>
            {filteredEvents.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Volunteers Needed</TableCell>
                                <TableCell>Creator</TableCell>
                                <TableCell>Dog Breed</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEvents.map((event) => (
                                <TableRow key={event.id}>
                                    {/* Отображаем информацию о событии */}
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{event.description}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.volunteer_needed}</TableCell>
                                    <TableCell>{event.creator && event.creator.name}</TableCell>
                                    <TableCell>{event.dogBreed}</TableCell>
                                    <TableCell>
                                        {/* Добавляем кнопки редактирования и удаления */}
                                        <Button onClick={() => handleEditEvent(event.id)}>Edit</Button>
                                        <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1">No events available</Typography>
            )}
        </Box>
    );
}

export default Events;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { fetchUsers } from '../features/users/usersSlice';

// function Events() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { token, user } = useSelector((state) => state.auth);
//     const { events, status, error } = useSelector((state) => state.events);
//     const users = useSelector((state) => state.users.list);

//     const [selectedUserId, setSelectedUserId] = useState('');
//     const [newEventData, setNewEventData] = useState({
//         title: '',
//         description: '',
//         date: '',
//         location: '',
//         volunteer_needed: 0,
//     });

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchEvents());
//             // Вызываем fetchUsers только если пользователи еще не загружены
//             if (!users) {
//                 dispatch(fetchUsers());
//             }
//         } else {
//             navigate("/login");
//         }
//     }, [dispatch, navigate, token, users]);

//     const handleCreateEvent = async () => {
//         try {
//             await dispatch(createEvent(newEventData));
//             setNewEventData({
//                 title: '',
//                 description: '',
//                 date: '',
//                 location: '',
//                 volunteer_needed: 0,
//             });
//         } catch (error) {
//             console.error('Error creating event:', error);
//         }
//     };

//     const handleFilterChange = (event) => {
//         setSelectedUserId(event.target.value);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setNewEventData({
//             ...newEventData,
//             [name]: value,
//         });
//     };

//     const handleEditEvent = (eventId) => {
//         const updatedEvents = events.map(event =>
//             event.id === eventId ? { ...event, isEditing: true } : event
//         );
//         dispatch({ type: 'UPDATE_EVENTS', payload: updatedEvents });
//     };

//     const handleSaveEvent = async (eventId, eventData) => {
//         try {
//             await dispatch(updateEvent({ eventId, eventData: { ...eventData, isEditing: false } }));
//             dispatch(fetchEvents()); // Получаем обновленный список событий после сохранения изменений
//         } catch (error) {
//             console.error('Error saving event:', error);
//         }
//     };

//     const handleDeleteEvent = async (eventId) => {
//         try {
//             await dispatch(deleteEvent(eventId));
//             dispatch(fetchEvents()); // Получаем обновленный список событий после удаления события
//         } catch (error) {
//             console.error('Error deleting event:', error);
//         }
//     };

//     if (status === 'loading') return <CircularProgress />;
//     if (error) return <div>Error: {error}</div>;


// // Before rendering events, check if events is undefined
//     if (!events) {
//       return <CircularProgress />;
//     }

// // Handle the case where events is undefined or empty
//     if (!events || !Array.isArray(events) || events.length === 0) {
//       return <Typography variant="body1">No events available</Typography>;
//     }


//     return (
//         <Box>
//             <Typography variant="h1">Events</Typography>
//             <Button variant="contained" onClick={handleCreateEvent}>Create Event</Button>
//             <FormControl>
//                 <InputLabel id="filter-label">Filter</InputLabel>
//                 <Select
//                     labelId="filter-label"
//                     id="filter"
//                     value={selectedUserId}
//                     onChange={handleFilterChange}
//                 >
//                     <MenuItem value="">All Users</MenuItem>
//                     {users && users.map(user => (
//                         <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <Typography variant="h4">Events List</Typography>
//             <Box>
//                 <TextField
//                     name="title"
//                     label="Title"
//                     value={newEventData.title}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     name="description"
//                     label="Description"
//                     value={newEventData.description}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     name="date"
//                     label="Date"
//                     type="date"
//                     value={newEventData.date}
//                     onChange={handleInputChange}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                 />
//                 <TextField
//                     name="location"
//                     label="Location"
//                     value={newEventData.location}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     name="volunteer_needed"
//                     label="Volunteers Needed"
//                     type="number"
//                     value={newEventData.volunteer_needed}
//                     onChange={handleInputChange}
//                 />
//                 <Button onClick={handleCreateEvent}>Create</Button>
//             </Box>
//             {events &&Array.isArray(events) && events.length > 0 ? (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Title</TableCell>
//                                 <TableCell>Description</TableCell>
//                                 <TableCell>Date</TableCell>
//                                 <TableCell>Location</TableCell>
//                                 <TableCell>Volunteers Needed</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {events && Array.isArray(events) && events.map((event) => (
//                                 <TableRow key={event.id}>
//                                     {event.isEditing ? (
//                                         <>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="title"
//                                                     value={event.title}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, title: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="description"
//                                                     value={event.description}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, description: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="date"
//                                                     type="date"
//                                                     value={event.date}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, date: e.target.value })}
//                                                     InputLabelProps={{
//                                                         shrink: true,
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="location"
//                                                     value={event.location}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, location: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="volunteer_needed"
//                                                     type="number"
//                                                     value={event.volunteer_needed}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, volunteer_needed: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Button onClick={() => handleSaveEvent(event.id, event)}>Save</Button>
//                                             </TableCell>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <TableCell>{event.title}</TableCell>
//                                             <TableCell>{event.description}</TableCell>
//                                             <TableCell>{event.date}</TableCell>
//                                             <TableCell>{event.location}</TableCell>
//                                             <TableCell>{event.volunteer_needed}</TableCell>
//                                             <TableCell>
//                                                 <Button onClick={() => handleEditEvent(event.id)}>Edit</Button>
//                                                 <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
//                                             </TableCell>
//                                         </>
//                                     )}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             ) : (
//                 <Typography variant="body1">No events available</Typography>
//             )}
//         </Box>
//     );
// }

// export default Events;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// function Events() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { token } = useSelector((state) => state.auth);
//     const { events, status, error } = useSelector((state) => state.events);

//     const [filter, setFilter] = useState('');
//     const [filterOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
//     const [newEventData, setNewEventData] = useState({
//         title: '',
//         description: '',
//         date: '',
//         location: '',
//         volunteer_needed: 0,
//     });

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchEvents());
//         } else {
//             navigate("/login");
//         }
//     }, [dispatch, navigate, token]);

//     const handleCreateEvent = async () => {
//         try {
//             await dispatch(createEvent(newEventData));
//             setNewEventData({
//                 title: '',
//                 description: '',
//                 date: '',
//                 location: '',
//                 volunteer_needed: 0,
//             });
//         } catch (error) {
//             console.error('Error creating event:', error);
//         }
//     };

//     const handleFilterChange = (event) => {
//         setFilter(event.target.value);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setNewEventData({
//             ...newEventData,
//             [name]: value,
//         });
//     };

//     const handleEditEvent = (eventId) => {
//         const updatedEvents = events.map(event =>
//             event.id === eventId ? { ...event, isEditing: true } : event
//         );
//         dispatch({ type: 'UPDATE_EVENTS', payload: updatedEvents });
//     };

//     const handleSaveEvent = async (eventId, eventData) => {
//         try {
//             await dispatch(updateEvent({ eventId, eventData: { ...eventData, isEditing: false } }));
//             dispatch(fetchEvents()); // Получаем обновленный список событий после сохранения изменений
//         } catch (error) {
//             console.error('Error saving event:', error);
//         }
//     };

//     const handleDeleteEvent = async (eventId) => {
//         try {
//             await dispatch(deleteEvent(eventId));
//             dispatch(fetchEvents()); // Получаем обновленный список событий после удаления события
//         } catch (error) {
//             console.error('Error deleting event:', error);
//         }
//     };

//     if (status === 'loading') return <CircularProgress />;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <Box>
//             <Typography variant="h1">Events</Typography>
//             <Button variant="contained" onClick={handleCreateEvent}>Create Event</Button>
//             <FormControl>
//                 <InputLabel id="filter-label">Filter</InputLabel>
//                 <Select
//                     labelId="filter-label"
//                     id="filter"
//                     value={filter}
//                     onChange={handleFilterChange}
//                 >
//                     {filterOptions.map(option => (
//                         <MenuItem key={option} value={option}>{option}</MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <Typography variant="h4">Events List</Typography>
//             <Box>
//                 <TextField
//                     name="title"
//                     label="Title"
//                     value={newEventData.title}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     name="description"
//                     label="Description"
//                     value={newEventData.description}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     name="date"
//                     label="Date"
//                     type="date"
//                     value={newEventData.date}
//                     onChange={handleInputChange}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                 />
//                 <TextField
//                     name="location"
//                     label="Location"
//                     value={newEventData.location}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     name="volunteer_needed"
//                     label="Volunteers Needed"
//                     type="number"
//                     value={newEventData.volunteer_needed}
//                     onChange={handleInputChange}
//                 />
//                 <Button onClick={handleCreateEvent}>Create</Button>
//             </Box>
//             {events.length > 0 ? (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Title</TableCell>
//                                 <TableCell>Description</TableCell>
//                                 <TableCell>Date</TableCell>
//                                 <TableCell>Location</TableCell>
//                                 <TableCell>Volunteers Needed</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {events.map((event) => (
//                                 <TableRow key={event.id}>
//                                     {event.isEditing ? (
//                                         <>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="title"
//                                                     value={event.title}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, title: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="description"
//                                                     value={event.description}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, description: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="date"
//                                                     type="date"
//                                                     value={event.date}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, date: e.target.value })}
//                                                     InputLabelProps={{
//                                                         shrink: true,
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="location"
//                                                     value={event.location}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, location: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     name="volunteer_needed"
//                                                     type="number"
//                                                     value={event.volunteer_needed}
//                                                     onChange={(e) => handleSaveEvent(event.id, { ...event, volunteer_needed: e.target.value })}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Button onClick={() => handleSaveEvent(event.id, event)}>Save</Button>
//                                             </TableCell>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <TableCell>{event.title}</TableCell>
//                                             <TableCell>{event.description}</TableCell>
//                                             <TableCell>{event.date}</TableCell>
//                                             <TableCell>{event.location}</TableCell>
//                                             <TableCell>{event.volunteer_needed}</TableCell>
//                                             <TableCell>
//                                                 <Button onClick={() => handleEditEvent(event.id)}>Edit</Button>
//                                                 <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
//                                             </TableCell>
//                                         </>
//                                     )}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             ) : (
//                 <Typography variant="body1">No events available</Typography>
//             )}
//         </Box>
//     );
// }

// export default Events;





