import express from "express";
import { _login, _register, _all, _updateUserProfile, _getUserById, _fetchUserDogs, _fetchUserEvents } from "../controllers/users.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
router.get('/', verifytoken, _all); // Защита маршрута
router.get('/profile/:id', verifytoken, _getUserById); // Изменено согласно использованию verifyToken
router.put('/profile', verifytoken, _updateUserProfile); // Используем verifyToken для проверки пользователя
router.get('/dogs', verifytoken, _fetchUserDogs); // Получение собак пользователя, требует токена
router.get('/events', verifytoken, _fetchUserEvents); // Получение событий пользователя, требует токена

router.get("/verify", verifytoken, (req, res) => {
    res.status(200).json({ msg: "Token is valid" });
});


export default router;


// import express from "express";
// import { _login, _register, _all, _updateUserProfile, _getUserById } from "../controllers/users.controller.js";
// import { verifytoken } from "../middleware/verifyToken.js";

// const router = express.Router();

// router.post('/register', _register);
// router.post('/login', _login);
// router.get('/', verifytoken, _all);
// router.get('/:id', verifytoken, _getUserById); 
// router.put('/profile/:id', verifytoken, _updateUserProfile);
// router.get('/dogs', verifytoken, _fetchUserDogs);
// router.get('/events', verifytoken, _fetchUserEvents);
// router.put('/profile', verifyToken, updateUserProfile);

// // Маршруты для получения собак и событий пользователя
// router.get('/:userId/dogs', verifyToken, fetchUserDogs);
// router.get('/:userId/events', verifyToken, fetchUserEvents);

// router.get("/verify", verifytoken, (req, res) => {
//     res.status(200).json({ msg: "Token is valid" });
// });

// export default router;
