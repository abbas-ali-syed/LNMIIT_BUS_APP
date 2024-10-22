import express from "express";
import QRCode from "qrcode";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Days from "./models/busModel.js";
import Day from "./models/busModel.js";
import * as socketIo from 'socket.io';;
import http from "http";
import { Server } from 'socket.io';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authController from "./controllers/authController.js ";
//import {seedDays} from './seed.js';
const app = express();
//const socketIo = require('socket.io');
//const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    
    origin: '*', // Change to your client app's URL
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['polling', 'websocket']
});

//const io = socketIo(server);
let adminLocation = null;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast the admin's location to new clients
  if (adminLocation) {
    socket.emit('adminLocation', adminLocation);
  }

  socket.on('updateLocation', async (location) => {
    try {
      console.log('Received location update:', location);
      adminLocation = location;
      io.emit('adminLocation', adminLocation);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Abbas:Abbas1234@cluster0.a1jjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("db successfully connected");
};
// mongoose.connection.once('open', () => {
//   console.log('MongoDB connected!');
//   seedDays(); // Call the seed function after connection
// });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

dotenv.config();

connectDB();

app.use(cors({
  origin: "*", // Allow the frontend
  credentials: true // Allow credentials
}));


const PORT = 8804;

server.listen(PORT, () => {
  console.log(`Sever started at ${PORT}`);
});




// app.post("/create-schedule", async (req, res) => {
//   const { name } = req.body;
//   console.log(name);
//   const newDay = new Days({
//     name,
//   });
//   const savedDay = await newDay.save();
//   res.status(201).json(savedDay);
// });

// app.post("/createBus", async (req, res) => {
//   const { day, start, destination, status, count, capacity, time } = req.body;

//   const today = await Days.findOne({ name: day });

//   if (!today) {
//     return res.status(404).json({ message: "Day not found" });
//   }

//   const newBus = {
//     start,
//     destination,
//     status,
//     count,
//     capacity,
//     time,
//   };

//   today.buses.push(newBus);
//   await today.save();

//   res.status(201).json(today);
// });


// server/index.js
// // server/index.js
// app.get("/schedule/:day", async (req, res) => {
//   const { day } = req.params;
//   const result = await Days.find({ name: day });
//   if (result.length > 0) {
//     res.status(200).json(result[0].buses);
//   } else {
//     res.status(404).json({ message: "No schedule found for the given day" });
//   }
// });




// app.post("/count/:day/:busId", async (req, res) => {
//   const { day, busId } = req.params;
//   const today = await Days.findOne({ name: day });
//   let busMatch = today.buses.find((bus) => bus._id.toString() === busId);
//   let newCount = busMatch.count + 1;
//   busMatch.count = newCount;
//   const newBus = today.buses.filter((bus) => bus._id.toString() === busId);
//   newBus.push(busMatch);
//   today.buses = newBus;
//   await today.save();
//   res.json(busMatch.count);
// });
