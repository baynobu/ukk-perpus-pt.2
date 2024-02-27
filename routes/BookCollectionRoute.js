import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { getUserCollection,  createCollection, deleteCollection} from "../controllers/OwnBookCollection.js";

const router = express.Router();

router.get('/collection/', verifyUser, getUserCollection);
router.post('/collection/', verifyUser, createCollection);
router.delete("/collection/:id",verifyUser, deleteCollection);

export default router;