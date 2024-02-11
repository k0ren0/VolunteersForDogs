import express from "express";
import { _register, _login, _all, _updateUserById, _getUserById, _fetchUserDogs, _fetchUserEvents } from "../controllers/users.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
router.get('/', verifytoken, _all);
router.get('/:id', verifytoken, _getUserById); 
router.put('/:id', verifytoken, _updateUserById); 
router.get('/dogs', verifytoken, _fetchUserDogs);
router.get('/events', verifytoken, _fetchUserEvents);

// router.get("/api/verifytoken", verifytoken, (req, res) => {
//     res.status(200).json({ msg: "Token is valid" });
    
// });



export default router;






