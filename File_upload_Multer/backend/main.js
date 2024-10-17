import express from "express";
import connectDB from "./DB/dbConnect.js";
import { configDotenv } from "dotenv";
import cloudinaryConfig from "./config/cloudinary.js";
import { upload } from "./config/multer.js";
import UserModel from "./Schema/userSchema.js";
import imageUploadFunc from "./image-upload/imageUpload.js";

const app = express();
configDotenv();
app.use(express.json({ limit: "50mb" }));
const PORT = 3000 
 
 

app.post("/image-uploads", upload.single("image"),async (req, res) => {
   try {
    const {name, email} = req.body;
    const image = req.file;
    console.log(image)
    const imager =  await imageUploadFunc(image.filename)
    const createUser = await UserModel.create({
      username: name,
      email,
      image: imager.url
    })
    console.log(`createIanm ${createUser}`)
    res.json({message: "File uploaded successfully and User created successfully"})

   } catch (error) {
    console.log(error)
    res.json({message: error.message}).status(200)
   }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB()
  cloudinaryConfig()
})

 



 






































































// import express from "express";
// import multer from "multer";
// import path from "path";
// const app = express();
// // const upload = multer({dest: "uploads/"}) --> one method
// app.use(express.json({ limit: "50mb" }));

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage, limits: {fileSize: 1000000} }).single("image");

// app.post("/image-upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       console.log(err.message);
//       return res.status(404).json({ message: err.message });
//     } else if (err) {
//       console.log(err);
//       return res.status(404).json({ message: err.message });
//     }
//     res.status(200).json({message: "File uploaded successfully"});
//   });
// });

// app.listen(3002, () => {
//   console.log("server is running on port 3002");
// });\



