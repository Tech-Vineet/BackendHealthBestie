import express from 'express';
import { main } from '../bot.js';

const router = express.Router();

router.use(express.json());

router.post('/conversations', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await main(prompt);
    res.status(200).json({ response }); // Send response as JSON
  } catch (error) {
    console.error("Error in /conversations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;


