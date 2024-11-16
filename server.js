import {app} from './app.js'
import express from 'express';


import { dbConnect } from './data/database.js';

dbConnect();

app.use(express.json());




app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});

export default app;