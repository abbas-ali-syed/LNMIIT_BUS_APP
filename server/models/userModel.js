import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,

    } , 

    email: {
        type: String,
        required: true
    } ,

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin","user"],
    } 

},
{
    timestamps:true,
});

const userModel = new mongoose.model("userModel" , userSchema)

export default userModel