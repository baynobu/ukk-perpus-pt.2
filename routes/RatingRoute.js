import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { createReview, getReviewById } from "../controllers/BookReview.js";

const router = express.Router();

router.get('/rating/:id', verifyUser, getReviewById);
router.post('/rating/', verifyUser,  createReview);

export default router;