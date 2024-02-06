import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.route.js"; 
import eventsRouter from "./routes/events.route.js";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import { verifytoken } from "./middleware/verifyToken.js"; // Исправленный импорт

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Укажите домен вашего фронтенда
  credentials: true, // Разрешить отправку кук между сервером и клиентом
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.get("/get-db-config", (req, res) => {
//   // Отправляем содержимое db.js клиенту
//   res.sendFile(__dirname + "/config/db.js");
// });

app.post("/api/verifytoken", verifytoken); // Использование verifytoken как middleware

app.use("/users", usersRouter);
app.use("/events", eventsRouter);

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(`I'm running on ${process.env.SERVER_PORT || 3001}`);
});
