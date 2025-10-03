
import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    googleId:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    }
})

const User = mongoose.model("User",Userschema)

export default User