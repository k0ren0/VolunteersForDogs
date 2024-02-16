export const getAllEvents = async (filters) => {
    try {
        let query = db.select('*').from('events');
        if (filters) {
            // Применяем фильтры к запросу
            if (filters.title) {
                query = query.where('title', 'ilike', `%${filters.title}%`);
            }
            if (filters.city) {
                query = query.where('city', 'ilike', `%${filters.city}%`);
            }
            if (filters.date) {
                query = query.where('date', filters.date);
            }
            if (filters.event_type) {
                query = query.where('event_type', filters.event_type);
            }
            if (filters.day_of_week) {
                query = query.where('days_of_week', filters.day_of_week);
            }
            // Добавьте дополнительные условия фильтрации по мере необходимости
        }
        const events = await query;
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Error fetching events');
    }
};

// Удаление события по идентификатору
export const deleteEvent = async (event_id) => {
    try {
        const deletedCount = await db('events').where({ event_id }).del();
        if (deletedCount === 0) {
            throw new Error('Event not found');
        }
        return deletedCount;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw new Error('Error deleting event');
    }
};

// Добавление события
export const addEvent = async (title, description, date, location, volunteer_needed, event_type, days_of_week, user_id, dog_id) => {
    try {
        const [newEvent] = await db('events').insert({
            title,
            description,
            date,
            location,
            volunteer_needed,
            event_type,
            days_of_week,
            user_id,
            dog_id
        }).returning('*');
        return newEvent;
    } catch (error) {
        console.error('Error adding event:', error);
        throw new Error('Error adding event');
    }
};

// Получение события по идентификатору
export const getEventById = async (event_id) => {
    try {
        const event = await db.select('*').from('events').where({ event_id }).first();
        return event;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw new Error('Error fetching event');
    }
};

// Обновление события по идентификатору
export const updateEvent = async (event_id, eventData) => {
    try {
        const updatedEvents = await db('events').where({ event_id }).update(eventData).returning('*');
        if (updatedEvents.length === 0) {
            throw new Error('Event not found');
        }
        return updatedEvents[0];
    } catch (error) {
        console.error('Error updating event:', error);
        throw new Error('Error updating event');
    }
};



// import { db } from '../config/db.js';

// export const addEvent = async (title, description, date, location, volunteer_needed, event_type, days_of_week, user_id, dog_id) => {
//     try {
//         const [newEvent] = await db('events').insert({
//             title,
//             description,
//             date,
//             location,
//             volunteer_needed,
//             event_type,
//             days_of_week,
//             user_id,
//             dog_id
//         }).returning('*');
//         return newEvent;
//     } catch (error) {
//         console.error('Error adding event:', error);
//         throw new Error('Error adding event');
//     }
// };

// export const getAllEvents = async () => {
//     try {
//         const events = await db.select('*').from('events');
//         return events;
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         throw new Error('Error fetching events');
//     }
// };

// export const getEventById = async (event_id) => {
//     try {
//         const event = await db.select('*').from('events').where({ event_id }).first();
//         return event;
//     } catch (error) {
//         console.error('Error fetching event:', error);
//         throw new Error('Error fetching event');
//     }
// };

// export const updateEvent = async (event_id, eventData) => {
//     try {
//         const updatedEvents = await db('events').where({ event_id }).update(eventData).returning('*');
//         if (updatedEvents.length === 0) {
//             throw new Error('Event not found');
//         }
//         return updatedEvents[0];
//     } catch (error) {
//         console.error('Error updating event:', error);
//         throw new Error('Error updating event');
//     }
// };

// export const deleteEvent = async (event_id) => {
//     try {
//         const deletedCount = await db('events').where({ event_id }).del();
//         if (deletedCount === 0) {
//             throw new Error('Event not found');
//         }
//         return deletedCount;
//     } catch (error) {
//         console.error('Error deleting event:', error);
//         throw new Error('Error deleting event');
//     }
// };





// import { db } from '../config/db.js';

// export const addEvent = async ({ title, description, date, location, volunteer_needed, event_type, days_of_week, user_id, dog_id }) => {
//     const [newEvent] = await db('events').insert({
//         title,
//         description,
//         date,
//         location,
//         volunteer_needed,
//         event_type,
//         days_of_week,
//         user_id,
//         dog_id
//     }).returning('*');
//     return newEvent;
// };

// export const getAllEvents = async () => {
//     return await db.select('*').from('events');
// };

// export const getEventById = async (event_id) => {
//     const event = await db.select('*').from('events').where({ event_id }).first();
//     return event;
// };

// export const updateEvent = async (event_id, eventData) => {
//     const updatedEvents = await db('events').where({ event_id }).update(eventData).returning('*');
//     if (updatedEvents.length === 0) {
//         return null; // Возвращает null, если событие не найдено и обновление не выполнено
//     }
//     return updatedEvents[0];
// };

// export const deleteEvent = async (event_id) => {
//     const deletedCount = await db('events').where({ event_id }).del();
//     return deletedCount; // Возвращает количество удаленных строк (может быть использовано для проверки, было ли удалено событие)
// };

// const EventsModel = {
//     addEvent,
//     getAllEvents,
//     getEventById,
//     updateEvent,
//     deleteEvent
// };

// export default EventsModel;



// import { db } from '../config/db.js';

// // export const addEvent = async ({ title, description, date, country, city, volunteer_needed, event_type, start_time, end_time, days_of_week, user_id }) => {
// export const addEvent = async ({ title, description, date, location, volunteer_needed, event_type, days_of_week, user_id, dog_id }) => {
//     const [newEvent] = await db('events').insert({
//         title,
//         description,
//         date,
//         location,
//         volunteer_needed,
//         event_type,
//         days_of_week,
//         user_id,
//         dog_id // Убедитесь, что этот параметр включен в запрос к базе данных
//     }).returning('*');
//     return newEvent;
// };

// // export const addEvent = async (eventData) => {
// //     const [newEvent] = await db('events').insert(eventData).returning('*');
// //     return newEvent;
// // };


// console.log('Adding event with data:', req.body);


// export const getAllEvents = async () => {
//     return await db.select('*').from('events');
// };

// export const getEventById = async (event_id) => {
//     const event = await db.select('*').from('events').where({ event_id }).first();
//     return event;
// };

// export const updateEvent = async (event_id, eventData) => {
//     const [updatedEvent] = await db('events').where({ event_id }).update(eventData).returning('*');
//     return updatedEvent;
// };

// export const deleteEvent = async (event_id) => {
//     await db('events').where({ event_id }).del();
// };


// const EventsModel = {
//     addEvent,
//     getAllEvents,
//     getEventById,
//     updateEvent,
//     deleteEvent
// };

// export default EventsModel;



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


