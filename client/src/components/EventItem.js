import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../features/events/eventsSlice';
import { Button } from '@mui/material';

const EventItem = ({ event }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteEvent(event.event_id));
    };

    const handleEdit = () => {
        // Добавьте функциональность для открытия формы редактирования события
    };

    return (
        <div>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {/* Добавьте вывод других полей по необходимости */}
            <Button onClick={handleEdit} variant="contained" color="primary">
                Edit
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
                Delete
            </Button>
        </div>
    );
};

export default EventItem;

