
import express from 'express';

import dotEnv from 'dotenv';
import { dbConnection } from './db/dbConnection';
dbConnection();
const app = express();
 
dotEnv.config();


app.listen(process.env.PORT, () => {

    console.log(`server is runing on port ${process.env.PORT}`);

}) 