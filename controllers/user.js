import { GoogleGenerativeAI } from "@google/generative-ai";
import {User} from '../models/user.js'
import Chat from '../models/chat.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const signUp = async(req,res)=>{
    const {name, password, email} = req.body;
    const userExists = await User.findOne({email: email})

    if(userExists) {
        return res.status(400).json({error: "User already exists"})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({name, password: hashedPassword, email})
    await newUser.save()
    const token = jwt.sign({id : newUser._id}, "AKLHSDHSAGFDJHRUIHYJDSKKJ", {expiresIn: '1h'})
    res.json({success: true, message: "User created successfully",
        token: token
    })

    
}

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        // Check if email and password are provided in the request body
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if user password exists to avoid undefined errors
        if (!user.password) {
            return res.status(500).json({ error: "User password is missing" });
        }

        // Validate password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Successful login response
        res.json({
            success: true,
            message: "Logged in successfully",
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};

// export const response = async (req, res) => {
//     const { message } = req.body;
  
//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }
  
//     try {
//       // Initialize Google Generative AI
//       const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
  
//       // Start chat with initial history
//       const chat = model.startChat({
//         history: [
//           {
//             role: "user",
//             parts: [{ text: "Hello" }],
//           },
//           {
//             role: "model",
//             parts: [{ text: "Great to meet you. What would you like to know?" }],
//           },
//         ],
//       });
  
//       // Send message to the model
//       let result = await chat.sendMessage(message);
  
//       // Send the AI's response back to the client
//       res.status(200).json({ response: result.response.text() });
//     } catch (error) {
//       console.error('Error communicating with Google Generative AI:', error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
export const response = async (req, res) => {
  const { message, voiceInput } = req.body;

  if (!message && !voiceInput) {
    return res.status(400).json({ error: "Message or Voice Input is required" });
  }

  try {
    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "Gemini 1.5 Pro" });

    // Start chat with initial history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    // Handle voice input (convert to text if needed)
    let inputMessage = message;
    if (voiceInput) {
      inputMessage = await chat.voiceToText(voiceInput); // Assumes voice-to-text conversion is provided by Gemini
    }

    // Send message to the model
    const result = await chat.sendMessage(inputMessage);

    // Log chat in MongoDB
    const newChat = new Chat({
      userMessage: inputMessage,
      aiResponse: result.response.text(),
    });
    await newChat.save();

    // Optional: Convert AI response to voice (text-to-speech)
    const voiceResponse = await chat.textToVoice(result.response.text()); // Assumes text-to-voice conversion is provided

    // Respond with text and optional voice
    res.status(200).json({
      response: result.response.text(),
      voiceResponse, // Include this if the client can handle audio
    });
  } catch (error) {
    console.error("Error communicating with Google Generative AI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



