import express from 'express';
import { verifytoken } from '../middleware/verifyToken.js';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/events.controller.js';

const router = express.Router();

router.post('/', verifytoken, createEvent);
router.get('/', verifytoken, getAllEvents);
router.get('/:id', verifytoken, getEventById);
router.put('/:id', verifytoken, updateEvent);
router.delete('/:id', verifytoken, deleteEvent);

export default router;


// import express from 'express';
// import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/events.controller.js';

// const router = express.Router();

// router.post('/', createEvent);
// router.get('/', getAllEvents);
// router.get('/:id', getEventById);
// router.put('/:id', updateEvent);
// router.delete('/:id', deleteEvent);

// export default router;


// import express from "express";
// import { getEvents } from "../controllers/events.controller.js";
// import { verifytoken } from "../middleware/verifyToken.js";


// const router = express.Router();

// // Маршрут для получения списка событий
// router.get("/", verifytoken, getEvents);

// export default router;
