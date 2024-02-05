import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../actions/eventActions';

function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector(state => state.event.events); // Адаптируйте путь в соответствии со структурой вашего состояния

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios.get("http://localhost:5005/events", { headers: { "x-access-token": token } })
        .then(response => {
          dispatch(setEvents(response.data)); // Сохраняем данные о событиях в Redux
        })
        .catch(error => {
          console.error("Failed to fetch events:", error);
          if (error.response && error.response.status === 403) {
            navigate("/login");
          }
        });
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.length === 0 ? <p>No events available</p> : events.map((event) => (
          <li key={event.event_id}>
            <strong>{event.title}</strong>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
