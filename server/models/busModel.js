import mongoose from "mongoose";

const busSchema = mongoose.Schema({
  id: { type: Number, required: true },
  start: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, default: "On Time" },
  count: { type: Number, default: 0 },
  capacity: { type: Number, default: 50 },
  time: { type: String, required: true }
});

const daySchema = mongoose.Schema({
  name: { type: String, required: true },
  buses: [busSchema],
});

const Day = mongoose.model('Day', daySchema);

export default Day;