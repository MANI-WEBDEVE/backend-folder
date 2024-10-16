import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/MongoDB_Asscociation')

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true 
        },
        age:{
            type:Number
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'post'
            }
        ]
    },
    {
        timestamps:true
    }
)

export const UserModel = mongoose.model('user', userSchema)