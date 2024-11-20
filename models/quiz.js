const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "stress", "depression", "anxiety"
  questions: [
    {
      question: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          score: { type: Number, required: true }, // Score associated with the option
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);

