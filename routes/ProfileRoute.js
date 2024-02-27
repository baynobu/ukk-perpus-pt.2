import express from "express";
import {Profile} from "../controllers/Profile.js";
import { verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/profile', verifyUser, Profile);

export default router;