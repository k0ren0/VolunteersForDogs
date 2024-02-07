import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, createEvent } from '../features/events/eventsSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress } from '@mui/material';

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
        // Добавьте другие поля здесь
    });

    useEffect(() => {
        if (token) {
            dispatch(fetchEvents());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, token]);

    const handleCreateEvent = () => {
        dispatch(createEvent(newEventData));
        setNewEventData({
            title: '',
            description: '',
            date: '',
            location: '',
            volunteer_needed: 0,
            // Очищаем другие поля, если есть
        });
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

    if (status === 'loading') return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Events</h1>
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
            {/* Добавьте другие поля формы здесь */}
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <strong>{event.title}</strong>
                            <p>{event.description}</p>
                            {/* Дополнительные детали события */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events available</p>
            )}
        </div>
    );
}

export default Events;




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
//         dispatch(createEvent(newEventData)); // Передаем данные нового события в действие создания события
//         // Очищаем поля формы после создания события
//         setNewEventData({
//             title: '',
//             description: '',
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

//     if (status === 'loading') return <CircularProgress />; // Показываем индикатор загрузки
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
