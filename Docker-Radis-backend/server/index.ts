
import express from 'express';
import bodyParser from'body-parser';
import dotEnv from 'dotenv';
import { dbConnection } from './db/dbConnection';
import userRoutes from './routes/user.route';
import todoRoutes from './routes/todo.route';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dbConnection();
const app = express();
 
dotEnv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use("/api/v1/auth", userRoutes)

// http://localhost:3000/api/v1/auth/ --> endpoint is /
app.use("/api/v1/todo", todoRoutes)


app.listen(process.env.PORT, () => {

    console.log(`server is runing on port ${process.env.PORT}`);

})      