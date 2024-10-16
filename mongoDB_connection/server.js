import express from "express";

// import userSchema from "./userModel"
import { user } from "./userModel.js";

const app = express();

app.get("/", (req, res) => {
  res.send("helloPOPL");
});

app.get("/create", async (req, res) => {
  let createdUser = await user.create({
    username: "Muhammad",
    name: "inam2",
    email: "Inam@gmail.com",
    password:"lolopolo"
  });

  res.send(createdUser)
});

app.get('/update', async (req, res)=>{
    let updatedUser = await user.updateOne({name:'inam'}, {name:"MuhammadTahir"}, {new:true})
    res.send(updatedUser)
})



app.get('/rea d', async (req, res) => {
    let readUser = await user.find();
    res.send(readUser)
})


app.get('/delete', async (req, res) => {
    let deleted = await user.deleteMany();
    console.log(deleted)
    res.send(deleted)
})





const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
