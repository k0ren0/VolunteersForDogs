import express from 'express';
import { createEvent, getAllEvents, getEventById, _updateEvent, _deleteEvent } from '../controllers/events.controller.js';
import { verifytoken } from '../middleware/verifyToken.js';
import { db } from '../config/db.js';

const router = express.Router();

router.post('/', verifytoken, createEvent);
router.get('/', verifytoken, getAllEvents);
router.get('/:id', verifytoken, getEventById);
router.put('/:id', verifytoken, _updateEvent);
router.delete('/:id', verifytoken, _deleteEvent);

router.get("/api/verifytoken", verifytoken, (req, res) => {
    res.sendStatus(200);
});

export default router;

