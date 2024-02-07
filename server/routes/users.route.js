import express from "express";
import { _login, _register, _all, _updateUserProfile, _getUserById } from "../controllers/users.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
router.get('/', verifytoken, _all);
router.get('/:id', verifytoken, _getUserById); 
router.put('/profile/:id', verifytoken, _updateUserProfile);

router.get("/verify", verifytoken, (req, res) => {
    res.status(200).json({ msg: "Token is valid" });
});

export default router;
