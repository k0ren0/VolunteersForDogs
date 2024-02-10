import express from "express";
import { _login, _register, _all, _updateUserProfile } from "../controllers/profile.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
router.get('/', verifytoken, _all);
router.put('/profile/:id', verifytoken, _updateUserProfile); // Добавленный маршрут

// router.get("/api/verifytoken", verifytoken, (req, res) => {
//     res.sendStatus(200);
// });

export default router;
