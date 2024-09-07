import mongoose from "mongoose";

const rollSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
        unique: true
    },

    count: {
        type: Number,
        default: 0
    }
})

const RollModel = mongoose.model("Roll" , rollSchema)

export default RollModel