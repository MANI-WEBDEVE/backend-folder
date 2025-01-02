import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is required"],
        min:[6, "Minimum 6 characters required"],
        unique:[true, "Title already exists"],
    },
    description: {
        type:String,
        required:[true, "Description is required"],
        min:[10, "Minimum 10 characters required"],
    },
    isCompleted: {
        type:Boolean,
        default:false,
    }

})
export const Todo = mongoose.model('Todo', todoSchema);