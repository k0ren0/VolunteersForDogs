import express from "express";
import { _addDog, _getDogsByUserId, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post('/', verifytoken, _addDog);
router.get('/', verifytoken, _getDogsByUserId);
router.put('/:dog_id', verifytoken, _updateDog);
router.delete('/:dog_id', verifytoken, _deleteDog);

export default router;

