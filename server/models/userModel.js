import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    } , 

    rollNo: {
        type: String,
        required: true
    } ,

    password: {
        type: String,
        required: true
    }

})

const userModel = new mongoose.model("userModel" , userSchema)

export default userModel