import express from 'express';
import bodyParser from 'body-parser';
import userRouter from '../routes/userRoute.js'
import taskRouter from '../routes/taskRoute.js'
import dotenv from 'dotenv';
import { connection } from '../config/connectDb.js';
import cors from 'cors'

dotenv.config();
const app=express();

const PORT=5000;
app.use(bodyParser.json());
const corsOptions = {
    origin: '*',
    credentials: true, 
  };
  app.use(cors(corsOptions))

app.use(userRouter)
app.use(taskRouter)
connection();

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
});


export default app