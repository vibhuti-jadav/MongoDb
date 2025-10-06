import express from "express";
import session from "express-session";
import  Passport  from "passport";


import connectdb from "./config/db.js";
import httpError from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js"
import profileRoutes from "./routes/profileRoute.js"

const app =  express()

app.set("view engine","ejs")

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(Passport.initialize());
app.use("/auth",authRoutes)

import "./config/passport.js"

app.use("/auth",authRoutes)

app.use("/profile",profileRoutes)


app.get("/",(req,res)=>{
    res.render("home",{User: req.user})
})


app.use((req,res,next)=>{
    next((new httpError("requested route is not availbale",404)))
});

app.use((error,req,res,next)=>{
    if(req.headerSent){
        return next(error)
    }

    res.status(error.statusCode || 500).json(error.message || "somthing went wrong try again later")
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

