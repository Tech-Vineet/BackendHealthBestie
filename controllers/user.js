import { GoogleGenerativeAI } from "@google/generative-ai";
import {User} from '../models/user.js'
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


export const sendResponse = async(req,res)=>{
    const prompt = req.body.prompt
    const genAI = new GoogleGenerativeAI('AIzaSyDnLTnQu9MfqTRvIpLRW7dSUWl-kwsB_58');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    res.json({
        success : true,
        result: result.response.text()
    });
}



