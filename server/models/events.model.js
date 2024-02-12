import { db } from '../config/db.js';

export const createEvent = async (eventData) => {
    return db('events').insert(eventData);
};

export const getAllEvents = async () => {
    return db('events').select('*');
};

export const getEventById = async (id) => {
    return db('events').where('event_id', id).first();
};

export const updateEvent = async (id, eventData) => {
    return db('events').where('event_id', id).update(eventData);
};

export const deleteEvent = async (id) => {
    return db('events').where('event_id', id).del();
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

