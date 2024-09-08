import mongoose from "mongoose";

//bus number
//bus source and destination
//bus count
//bus status


const busSchema = mongoose.Schema(
    {
        start: { type: String, required: true },
        destination: { type: String, required: true },
        status: { type: String, default: "Free" },
        count: {
            type: Number,
            default: 0
        }
        ,
        capacity: {
            type: Number,
            default: 50
        },
        time: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const daysSchema = mongoose.Schema({
    name: { type: String, required: true },
    buses: [busSchema],
})


const Day = mongoose.model('Day', daysSchema);

export default Day;
