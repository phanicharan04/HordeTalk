import express from 'express';
import connectdb from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';

const app = express()
dotenv.config()
app.use(express.json())
const port=process.env.PORT;
const startServer=async()=>{
    try {
        await connectdb();
        app.listen(port,()=>{
            console.log(`server started at port ${port}`);
            
        })
    } catch (error) {
        console.log(error.message);
        
    }
}

startServer();

//test Route
app.get("/",(req,res)=>{
    res.status(200).json({message:"Ok"})
})

//user Routes
app.use("/api/users",userRouter)

//post routes
app.use("/api/posts",postRouter)

