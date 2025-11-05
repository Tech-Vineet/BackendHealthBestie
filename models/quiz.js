const mongoose = require("mongoose");

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

module.exports = mongoose.model("Quiz", quizSchema);

