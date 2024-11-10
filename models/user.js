import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select : false,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model('User', user);