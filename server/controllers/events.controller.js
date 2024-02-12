import * as EventsModel from '../models/events.model.js';

export const createEvent = async (req, res) => {
    try {
        const eventData = { ...req.body, user_id: req.user.user_id };
        const newEvent = await EventsModel.createEvent(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};


export const getAllEvents = async (req, res) => {
    try {
        const events = await EventsModel.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await EventsModel.getEventById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};

export const _updateEvent = async (req, res) => {
    try {
        const updatedEvent = await EventsModel.updateEvent(req.params.id, req.body);
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};

export const _deleteEvent = async (req, res) => {
    try {
        await EventsModel.deleteEvent(req.params.id); 
        res.status(204).send();
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
