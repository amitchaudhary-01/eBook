import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

export const User = mongoose.model("user",userSchema)