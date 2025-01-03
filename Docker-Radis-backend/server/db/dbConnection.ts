import mongoose from "mongoose";

export async function dbConnection () {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI as string);
        if(result.ConnectionStates.connected === 1){
            console.log('Connected to database');
        } else if(result.ConnectionStates.connecting === 2) {
            console.log('Connecting to database');
        } else{
            console.log('Error in connecting to database');
        }
       
    } catch (error) {
        console.log(error, 'error');
    }
}