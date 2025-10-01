import express from "express";
import connectdb from "./config/db.js";

const app =  express()

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
})


const port = 5000

const startServer = async ()=>{
    try {
        
        const connect = await connectdb()

        if(!connect){
            throw new Error("failed to connec db")
        }

app.listen(port,()=>{
    console.log("server running on port",port)
})
    } catch (error) {
        console.log(error.message)

        process.exit(1)
    }
}

startServer()

