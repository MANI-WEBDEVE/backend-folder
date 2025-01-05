
import express, { type NextFunction, type Request, type Response } from 'express';
import bodyParser from'body-parser';
import dotEnv from 'dotenv';
import { dbConnection } from './db/dbConnection';
import userRoutes from './routes/user.route';
import todoRoutes from './routes/todo.route';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotEnv.config();

dbConnection();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true}))
app.use((req:Request, res:Response, next:NextFunction):any => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.use("/api/v1/auth", userRoutes)

// http://localhost:3000/api/v1/auth/ --> endpoint is /
app.use("/api/v1/todo", todoRoutes)


app.listen(process.env.PORT, () => {

    console.log(`server is runing on port ${process.env.PORT}`);

})      