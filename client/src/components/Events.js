import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../features/events/eventsSlice';

function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // Используем деструктуризацию с значением по умолчанию для events, чтобы избежать ошибки
  const { items: events = [], status, error } = useSelector((state) => state.events);

  useEffect(() => {
    // Запрашиваем данные событий только если есть токен
    if (token) {
      dispatch(fetchEvents());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, token]);

  // Обрабатываем состояния загрузки и ошибок аналогично компоненту Profile
  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Events</h1>
      {/* Выводим список событий, аналогично выводу информации о пользователе в Profile */}
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
