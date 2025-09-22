import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!value.includes("@gmail.com")){
                throw new Error("email must be gmail")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate(value){
            if(value.toLowerCase() === "password"){
                throw new Error("password cannot be password")
            }
        }
    }

});

//hashing password

userSchema.pre("save",async function (next){
    try {
        
        const user = this;
        if(user.isModified("password")){
            user.password = await bcrypt.hash(user.password,8);

        }

        console.log("hashed password")

        next()

    } catch (error) {
        throw new Error(error.message)
    }
})


const User = mongoose.model("User",userSchema);

export default User;