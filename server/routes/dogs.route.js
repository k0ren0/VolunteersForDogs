import express from "express";
import { _addDog, _getDogsByUserId, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";
import { db } from "../config/db.js";

const router = express.Router();

router.post('/', verifytoken, async (req, res) => {
    try {
        const { name, breed, age } = req.body;
        const user_id = req.user.user_id; // Getting the user_id from the request object

        // Using user_id to associate with the user when creating a dog
        await db('dogs').insert({ user_id, name, breed, age });

        res.status(201).json({ message: 'Dog added successfully' });
    } catch (error) {
        console.error('Error saving dog:', error);
        res.status(500).json({ error: 'Error saving dog' });
    }
});

// router.post('/', verifytoken, _addDog);
router.get('/', verifytoken, _getDogsByUserId);
router.put('/:dog_id', verifytoken, _updateDog);
router.delete('/:dog_id', verifytoken, _deleteDog);

router.get("/api/verifytoken", verifytoken, (req, res) => {
    res.sendStatus(200);
});

export default router;

