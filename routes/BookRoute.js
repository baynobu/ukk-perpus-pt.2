import express from "express";
import {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBookById,
} from "../controllers/Book.js";
import { verifyUser, pustakawan } from "../middleware/AuthUser.js";
import { upload } from "../middleware/multer.js";


const router = express.Router();

router.get('/books', verifyUser, getBooks);
router.get('/books/:id', verifyUser, getBookById);
router.post('/books', verifyUser, pustakawan, upload.single('bookCover'), createBook);
router.patch('/books/:id', verifyUser, pustakawan, updateBook);
router.delete('/books/:id', verifyUser, pustakawan, deleteBook);
// router.post('/upload-cover', verifyUser, upload.single('bookCover'), uploadCover);


export default router;