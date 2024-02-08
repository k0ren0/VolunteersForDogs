import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/events.controller.js';
import { verifytoken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/', verifytoken, createEvent);
router.get('/', verifytoken, getAllEvents);
router.get('/:id', verifytoken, getEventById);
router.put('/:id', verifytoken, updateEvent);
router.delete('/:id', verifytoken, deleteEvent);

export default router;

