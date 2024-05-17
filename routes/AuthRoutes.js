import express from 'express';
import { SignIn, SignUp } from '../controllers/AuthController.js';
const router=express.Router();
router.post("/signin",SignIn);
router.post("/signup",SignUp);
export default router;