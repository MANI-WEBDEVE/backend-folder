import mongoose from "mongoose"

const connectDB = async () => {
    try {
       const connect = await mongoose.connect(process.env.DB_CONNECT_URI)
       console.log(`connected to ${connect.connection.host}`)
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB