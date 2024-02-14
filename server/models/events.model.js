import { db } from '../config/db.js';

// export const addEvent = async ({ title, description, date, country, city, volunteer_needed, event_type, start_time, end_time, days_of_week, user_id }) => {
export const addEvent = async ({ title, description, date, country, city, volunteer_needed, event_type, days_of_week, user_id }) => {
    const [newEvent] = await db('events').insert({
        title,
        description,
        date,
        country,
        city,
        volunteer_needed,
        event_type,
        days_of_week,
        user_id
    }).returning('*'); // Возвращает созданное событие
    return newEvent;
};

export const getAllEvents = async () => {
    return await db.select('*').from('events');
};

export const getEventById = async (event_id) => {
    const event = await db.select('*').from('events').where({ event_id }).first();
    return event;
};

export const updateEvent = async (event_id, eventData) => {
    const [updatedEvent] = await db('events').where({ event_id }).update(eventData).returning('*');
    return updatedEvent;
};

export const deleteEvent = async (event_id) => {
    await db('events').where({ event_id }).del();
};





// import { db } from '../config/db.js';

// export const createEvent = async (eventData) => {
//     return db('events').insert(eventData);
// };

// export const getAllEvents = async () => {
//     return db('events').select('*');
// };

// export const getEventById = async (id) => {
//     return db('events').where('event_id', id).first();
// };

// export const updateEvent = async (id, eventData) => {
//     return db('events').where('event_id', id).update(eventData);
// };

// export const deleteEvent = async (id) => {
//     return db('events').where('event_id', id).del();
// };


