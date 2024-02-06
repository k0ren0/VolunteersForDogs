import { db } from "../config/db.js";

// Контроллер для получения списка событий
export const getEvents = async (req, res) => {
  try {
    // Выполняем запрос к базе данных для получения списка событий
    const events = await db("events").select("*");
    res.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
