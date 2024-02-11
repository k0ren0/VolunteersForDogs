import express from "express";
import { _addDog, _getDogsByUserId, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";
import { db } from "../config/db.js";

const router = express.Router();

router.post('/', verifytoken, async (req, res) => {
    try {
        const { name, breed, age } = req.body;
        await db('dogs').insert({ name, breed, age });
        res.status(201).json({ message: 'Dog added successfully' });
    } catch (error) {
        console.error('Ошибка сохранения собаки:', error);
        res.status(500).json({ error: 'Ошибка сохранения собаки' });
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

