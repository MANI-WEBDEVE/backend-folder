import express from "express";
import { UserModel } from "./models/user.models.js";
import { postModel } from "./models/post.model.js";

const app = express()

app.get('/', (req,res) => {
    res.send('HEllo')
})

app.get('/create', async (req, res) => {
    const user = await UserModel.create(
        {
            username:'Muhammad Tahir',
            email:'MuhammadTahir@gmail.com'  ,
            age:20
        }
    )
    res.send(user)
})

app.get('/post/create', async (req, res) => {
   const post = await postModel.create(
    {
        postdata:'hello every One',
        user: '66308c46bc3b364b876071af',

    }
   )

   let user = await UserModel.findOne({_id: "66308c46bc3b364b876071af"})

   user.posts.push(post._id)
   await user.save()

   res.send({post, user})
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})