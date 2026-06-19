import express from 'express';
import multer from 'multer';
import {
  registerCreator,
  sendOtp,
  verifyOtp,
  resetPassword,
  loginCreator
} from '../controller/creator.controller.js';

export const creatorRouter = express.Router();

// Memory storage for multer + buffer upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

creatorRouter.post('/signup', upload.single('profilePicture'), registerCreator);
creatorRouter.post('/send-otp', sendOtp);
creatorRouter.post('/verify-otp', verifyOtp);
creatorRouter.post('/reset-password', resetPassword);
creatorRouter.post('/login', loginCreator);
