import express from 'express';

const app = express()

app.use(express.json()) //! jab hum kisi framework sa data lata ha tu use ko is line sa formate karta ha  

app.use(express.urlencoded({extended: true})) //! or jab hum express ma ejs ka isatamal karta ha tu is line sa data ko formate karata ha

app.get('/', (req, res)=>{
    res.send('how to data formatted')
})

const port = 3000
app.listen(port, ()=>{
    console.log(`server is start and enjoy application: ${port}`)
})