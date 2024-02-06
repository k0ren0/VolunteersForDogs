import { db } from "../config/db.js";

// Создание события
export const createEvent = (eventData) => {
    return db("events").insert(eventData);
};

// Получение события по ID
export const getEventById = (eventId) => {
    return db("events").select("*").where({ event_id: eventId }).first();
};

// Получение списка всех событий
export const getAllEvents = () => {
    return db("events").select("*").orderBy('date');
};

// Обновление события по ID
export const updateEvent = (eventId, eventData) => {
    return db("events").where({ event_id: eventId }).update(eventData);
};

// Удаление события по ID
export const deleteEvent = (eventId) => {
    return db("events").where({ event_id: eventId }).del();
};
