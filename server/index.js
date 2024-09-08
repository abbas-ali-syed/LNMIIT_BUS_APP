import express from "express";
import QRCode from "qrcode";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Days from "./models/busModel.js";
import Day from "./models/busModel.js";

const app = express();

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://aadityashukla10i:wcrMry2EY2DoRoGS@cluster0.dziz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("db successfully connected");
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

connectDB();

const PORT = 8804;

app.listen(PORT, () => {
  console.log(`Sever started at ${PORT}`);
});

app.get("/generateQR", async (req, res) => {
  try {
    const rollNo = req.query.rollNo;

    if (!rollNo) {
      return res.send({ success: false, message: "Roll number is required" });
    }

    // Generate QR code with just the roll number
    const qrCodeImage = await QRCode.toDataURL(rollNo);

    return res.send(`<img src="${qrCodeImage}" alt="QR Code" />`);
  } catch (err) {
    console.log("Error generating QR code", err.message);
    return res.send({ success: false, message: `Error: ${err.message}` });
  }
});

app.post("/create-schedule", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const newDay = new Days({
    name,
  });
  const savedDay = await newDay.save();
  res.status(201).json(savedDay);
});

app.post("/createBus", async (req, res) => {
  const { day, start, destination, status, count, capacity, time } = req.body;
  const today = await Days.findOne({ name: day });
  console.log(day);
  const newBus = {
    start,
    destination,
    status,
    count,
    capacity,
    time,
  };

  today.buses.push(newBus);
  await today.save();
  res.status(201).json(today);
});

app.get("/schedule/:day", async (req, res) => {
  const { day } = req.params;
  const result = await Days.find({ name: day });
  res.status(200).json(result[0].buses);
});

app.post("/count/:day/:busId", async (req, res) => {
  const { day, busId } = req.params;
  const today = await Days.findOne({ name: day });
  let busMatch = today.buses.find((bus) => bus._id.toString() === busId);
  let newCount = busMatch.count + 1;
  busMatch.count = newCount;
  const newBus = today.buses.filter((bus) => bus._id.toString() === busId);
  newBus.push(busMatch);
  today.buses = newBus;
  await today.save();
  res.json(busMatch.count);
});
