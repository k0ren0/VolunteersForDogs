import { db } from "../config/db.js";
import bcrypt from 'bcryptjs';

export const register = async (username, email, password, firstName, lastName, dateOfBirth) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Хеширование пароля
        const newUser = await db.query(
            'INSERT INTO users (username, email, password, firstName, lastName, dateOfBirth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, email, hashedPassword, firstName, lastName, dateOfBirth]
        );
        return { success: true, message: "Registration successful", user: newUser.rows[0] };
    } catch (error) {
        return { success: false, message: "Registration failed", error: error.detail };
    }
};

export const checkEmailExists = async (email) => {
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return user.rows.length > 0;
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw new Error("Failed to check email existence");
    }
};

export const login = async (email) => {
    try {
        const user = await db.query('SELECT email, password, user_id FROM users WHERE email = $1', [email]);
        return user.rows[0] || null;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Login failed");
    }
};

export const getAllUsers = async () => {
    try {
        const users = await db.query('SELECT user_id, username, email, firstName, lastName, dateOfBirth FROM users ORDER BY user_id');
        return users.rows;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw new Error("Failed to fetch all users");
    }
};

export const getUserById = async (user_id) => {
    try {
        const user = await db.query('SELECT user_id, username, email, firstName, lastName, dateOfBirth FROM users WHERE user_id = $1', [user_id]);
        return user.rows[0] || null;
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw new Error("Failed to get user by id");
    }
};

export const updateUserById = async (user_id, userData) => {
    // Assume userData does not contain password. If updating password, hash it before.
    try {
        const fields = Object.keys(userData).map((field, index) => `${field} = $${index + 2}`).join(', ');
        const values = Object.values(userData);
        
        const query = `UPDATE users SET ${fields} WHERE user_id = $1 RETURNING *`;
        const result = await db.query(query, [user_id, ...values]);
        
        return { success: true, message: 'User updated successfully', user: result.rows[0] };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, message: 'Failed to update user', error: error.detail };
    }
};

export const getUserDogsById = async (userId) => {
    // This function assumes that there's a 'dogs' table related to the 'users' table.
    try {
        const dogs = await db.query('SELECT * FROM dogs WHERE user_id = $1', [userId]);
        return dogs.rows;
    } catch (error) {
        console.error("Error fetching user's dogs:", error);
        throw new Error("Failed to fetch user's dogs");
    }
};

export const getUserEventsById = async (userId) => {
    // This function assumes that there's an 'events' table related to the 'users' table.
    try {
        const events = await db.query('SELECT * FROM events WHERE user_id = $1', [userId]);
        return events.rows;
    } catch (error) {
        console.error("Error fetching user's events:", error);
        throw new Error("Failed to fetch user's events");
    }
};


////////////////


// last 


// import { db } from '../config/db.js';

// export const getAllEvents = async (filters) => {
//     try {
//         let query = db.select('*').from('events');
//         if (filters) {
//             // Применяем фильтры к запросу
//             if (filters.title) {
//                 query = query.where('title', 'ilike', `%${filters.title}%`);
//             }
//             if (filters.city) {
//                 query = query.where('city', 'ilike', `%${filters.city}%`);
//             }
//             if (filters.date) {
//                 query = query.where('date', filters.date);
//             }
//             if (filters.event_type) {
//                 query = query.where('event_type', filters.event_type);
//             }
//             if (filters.day_of_week) {
//                 query = query.where('days_of_week', filters.day_of_week);
//             }
//             // Добавьте дополнительные условия фильтрации по мере необходимости
//         }
//         const events = await query;
//         return events;
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         throw new Error('Error fetching events');
//     }
// };

// // Удаление события по идентификатору
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

// // Добавление события
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

// // Получение события по идентификатору
// export const getEventById = async (event_id) => {
//     try {
//         const event = await db.select('*').from('events').where({ event_id }).first();
//         return event;
//     } catch (error) {
//         console.error('Error fetching event:', error);
//         throw new Error('Error fetching event');
//     }
// };

// // Обновление события по идентификатору
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


