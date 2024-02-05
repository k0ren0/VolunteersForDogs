// Events.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../features/events/eventsSlice';

function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { items: events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (!token) navigate("/login");
    else dispatch(fetchEvents());
  }, [dispatch, navigate, token]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Events;

