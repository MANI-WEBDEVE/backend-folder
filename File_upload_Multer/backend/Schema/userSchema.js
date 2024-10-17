import { Schema } from "mongoose";
import mongoose  from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('user', UserSchema)

export default UserModel