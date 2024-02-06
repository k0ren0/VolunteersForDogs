import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.route.js"; 
import eventsRouter from "./routes/events.route.js";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import { verifytoken } from "./middleware/verifyToken.js"; // Предполагается, что путь верный

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Убедитесь, что здесь указан правильный домен вашего фронтенда
  credentials: true, // Это позволит отправлять куки с фронтенда на бэкенд
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Обновление маршрута для обработки проверки токена
app.post("/api/verifytoken", verifytoken, (req, res) => {
  // Если middleware `verifytoken` не вернул ошибку, токен действителен
  res.status(200).json({ message: "Token is valid" });
});

// Регистрация маршрутов
app.use("/users", usersRouter);
app.use("/events", eventsRouter);

// Запуск сервера
app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log(`I'm running on ${process.env.SERVER_PORT || 3001}`);
});
