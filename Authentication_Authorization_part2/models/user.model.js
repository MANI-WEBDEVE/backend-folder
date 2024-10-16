import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/authenUser`)

const userSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps:true
    }
)

export const UserModel = mongoose.model('user', userSchema)