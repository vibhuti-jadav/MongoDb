import express from "express";

import connectDb from "./config/db.js";
import httpError from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";



const app = express();

app.use(express.json());

app.use("/user",userRoutes)

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
})


app.use((req,res,next)=>{
    next (new httpError("could not find this route",404))
})

app.use((error,req,res,next)=>{
    if(res.headersSent){
        next(error)
    }

    res.status(error.statuscode || 500).json({message:error.message || "an unknown eror occured!"})
})


const port = 5000


const startserver = async()=>{
    try {
        
        const connect = await connectDb()

        if(!connect){
            return console.log("could not connect to db")
        }
        console.log("db connected")

app.listen(port,()=>{
    console.log("server running on port",port)
})

    } catch (error) {
        
        console.log(error.message);
        process.exit(1)
    }
}

startserver()
