import express from 'express';
import userRouter from './routes/user.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import quizRoute from './routes/quiz.js';
export const app = express();


// Load environment variables
config({
    path: './data/config.env',
});

// Middleware
app.use(
    cors({
      origin: "*", // Allow all origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    })
  );
  
app.use(express.json());
app.use(cookieParser());

// User Routes
app.use('/api/users', userRouter);
app.use('/api', quizRoute);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World');
});

