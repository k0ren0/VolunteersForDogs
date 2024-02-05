import express from "express";
import { getEvents } from "../controllers/events.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

// Маршрут для получения списка событий
router.get("/", verifytoken, getEvents);

export default router;
