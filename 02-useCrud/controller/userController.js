import httpError from "../middleware/errorHandler.js";
import User from "../model/userModel.js";


const addUser = async (req,res,next)=>{
    try {
        
        const {email,name,password}= req.body;

        const newUser ={
            name,
            email,
            password,
        }
        
        const SaveUser = new User(newUser)

        await SaveUser.save();

        if(!SaveUser){
            return next(new httpError("failded to create user",500))
        }

        res.status(201).json({message:"user created successfully",SaveUser})


    } catch (error) {
        next (new httpError(error.message,500))
    }

}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findBycreadiantial(email, password);

    if (!user) {
      return next(new httpError("unable to login", 400));
    }

    res.status(200).json({ message: "log in successfully", user });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default {login,addUser};