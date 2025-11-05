import express from 'express';
import {getQuizType,submitQuiz,addQuiz} from '../controllers/quiz.js'

const router = express.Router();
router.use(express.json());


router.get("/quiz/:type", getQuizType);
router.post("/quiz/:type/submit", submitQuiz);
router.post("/quiz", addQuiz );

export default router;