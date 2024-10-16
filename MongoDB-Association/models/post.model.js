import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
    {
        postdata:{
            type:String,
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps:true
    }
)

export const postModel = mongoose.model('post', postSchema)