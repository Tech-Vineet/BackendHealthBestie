import express from 'express';
import {sendResponse, signUp, login} from '../controllers/user.js'

const router = express.Router();
router.use(express.json());


router.post('/signup', signUp);
router.post('/login', login);
router.post('/conversations', sendResponse);

export default router;


