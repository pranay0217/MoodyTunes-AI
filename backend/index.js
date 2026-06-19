import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { creatorRouter } from './router/creator.router.js';
import { userRouter } from './router/user.router.js';
import { router } from './router/userRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

// Register creator, user routes
app.use('/creator', creatorRouter);
app.use('/user', userRouter);
app.use('/dash',router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
