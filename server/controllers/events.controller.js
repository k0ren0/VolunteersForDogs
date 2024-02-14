import * as EventsModel from '../models/events.model.js';

// // Добавление события
// export const _addEvent = async (req, res) => {
//     try {
//         const { title, description, date, location, volunteer_needed, event_type, start_time, end_time, days_of_week } = req.body;
//         const user_id = req.user.user_id;
//         // Обеспечиваем передачу всех необходимых данных для создания события
//         const newEvent = await EventsModel.createEvent({
//             title, 
//             description, 
//             date, 
//             location, 
//             volunteer_needed, 
//             event_type, 
//             start_time, 
//             end_time, 
//             days_of_week, 
//             user_id
//         });
//         res.status(201).json({ message: 'Event added successfully', event: newEvent });
//     } catch (error) {
//         console.error('Error adding event:', error);
//         res.status(500).json({ error: 'Error adding event' });
//     }
// };

// Добавление события
export const _addEvent = async (req, res) => {
    try {
        const { title, description, date, location, volunteer_needed, event_type, days_of_week } = req.body;
        const user_id = req.user.user_id;
        // Обеспечиваем передачу всех необходимых данных для создания события
        const newEvent = await EventsModel.createEvent({
            title, 
            description, 
            date, 
            location, 
            volunteer_needed, 
            event_type, 
            days_of_week, 
            user_id
        });
        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Error adding event' });
    }
};

// Получение всех событий
export const _getAllEvents = async (req, res) => {
    try {
        const events = await EventsModel.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

// Получение события по event_id
export const _getEventById = async (req, res) => {
    try {
        const { event_id } = req.params; // Исправлено на event_id
        const event = await EventsModel.getEventById(event_id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};

// Обновление события по event_id
export const _updateEvent = async (req, res) => {
    try {
        const { event_id } = req.params; // Исправлено на event_id
        const eventData = req.body;
        const updatedEvent = await EventsModel.updateEvent(event_id, eventData);
        if (updatedEvent) {
            res.json({ message: 'Event updated successfully', event: updatedEvent });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};

// Удаление события по event_id
export const _deleteEvent = async (req, res) => {
    try {
        const { event_id } = req.params; // Исправлено на event_id
        await EventsModel.deleteEvent(event_id);
        res.status(204).send({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};



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
