import express from "express";
import multer from "multer";
import path from "path";
const app = express();
// const upload = multer({dest: "uploads/"}) --> one method
app.use(express.json({ limit: "50mb" }));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("image");

app.post("/image-upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof Error) {
      console.log(err);
      return res.send("something went wrong").status(404);
    } else if (err) {
      console.log(err);
      return res.send("something went wrong").status(404);
    }
    res.status(200).send("image uploaded");
  });
});

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
