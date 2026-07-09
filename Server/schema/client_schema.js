import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
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
    },
    role:{
        default:'user',
        type:String
    }
})

export const Client = mongoose.model("client",clientSchema)