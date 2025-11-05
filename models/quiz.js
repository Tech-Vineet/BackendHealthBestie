import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  questions: [
    {
      question: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          score: { type: Number, required: true }, 
        },
      ],
    },
  ],
});

export const Quiz = mongoose.model("Quiz", quizSchema);

