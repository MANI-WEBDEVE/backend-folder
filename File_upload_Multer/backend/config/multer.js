import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    console.log("inam File")
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
