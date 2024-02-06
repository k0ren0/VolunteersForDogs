// src/routes/dogs.route.js
import express from "express";
import { _allDogs, _addDog, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/', verifytoken, _allDogs);
router.post('/', verifytoken, _addDog);
router.put('/:id', verifytoken, _updateDog);
router.delete('/:id', verifytoken, _deleteDog);

router.get("/verify", verifytoken, (req, res) => {
    res.sendStatus(200);
});

export default router;
