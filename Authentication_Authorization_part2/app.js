import express from "express";
import cookieParser from "cookie-parser";
import { UserModel } from "./models/user.model.js";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import jwt from 'jsonwebtoken'
import { dirname, join } from "path";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

const PORT = 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hash ) => {
            let userInfo = await UserModel.create({
                username,
                email,
                password: hash,
              });
              let token = jwt.sign({email}, 'inam')
              res.cookie('Muhammad', token)
              res.send(userInfo)
        })
    })
    

});

app.get('/login' , (req, res) => {
    res.render('login')
})


app.post('/login' , async (req, res) => {
    let userLog = await UserModel.findOne({email:req.body.email})

    if(userLog === null) {
        res.redirect('404')
    }
    else {



    bcrypt.compare(req.body.password, userLog.password, (err, result) => {
        console.log(result)
        if (result === true) {
            let token = jwt.sign({email: userLog.email}, 'inam')
            res.cookie('Muhammad', token)
            res.render('profile')

        } else {
            res.send('some want wrong')
        }
    })
    }

    console.log(userLog)
})
app.get('/404', (req, res) => {
    res.render('404')
})


app.get('/logout' , (req, res) => {
    res.cookie('Muhammad', "")
    res.redirect('/')
})


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
