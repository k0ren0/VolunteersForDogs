// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import morgan from "morgan";
// import { celebrate, Joi, errors, Segments } from "celebrate";

// import { _register, _login, _all, _updateUserById, _getUserById, _fetchUserDogs, _fetchUserEvents } from "../controllers/users.controller.js";
// import { verifytoken } from "../middleware/verifyToken.js";

// const router = express.Router();

// // Базовая безопасность и заголовки
// router.use(helmet());
// // Логирование
// router.use(morgan('tiny'));
// // CORS
// router.use(cors());
// // Ограничение частоты запросов
// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 минут
//     max: 100, // Ограничение каждого IP до 100 запросов за окно в 15 минут
// });
// router.use("/api/", apiLimiter);

// // Валидация для регистрации
// router.post('/register', celebrate({
//     [Segments.BODY]: Joi.object().keys({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).required(),
//         // Добавьте другие поля, которые вы ожидаете при регистрации
//     }),
// }), _register);

// router.post('/login', _login);

// router.get('/', verifytoken, _all);

// router.get('/:id', verifytoken, _getUserById);

// router.put('/:id', verifytoken, celebrate({
//     [Segments.BODY]: Joi.object().keys({
//         // Определите схему валидации для обновления пользователя
//     }),
//     [Segments.PARAMS]: Joi.object().keys({
//         id: Joi.number().required(),
//     }),
// }), _updateUserById);

// router.get('/dogs', verifytoken, async (req, res) => {
//     const user_id = req.user.user_id;
//     try {
//         const dogs = await _fetchUserDogs(user_id); // Убедитесь, что функция называется _fetchUserDogs
//         res.json(dogs);
//     } catch (error) {
//         res.status(500).json({ msg: "Error fetching user's dogs" });
//     }
// });

// router.get('/events', verifytoken, _fetchUserEvents);

// router.get("/api/verifytoken", verifytoken, (req, res) => {
//     res.status(200).json({ msg: "Token is valid" });
// });

// // Обработка ошибок валидации
// router.use(errors());

// // Общий обработчик ошибок
// router.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Something broke!" });
// });

// export default router;




import express from "express";
import { _register, _login, _all, _updateUserById, _getUserById, _fetchUserDogs, _fetchUserEvents } from "../controllers/users.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";
// import { db } from "../config/db.js";

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
router.get('/', verifytoken, _all);
router.get('/:id', verifytoken, _getUserById); 
router.put('/:id', verifytoken, _updateUserById); 
router.get('/dogs', verifytoken, async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const dogs = await getUserDogsById(user_id);
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching user's dogs" });
    }
});

router.get('/events', verifytoken, _fetchUserEvents);

router.get("/api/verifytoken", verifytoken, (req, res) => {
    res.status(200).json({ msg: "Token is valid" });
    
});



export default router;






