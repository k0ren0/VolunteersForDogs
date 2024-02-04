import express from "express";
import { _login, _register, _all } from "../controllers/users.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
router.get('/', verifytoken, _all);

router.get("/verify", verifytoken, (req, res) => {
    res.sendStatus(200);
});

export default router;
