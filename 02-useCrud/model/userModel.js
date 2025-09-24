import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    },
    tokens:[
        {
            token:{
                type:String,
                trim:true,
            },
        },
    ]

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


//login user

userSchema.statics.findBycreadiantial = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("unable to login");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("unable to login");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, "authTokenSecret");

    user.tokens =user.tokens.concat({token});

    await user.save()
    
    return token;

  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User",userSchema);

export default User;