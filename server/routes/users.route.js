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






