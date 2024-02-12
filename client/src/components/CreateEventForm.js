import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../features/events/eventsSlice';
import { TextField, Button } from '@mui/material';

const CreateEventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createEvent({ title, description }));
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <Button type="submit">Create Event</Button>
        </form>
    );
};

export default CreateEventForm;
