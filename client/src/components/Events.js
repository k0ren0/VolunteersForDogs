import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Events() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { events, status, error } = useSelector((state) => state.events);

    const [filter, setFilter] = useState('');
    const [filterOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
    const [newEventData, setNewEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        volunteer_needed: 0,
    });

    useEffect(() => {
        if (token) {
            dispatch(fetchEvents());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, token]);

    const handleCreateEvent = async () => {
        try {
            await dispatch(createEvent(newEventData));
            setNewEventData({
                title: '',
                description: '',
                date: '',
                location: '',
                volunteer_needed: 0,
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
            dispatch(fetchEvents()); // Получаем обновленный список событий после сохранения изменений
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await dispatch(deleteEvent(eventId));
            dispatch(fetchEvents()); // Получаем обновленный список событий после удаления события
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    if (status === 'loading') return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

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
                    {filterOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
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
                <Button onClick={handleCreateEvent}>Create</Button>
            </Box>
            {events.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Volunteers Needed</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    {event.isEditing ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    name="title"
                                                    value={event.title}
                                                    onChange={(e) => handleSaveEvent(event.id, { ...event, title: e.target.value })}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="description"
                                                    value={event.description}
                                                    onChange={(e) => handleSaveEvent(event.id, { ...event, description: e.target.value })}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="date"
                                                    type="date"
                                                    value={event.date}
                                                    onChange={(e) => handleSaveEvent(event.id, { ...event, date: e.target.value })}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="location"
                                                    value={event.location}
                                                    onChange={(e) => handleSaveEvent(event.id, { ...event, location: e.target.value })}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="volunteer_needed"
                                                    type="number"
                                                    value={event.volunteer_needed}
                                                    onChange={(e) => handleSaveEvent(event.id, { ...event, volunteer_needed: e.target.value })}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleSaveEvent(event.id, event)}>Save</Button>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{event.title}</TableCell>
                                            <TableCell>{event.description}</TableCell>
                                            <TableCell>{event.date}</TableCell>
                                            <TableCell>{event.location}</TableCell>
                                            <TableCell>{event.volunteer_needed}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEditEvent(event.id)}>Edit</Button>
                                                <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                                            </TableCell>
                                        </>
                                    )}
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
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Box } from '@mui/material';

// function Events() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { token } = useSelector((state) => state.auth);
//     const { events, status, error } = useSelector((state) => state.events);

//     const [titleFilter, setTitleFilter] = useState('');
//     const [descriptionFilter, setDescriptionFilter] = useState('');
//     const [locationFilter, setLocationFilter] = useState('');
//     const [volunteerFilter, setVolunteerFilter] = useState('');

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchEvents());
//         } else {
//             navigate("/login");
//         }
//     }, [dispatch, navigate, token]);

//     const handleCreateEvent = async () => {
//         try {
//             await dispatch(createEvent({
//                 title: titleFilter,
//                 description: descriptionFilter,
//                 location: locationFilter,
//                 volunteer_needed: volunteerFilter
//             }));
//             // Очистить поля фильтра после создания события
//             setTitleFilter('');
//             setDescriptionFilter('');
//             setLocationFilter('');
//             setVolunteerFilter('');
//         } catch (error) {
//             console.error('Error creating event:', error);
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
//                     value=""
//                     // Вместо хранения фильтра в состоянии, используйте проп "value"
//                     // Обработчики событий будут обновлять значения фильтров
//                     onChange={() => {}}
//                 >
//                     <MenuItem value="">All</MenuItem>
//                     <MenuItem value="Option 1">Option 1</MenuItem>
//                     <MenuItem value="Option 2">Option 2</MenuItem>
//                     <MenuItem value="Option 3">Option 3</MenuItem>
//                 </Select>
//             </FormControl>
//             <Typography variant="h4">Events List</Typography>
//             {/* Поля для ввода фильтров */}
//             <TextField
//                 label="Title Filter"
//                 value={titleFilter}
//                 onChange={(e) => setTitleFilter(e.target.value)}
//             />
//             <TextField
//                 label="Description Filter"
//                 value={descriptionFilter}
//                 onChange={(e) => setDescriptionFilter(e.target.value)}
//             />
//             <TextField
//                 label="Location Filter"
//                 value={locationFilter}
//                 onChange={(e) => setLocationFilter(e.target.value)}
//             />
//             <TextField
//                 label="Volunteer Filter"
//                 type="number"
//                 value={volunteerFilter}
//                 onChange={(e) => setVolunteerFilter(e.target.value)}
//             />
//             {/* Вывод отфильтрованных событий */}
//             {events.length > 0 ? (
//                 <ul>
//                     {events.map((event) => (
//                         <li key={event.id}>
//                             {/* Отображение информации о событии */}
//                         </li>
//                     ))}
//                 </ul>
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
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Box } from '@mui/material';

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
//         // Добавьте другие поля здесь
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
//                 // Очищаем другие поля, если есть
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

//     const handleEditEvent = (event) => {
//         dispatch(updateEvent({ eventId: event.id, eventData: { ...event, isEditing: true } }));
//     };

//     const handleSaveEvent = async (event) => {
//         try {
//             await dispatch(updateEvent({ eventId: event.id, eventData: { ...event, isEditing: false } }));
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
//             <TextField
//                 name="title"
//                 label="Title"
//                 value={newEventData.title}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="description"
//                 label="Description"
//                 value={newEventData.description}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="date"
//                 label="Date"
//                 type="date"
//                 value={newEventData.date}
//                 onChange={handleInputChange}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//             />
//             <TextField
//                 name="location"
//                 label="Location"
//                 value={newEventData.location}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="volunteer_needed"
//                 label="Volunteers Needed"
//                 type="number"
//                 value={newEventData.volunteer_needed}
//                 onChange={handleInputChange}
//             />
//             {/* Добавьте другие поля формы здесь */}
//             {events.length > 0 ? (
//                 <ul>
//                     {events.map((event) => (
//                         <li key={event.id}>
//                             {event.isEditing ? (
//                                 <>
//                                     <TextField
//                                         name="title"
//                                         label="Title"
//                                         value={event.title}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, title: e.target.value } }))}
//                                     />
//                                     <TextField
//                                         name="description"
//                                         label="Description"
//                                         value={event.description}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, description: e.target.value } }))}
//                                     />
//                                     <TextField
//                                         name="date"
//                                         label="Date"
//                                         type="date"
//                                         value={event.date}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, date: e.target.value } }))}
//                                         InputLabelProps={{
//                                             shrink: true,
//                                         }}
//                                     />
//                                     <TextField
//                                         name="location"
//                                         label="Location"
//                                         value={event.location}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, location: e.target.value } }))}
//                                     />
//                                     <TextField
//                                         name="volunteer_needed"
//                                         label="Volunteers Needed"
//                                         type="number"
//                                         value={event.volunteer_needed}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, volunteer_needed: e.target.value } }))}
//                                     />
//                                     <Button onClick={() => handleSaveEvent(event)}>Save</Button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Typography variant="h2">{event.title}</Typography>
//                                     <Typography variant="body1">{event.description}</Typography>
//                                     {/* Дополнительные детали события */}
//                                     <Button onClick={() => handleEditEvent(event)}>Edit</Button>
//                                     <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
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
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Box } from '@mui/material';

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
//         // Добавьте другие поля здесь
//     });

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchEvents());
//         } else {
//             navigate("/login");
//         }
//     }, [dispatch, navigate, token]);

//     const handleCreateEvent = async () => {
//         await dispatch(createEvent(newEventData));
//         dispatch(fetchEvents()); // Получаем обновленный список событий после добавления нового события
//         setNewEventData({
//             title: '',
//             description: '',
//             date: '',
//             location: '',
//             volunteer_needed: 0,
//             // Очищаем другие поля, если есть
//         });
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

//     const handleEditEvent = (event) => {
//         dispatch(updateEvent({ eventId: event.id, eventData: { ...event, isEditing: true } }));
//     };

//     const handleSaveEvent = async (event) => {
//         await dispatch(updateEvent({ eventId: event.id, eventData: { ...event, isEditing: false } }));
//         dispatch(fetchEvents()); // Получаем обновленный список событий после сохранения изменений
//     };

//     const handleDeleteEvent = async (eventId) => {
//         await dispatch(deleteEvent(eventId));
//         dispatch(fetchEvents()); // Получаем обновленный список событий после удаления события
//     };

//     if (status === 'loading') return <CircularProgress />;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h1>Events</h1>
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
//             <TextField
//                 name="title"
//                 label="Title"
//                 value={newEventData.title}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="description"
//                 label="Description"
//                 value={newEventData.description}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="date"
//                 label="Date"
//                 type="date"
//                 value={newEventData.date}
//                 onChange={handleInputChange}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//             />
//             <TextField
//                 name="location"
//                 label="Location"
//                 value={newEventData.location}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="volunteer_needed"
//                 label="Volunteers Needed"
//                 type="number"
//                 value={newEventData.volunteer_needed}
//                 onChange={handleInputChange}
//             />
//             {/* Добавьте другие поля формы здесь */}
//             {events.length > 0 ? (
//                 <ul>
//                     {events.map((event) => (
//                         <li key={event.id}>
//                             {event.isEditing ? (
//                                 <>
//                                     <TextField
//                                         name="title"
//                                         label="Title"
//                                         value={event.title}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, title: e.target.value } }))}
//                                     />
//                                     <TextField
//                                         name="description"
//                                         label="Description"
//                                         value={event.description}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, description: e.target.value } }))}
//                                     />
//                                     <TextField
//                                         name="date"
//                                         label="Date"
//                                         type="date"
//                                         value={event.date}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, date: e.target.value } }))}
//                                         InputLabelProps={{
//                                             shrink: true,
//                                         }}
//                                     />
//                                     <TextField
//                                         name="location"
//                                         label="Location"
//                                         value={event.location}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, location: e.target.value } }))}
//                                     />
//                                     <TextField
//                                         name="volunteer_needed"
//                                         label="Volunteers Needed"
//                                         type="number"
//                                         value={event.volunteer_needed}
//                                         onChange={(e) => dispatch(updateEvent({ eventId: event.id, eventData: { ...event, volunteer_needed: e.target.value } }))}
//                                     />
//                                     <Button onClick={() => handleSaveEvent(event)}>Save</Button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <strong>{event.title}</strong>
//                                     <p>{event.description}</p>
//                                     {/* Дополнительные детали события */}
//                                     <Button onClick={() => handleEditEvent(event)}>Edit</Button>
//                                     <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No events available</p>
//             )}
//         </div>
//     );
// }

// export default Events;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchEvents, createEvent } from '../features/events/eventsSlice';
// import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress } from '@mui/material';

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
//         // Добавьте другие поля здесь
//     });

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchEvents());
//         } else {
//             navigate("/login");
//         }
//     }, [dispatch, navigate, token]);

//     const handleCreateEvent = () => {
//         dispatch(createEvent(newEventData));
//         setNewEventData({
//             title: '',
//             description: '',
//             date: '',
//             location: '',
//             volunteer_needed: 0,
//             // Очищаем другие поля, если есть
//         });
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

//     if (status === 'loading') return <CircularProgress />;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h1>Events</h1>
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
//             <TextField
//                 name="title"
//                 label="Title"
//                 value={newEventData.title}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="description"
//                 label="Description"
//                 value={newEventData.description}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="date"
//                 label="Date"
//                 type="date"
//                 value={newEventData.date}
//                 onChange={handleInputChange}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//             />
//             <TextField
//                 name="location"
//                 label="Location"
//                 value={newEventData.location}
//                 onChange={handleInputChange}
//             />
//             <TextField
//                 name="volunteer_needed"
//                 label="Volunteers Needed"
//                 type="number"
//                 value={newEventData.volunteer_needed}
//                 onChange={handleInputChange}
//             />
//             {/* Добавьте другие поля формы здесь */}
//             {events.length > 0 ? (
//                 <ul>
//                     {events.map((event) => (
//                         <li key={event.id}>
//                             <strong>{event.title}</strong>
//                             <p>{event.description}</p>
//                             {/* Дополнительные детали события */}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No events available</p>
//             )}
//         </div>
//     );
// }

// export default Events;



