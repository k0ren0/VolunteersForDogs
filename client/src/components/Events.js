import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, есть ли токен в localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Если токена нет, перенаправляем на страницу входа
      navigate("/login");
    } else {
      // Если токен есть, делаем запрос к серверу для получения списка событий
      axios
        .get("http://localhost:5005/events", {
          headers: {
            "x-access-token": token, // Отправляем токен через заголовок x-access-token
          },
        })
        .then((response) => {
          // Обрабатываем успешный ответ от сервера
          console.log("Events data:", response.data);
          setEvents(response.data); // Сохраняем полученные данные о событиях в состояние
        })
        .catch((error) => {
          // Обрабатываем возможные ошибки
          console.error("Failed to fetch events:", error);
          // Дополнительно можно обработать разные типы ошибок
          // Например, если ошибка 403, перенаправить на страницу входа
          if (error.response && error.response.status === 403) {
            navigate("/login");
          }
        });
    }
  }, [navigate]); // Зависимость от navigate для useEffect

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => (
            <li key={event.event_id}>
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
