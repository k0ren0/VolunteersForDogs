import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/events.controller.js';
import { verifytoken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifytoken, createEvent);
router.get('/', verifytoken, getAllEvents);
router.get('/:id', verifytoken, getEventById);
router.put('/:id', verifytoken, updateEvent);
router.delete('/:id', verifytoken, deleteEvent);

// router.get("/api/verifytoken", verifytoken, (req, res) => {
//     res.sendStatus(200);
// });

export default router;

