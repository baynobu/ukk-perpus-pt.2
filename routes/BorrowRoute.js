import express from "express";
import { createRequest, returnBook } from "../controllers/Borrow.js";
import { getBorrow, getBorrowReturned } from "../controllers/BorrowHistory.js";
import { verifyUser, pustakawan } from "../middleware/AuthUser.js";
import { SuperUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.patch('/return-book/:id', verifyUser, returnBook);

router.get('/borrow', verifyUser,getBorrow);
router.get('/borrow-returned', verifyUser, getBorrowReturned);

router.post('/borrow', verifyUser, createRequest);

export default router;