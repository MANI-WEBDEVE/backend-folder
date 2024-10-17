import {v2 as cloudinary} from "cloudinary"

const cloudinaryConfig = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDE_NAME,
            api_key: process.env.CLOUDE_API_KEY,
            api_secret: process.env.CLOUDE_API_SECRET
        })
        console.log("connected to cloudinary")
    } catch (error) {
        
    }
}

export default cloudinaryConfig