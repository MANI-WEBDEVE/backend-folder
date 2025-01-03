import mongoose from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser extends Document {

    fullName: string;

    email: string;

    password: string;

    todos: { title: string; description: string; isCompleted: boolean; }[];
    
    comparePassword(candidatePassword: string): Promise<boolean>;

}

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: [true, "First Name is required"],
        min: [4, "Minimum 4 characters required"],
    },
    email:{
        type:String,
        required: [true, "Email is required"],
        unique:[true, "Email already exists"],
    },
    password: {
        type:String,
        required: [true, "Password is required"],
        min: [8, "Minimum 6 characters required"],
    },
    todos: []

})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {

        return next();

    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();

});



userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {

    return bcrypt.compare(candidatePassword, this.password);

};



const User = mongoose.model<IUser>('User', userSchema);

export default User;