import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/nextmongo`)

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps:true})

export const user = mongoose.model('user', userSchema)