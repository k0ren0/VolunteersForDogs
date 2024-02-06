import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Инициализируем переменные окружения из файла .env
dotenv.config();

export const verifytoken = (req, res, next) => {
    let token = req.cookies.token || req.headers["authorization"];
    console.log("token", token);

    // Обработка префикса 'Bearer'
    if (token && token.startsWith('Bearer ')) {
        // Удаление префикса 'Bearer ' для извлечения токена
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: err.message, msg: "Forbidden: Token is not valid" });
        }
        req.user = decoded; // Сохранение расшифрованной информации токена в объект запроса
        next(); // Передача управления следующему middleware или обработчику
    });
};





