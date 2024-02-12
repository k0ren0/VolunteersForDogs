import express from "express";
import { body, validationResult } from 'express-validator';
import { verifytoken } from "../middleware/verifyToken.js";
import { db } from "../config/db.js";

const router = express.Router();

// Создание новой записи собаки с валидацией входных данных
router.post('/', 
    verifytoken, 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('breed').notEmpty().withMessage('Breed is required'),
        body('age').isNumeric().withMessage('Age must be a number'),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, breed, age } = req.body;
            const user_id = req.user.user_id;
            await db('dogs').insert({ user_id, name, breed, age });
            res.status(201).json({ message: 'Dog added successfully' });
        } catch (error) {
            console.error('Error saving dog:', error);
            res.status(500).json({ error: 'Error saving dog' });
        }
    }
);

// Получение записей собак конкретного пользователя
router.get('/', verifytoken, async (req, res) => {
    const user_id = req.user.user_id;

    try {
        const dogs = await db('dogs').where({ user_id });
        res.json(dogs);
    } catch (error) {
        console.error('Error fetching dogs:', error);
        res.status(500).json({ error: 'Error fetching dogs' });
    }
});

// Обновление существующей записи собаки
router.put('/:dog_id', 
    verifytoken, 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('breed').notEmpty().withMessage('Breed is required'),
        body('age').isNumeric().withMessage('Age must be a number'),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { dog_id } = req.params;
        const { name, breed, age } = req.body;
        const user_id = req.user.user_id;

        try {
            const updated = await db('dogs')
                .where({ user_id, dog_id })
                .update({ name, breed, age });

            if (updated) {
                res.json({ message: 'Dog updated successfully.' });
            } else {
                res.status(404).json({ error: 'Dog not found.' });
            }
        } catch (error) {
            console.error('Error updating dog:', error);
            res.status(500).json({ error: 'Error updating dog.' });
        }
    }
);

// Удаление записи собаки
router.delete('/:dog_id', verifytoken, async (req, res) => {
    const { dog_id } = req.params;
    const user_id = req.user.user_id;

    try {
        const deleted = await db('dogs')
            .where({ user_id, dog_id })
            .del();

        if (deleted) {
            res.json({ message: 'Dog deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Dog not found.' });
        }
    } catch (error) {
        console.error('Error deleting dog:', error);
        res.status(500).json({ error: 'Error deleting dog.' });
    }
});

// Подтверждение токена (демонстрационный маршрут)
router.get("/api/verifytoken", verifytoken, (req, res) => {
    res.sendStatus(200);
});

export default router;



// import express from "express";
// import { _addDog, _getDogsByUserId, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
// import { verifytoken } from "../middleware/verifyToken.js";
// import { db } from "../config/db.js";

// const router = express.Router();

// router.post('/', verifytoken, async (req, res) => {
//     try {
//         const { name, breed, age } = req.body;
//         const user_id = req.user.user_id; // Getting the user_id from the request object

//         // Using user_id to associate with the user when creating a dog
//         await db('dogs').insert({ user_id, name, breed, age });

//         res.status(201).json({ message: 'Dog added successfully' });
//     } catch (error) {
//         console.error('Error saving dog:', error);
//         res.status(500).json({ error: 'Error saving dog' });
//     }
// });

// // router.post('/', verifytoken, _addDog);
// router.get('/', verifytoken, _getDogsByUserId);
// router.put('/:dog_id', verifytoken, _updateDog);
// router.delete('/:dog_id', verifytoken, _deleteDog);

// router.get("/api/verifytoken", verifytoken, (req, res) => {
//     res.sendStatus(200);
// });

// export default router;

