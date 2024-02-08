// routes/dogs.route.js
import express from "express";
import { _addDog, _getDogsByUserId, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post('/', verifytoken, _addDog);
router.get('/', verifytoken, _getDogsByUserId);
router.put('/:dog_id', verifytoken, _updateDog);
router.delete('/:dog_id', verifytoken, _deleteDog);

export default router;


// // src/routes/dogs.route.js
// import express from "express";
// import { _getDogsByUserId, _addDog, _updateDog, _deleteDog } from "../controllers/dogs.controller.js";
// import { verifytoken } from "../middleware/verifyToken.js";

// const router = express.Router();

// // router.get('/', verifytoken, _getDogsByUserId);
// router.post('/', verifytoken, _addDog);
// router.put('/:id', verifytoken, _updateDog);
// router.delete('/:id', verifytoken, _deleteDog);
// router.get('/', async (req, res) => {
//     // Логика для получения данных о собаках из базы данных или другого источника
//     res.json({ dogs: [] });
// });

// router.get("/verify", verifytoken, (req, res) => {
//     res.sendStatus(200);
// });

// export default router;
