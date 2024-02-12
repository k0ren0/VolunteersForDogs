import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../features/events/eventsSlice';

const EventsList = () => {
    const dispatch = useDispatch();
    const { events, status, error } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Events</h2>
            {events.length ? (
                <ul>
                    {events.map(event => (
                        <li key={event.event_id}>{event.title} - {event.description}</li>
                    ))}
                </ul>
            ) : (
                <p>No events found</p>
            )}
        </div>
    );
};

export default EventsList;
