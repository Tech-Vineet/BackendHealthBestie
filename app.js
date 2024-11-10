import express from 'express';
import userRouter from './routes/user.js'
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';



export const app = express();
config ({
    path: './data/config.env',
})



//Middleware
app.use(express.json());
app.use('/users',userRouter);
app.use(cookieParser());


app.get('/', (req,res)=>{
    res.send('Hello World');
})
