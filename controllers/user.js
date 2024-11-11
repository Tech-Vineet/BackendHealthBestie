import { GoogleGenerativeAI } from "@google/generative-ai";
import {User} from '../models/user.js'
import jwt from 'jsonwebtoken';

export const signUp = async(req,res)=>{
    const {username, password, email} = req.body;
    const userExists = User.findOne({username: username})

    if(userExists) {
        return res.status(400).json({error: "User already exists"})
    }

    const newUser = new User({username, password, email})
    await newUser.save()
    const token = json.sign()
    res.json({success: true, message: "User created successfully"})

    
}


export const login = async()=>{

}


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



