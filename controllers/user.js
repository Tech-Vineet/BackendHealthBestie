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



