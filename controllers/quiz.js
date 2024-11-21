import {Quiz} from '../models/quiz.js';

// Get questions by quiz type
export const getQuizType = async (req, res) => {
  const { type } = req.params; // "stress", "depression", "anxiety"
  try {
    const quiz = await Quiz.findOne({ type });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz.questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitQuiz =  async (req, res) => {
    const { type } = req.params;
    const { answers } = req.body; // Array of selected option scores
  
    try {
      // Calculate total score
      const totalScore = answers.reduce((sum, score) => sum + score, 0);
  
      // Provide feedback based on the score
      let result;
      if (totalScore <= 5) {
        result = "Mild symptoms. Monitor your well-being.";
      } else if (totalScore <= 10) {
        result = "Moderate symptoms. Consider reaching out to a professional.";
      } else {
        result = "Severe symptoms. Professional help is highly recommended.";
      }
  
      res.status(200).json({ totalScore, result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const addQuiz = async (req, res) => {
    const { type, questions } = req.body; // Type (stress, depression, anxiety), questions array
  
    try {
      // Check if a quiz of the same type already exists
      const existingQuiz = await Quiz.findOne({ type });
      if (existingQuiz) {
        return res.status(400).json({ message: "Quiz type already exists" });
      }
  
      // Create a new quiz
      const newQuiz = new Quiz({ type, questions });
      await newQuiz.save();
  
      res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
  

