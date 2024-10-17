import {v2 as cloudinary} from "cloudinary"

const imageUploadFunc = async (imagePath) => {
    console.log(imagePath)
    console.log('Mani')

        const result = await cloudinary.uploader.upload(`uploads/${imagePath}`,  {
            folder: "File_upload_Multer",
        })
        console.log('kjdklasjdalksdj',{result})

        return result

}

export default imageUploadFunc