import mongoose from "mongoose"


const connectdb = async ()=>{

    try {
        const connect = mongoose.connect("mongodb://127.0.0.1:27017/auth")

        return connect
    } catch (error) {

        throw new Error(error.message)
    }

}


export default connectdb