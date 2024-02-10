import express from "express";
import { _addDog, _getDogsByUserId, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/', verifytoken, _addDog);
router.get('/', verifytoken, _getDogsByUserId);
router.put('/:dog_id', verifytoken, _updateDog);
router.delete('/:dog_id', verifytoken, _deleteDog);

// router.get("/api/verifytoken", verifytoken, (req, res) => {
//     res.sendStatus(200);
// });

export default router;

