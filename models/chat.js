import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userMessage: {
    type: String,
    required: true,
  },
  aiResponse: {
    type: String,
    required: true,
  },
  voiceInput: {
    type: String, // Optional: Store the raw voice input data if needed
    required: false,
  },
  voiceResponse: {
    type: String, // Optional: Store a reference or URL to the voice response if generated
    required: false,
  },
  sessionId: {
    type: String, // Useful to group messages under a user session
    required: false,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically records the time of the message
  },
});

// Export the model
const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
