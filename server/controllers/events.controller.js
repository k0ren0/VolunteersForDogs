// events.controller.js

import { validationResult } from 'express-validator';
import { db } from '../config/db.js';
import moment from 'moment';


export const _addEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id } = req.body;
        const user_id = req.user.user_id; // user_id add to req by middleware auth

        const [newEvent] = await db('events').insert({
            user_id, title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id
        }).returning('*');

        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Error adding event' });
    }
};


export const _getAllEvents = async (req, res) => {
    try {
        let query = db.select('*').from('events');
        const filters = req.query;
        if (filters) {
            // filter req
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
           
        }
        const events = await query;
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Error fetching events' });
    }
};

// Get event by ID
export const _getEventById = async (req, res) => {
    const { event_id } = req.params;
    try {
        const event = await db.select('*').from('events').where({ event_id }).first();
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Error fetching event' });
    }
};

// Update event
export const _updateEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { event_id } = req.params;
    const eventData = req.body;

    try {
        const updated = await db('events').where({ event_id }).update(eventData).returning('*');
        if (updated.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully', event: updated[0] });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Error updating event' });
    }
};

// Del event
export const _deleteEvent = async (req, res) => {
    const { event_id } = req.params;

    try {
        const deleted = await db('events').where({ event_id }).del();
        if (deleted === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(204).send({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Error deleting event' });
    }
};



// import { validationResult } from 'express-validator';
// import { db } from '../config/db.js';
// import moment from 'moment';

// // Добавление события
// export const _addEvent = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id } = req.body;
//         const user_id = req.user.user_id; // предполагается, что user_id добавляется в req через middleware аутентификации

//         const [newEvent] = await db('events').insert({
//             user_id, title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id
//         }).returning('*');

//         res.status(201).json({ message: 'Event added successfully', event: newEvent });
//     } catch (error) {
//         console.error('Error adding event:', error);
//         res.status(500).json({ error: 'Error adding event' });
//     }
// };

// // Получение всех событий
// export const _getAllEvents = async (req, res) => {
//     try {
//         const events = await db.select('*').from('events');
//         res.json(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ error: 'Error fetching events' });
//     }
// };

// // Получение события по ID
// export const _getEventById = async (req, res) => {
//     const { event_id } = req.params;
//     try {
//         const event = await db.select('*').from('events').where({ event_id }).first();
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json(event);
//     } catch (error) {
//         console.error('Error fetching event:', error);
//         res.status(500).json({ error: 'Error fetching event' });
//     }
// };

// // Обновление события
// export const _updateEvent = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { event_id } = req.params;
//     const eventData = req.body;

//     try {
//         const updated = await db('events').where({ event_id }).update(eventData).returning('*');
//         if (updated.length === 0) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json({ message: 'Event updated successfully', event: updated[0] });
//     } catch (error) {
//         console.error('Error updating event:', error);
//         res.status(500).json({ error: 'Error updating event' });
//     }
// };

// // Удаление события
// export const _deleteEvent = async (req, res) => {
//     const { event_id } = req.params;

//     try {
//         const deleted = await db('events').where({ event_id }).del();
//         if (deleted === 0) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(204).send({ message: 'Event deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting event:', error);
//         res.status(500).json({ error: 'Error deleting event' });
//     }
// };



// import { db } from '../config/db.js';

// export const _addEvent = async (req, res) => {
//     try {
//         if (!req.user || !req.user.user_id) {
//             return res.status(401).json({ error: 'Unauthorized: User ID is missing' });
//         }
//         const { title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id } = req.body;
//         const user_id = req.user.user_id;

//         const [newEvent] = await db('events').insert({
//             user_id, title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id
//         }).returning('*');

//         res.status(201).json({ message: 'Event added successfully', event: newEvent });
//     } catch (error) {
//         console.error('Error adding event:', error);
//         res.status(500).json({ error: 'Error adding event' });
//     }
// };

// export const _getAllEvents = async (req, res) => {
//     try {
//         const events = await db.select('*').from('events');
//         res.json(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ error: 'Error fetching events' });
//     }
// };

// export const _getEventById = async (req, res) => {
//     const { event_id } = req.params;
//     try {
//         const event = await db.select('*').from('events').where({ event_id }).first();
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json(event);
//     } catch (error) {
//         console.error('Error fetching event:', error);
//         res.status(500).json({ error: 'Error fetching event' });
//     }
// };

// export const _updateEvent = async (req, res) => {
//     const { event_id } = req.params;
//     const eventData = req.body;

//     try {
//         const updated = await db('events').where({ event_id }).update(eventData).returning('*');
//         if (updated.length === 0) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json({ message: 'Event updated successfully', event: updated[0] });
//     } catch (error) {
//         console.error('Error updating event:', error);
//         res.status(500).json({ error: 'Error updating event' });
//     }
// };

// export const _deleteEvent = async (req, res) => {
//     const { event_id } = req.params;

//     try {
//         const deleted = await db('events').where({ event_id }).del();
//         if (deleted === 0) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(204).send({ message: 'Event deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting event:', error);
//         res.status(500).json({ error: 'Error deleting event' });
//     }
// };



//mb del

// import { db } from '../config/db.js';

// export const _addEvent = async (req, res) => {
//     try {
//         const { title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id } = req.body;
//         const user_id = req.user.user_id; // предполагается, что user_id добавляется в req через middleware аутентификации

//         const [newEvent] = await db('events').insert({
//             user_id, title, description, date, location, volunteer_needed, event_type, days_of_week, dog_id
//         }).returning('*');

//         res.status(201).json({ message: 'Event added successfully', event: newEvent });
//     } catch (error) {
//         console.error('Error adding event:', error);
//         res.status(500).json({ error: 'Error adding event' });
//     }
// };

// export const _getAllEvents = async (req, res) => {
//     try {
//         const events = await db.select('*').from('events');
//         res.json(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ error: 'Error fetching events' });
//     }
// };

// export const _getEventById = async (req, res) => {
//     const { event_id } = req.params;
//     try {
//         const event = await db.select('*').from('events').where({ event_id }).first();
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json(event);
//     } catch (error) {
//         console.error('Error fetching event:', error);
//         res.status(500).json({ error: 'Error fetching event' });
//     }
// };

// export const _updateEvent = async (req, res) => {
//     const { event_id } = req.params;
//     const eventData = req.body;

//     try {
//         const updated = await db('events').where({ event_id }).update(eventData).returning('*');
//         if (updated.length === 0) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json({ message: 'Event updated successfully', event: updated[0] });
//     } catch (error) {
//         console.error('Error updating event:', error);
//         res.status(500).json({ error: 'Error updating event' });
//     }
// };

// export const _deleteEvent = async (req, res) => {
//     const { event_id } = req.params;

//     try {
//         const deleted = await db('events').where({ event_id }).del();
//         if (deleted === 0) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(204).send({ message: 'Event deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting event:', error);
//         res.status(500).json({ error: 'Error deleting event' });
//     }
// };



////////// strannoe

// import * as EventsModel from '../models/events.model.js';


// // // Добавление события
// // export const _addEvent = async (req, res) => {
// //     try {
// //         const { title, description, date, location, volunteer_needed, event_type, start_time, end_time, days_of_week } = req.body;
// //         const user_id = req.user.user_id;
// //         // Обеспечиваем передачу всех необходимых данных для создания события
// //         const newEvent = await EventsModel.createEvent({
// //             title, 
// //             description, 
// //             date, 
// //             location, 
// //             volunteer_needed, 
// //             event_type, 
// //             start_time, 
// //             end_time, 
// //             days_of_week, 
// //             user_id
// //         });
// //         res.status(201).json({ message: 'Event added successfully', event: newEvent });
// //     } catch (error) {
// //         console.error('Error adding event:', error);
// //         res.status(500).json({ error: 'Error adding event' });
// //     }
// // };

// // Добавление события
// export const _addEvent = async (req, res) => {
//     try {
//         const {
//             title, 
//             description, 
//             date, 
//             location, 
//             volunteer_needed, 
//             event_type, 
//             days_of_week,
//             dog_id // Добавляем dog_id в список извлекаемых данных
//         } = req.body;
//         const user_id = req.user.user_id;

//         // // Передаем dog_id вместе с другими данными события
//         // const newEvent = await EventsModel.addEvent({
//         //     title, 
//         //     description, 
//         //     date, 
//         //     location, 
//         //     volunteer_needed, 
//         //     event_type, 
//         //     days_of_week, 
//         //     user_id,
//         //     dog_id // Добавляем dog_id в данные для создания события
//         // });

//         res.status(201).json({ message: 'Event added successfully', event: newEvent });
//     } catch (error) {
//         console.error('Error adding event:', error);
//         res.status(500).json({ error: 'Error adding event' });
//     }
// };

// // Получение всех событий
// export const _getAllEvents = async (req, res) => {
//     try {
//         const events = await EventsModel.getAllEvents();
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching events", error });
//     }
// };

// // Получение события по event_id
// export const _getEventById = async (req, res) => {
//     try {
//         const { event_id } = req.params; // Исправлено на event_id
//         const event = await EventsModel.getEventById(event_id);
//         if (event) {
//             res.json(event);
//         } else {
//             res.status(404).json({ message: 'Event not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching event", error });
//     }
// };

// // Обновление события по event_id
// export const _updateEvent = async (req, res) => {
//     try {
//         const { event_id } = req.params; // Исправлено на event_id
//         const eventData = req.body;
//         const updatedEvent = await EventsModel.updateEvent(event_id, eventData);
//         if (updatedEvent) {
//             res.json({ message: 'Event updated successfully', event: updatedEvent });
//         } else {
//             res.status(404).json({ message: 'Event not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating event", error });
//     }
// };

// // Удаление события по event_id
// export const _deleteEvent = async (req, res) => {
//     try {
//         const { event_id } = req.params; // Исправлено на event_id
//         await EventsModel.deleteEvent(event_id);
//         res.status(204).send({ message: 'Event deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting event", error });
//     }
// };



// import * as EventsModel from '../models/events.model.js';

// export const createEvent = async (req, res) => {
//     try {
//         const eventData = { ...req.body, user_id: req.user.userid };
//         const newEvent = await EventsModel.createEvent(eventData);
//         res.status(201).json(newEvent);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating event", error });
//     }
// };


// export const getAllEvents = async (req, res) => {
//     try {
//         const events = await EventsModel.getAllEvents();
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching events", error });
//     }
// };

// export const getEventById = async (req, res) => {
//     try {
//         const event = await EventsModel.getEventById(req.params.id);
//         if (event) {
//             res.json(event);
//         } else {
//             res.status(404).json({ message: "Event not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching event", error });
//     }
// };

// export const updateEvent = async (req, res) => {
//     try {
//         const updatedEvent = await EventsModel.updateEvent(req.params.id, req.body);
//         res.json(updatedEvent);
//     } catch (error) {
//         res.status(500).json({ message: "Error updating event", error });
//     }
// };

// export const deleteEvent = async (req, res) => {
//     try {
//         await EventsModel.deleteEvent(req.params.id);
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting event", error });
//     }
// };
