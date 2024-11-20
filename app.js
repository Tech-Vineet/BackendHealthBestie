import express from 'express';
import userRouter from './routes/user.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();

// Load environment variables
config({
    path: './data/config.env',
});

// Middleware
app.use(cors({ 
    origin: 'http://localhost:3000',  // Allow requests from localhost:3000 (adjust for production)
    credentials: true,  // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());

// User Routes
app.use('/api', userRouter);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World');
});

