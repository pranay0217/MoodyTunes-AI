import express from 'express';
import { loginUser, signupUser, sendOTP, verifyOTP, resetPassword } from '../controller/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.post('/send-otp', sendOTP);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/verify-otp', verifyOTP);
