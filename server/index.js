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
import { initCronJobs, runCleanupTasks } from './cronJobs.js'; 
import authController from "./controllers/authController.js ";
//import {seedDays} from './seed.js';
const app = express();
//const socketIo = require('socket.io');
//const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    
    origin: '*', // Change to your client app's URL
    methods: ["GET", "POST","PUT","PATCH"],
    headers: ['Content-Type', 'Authorization'],

    credentials: true
  },
  transports: ['polling', 'websocket']
});

//const io = socketIo(server);
let adminLocation = null;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast the admin's location to new clients if available
  if (adminLocation) {
    socket.emit('adminLocation', adminLocation);
  }

  // Handle location updates from the admin
  socket.on('updateLocation', (location) => {
    console.log('Received location update from admin:', location);
    adminLocation = location;
    io.emit('adminLocation', adminLocation); // Broadcast to all clients
  });

  // Handle admin stop tracking event
  socket.on('stopTracking', () => {
    console.log('Admin stopped tracking');
    adminLocation = null;
    io.emit('adminLocation', null); // Notify all clients that tracking has stopped
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});




const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Abbas:Abbas1234@cluster0.a1jjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("db successfully connected");
  initCronJobs();
};


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);



dotenv.config();

connectDB();


app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],

  credentials: true 
}));


const PORT = 8804;

server.listen(PORT, () => {
  console.log(`Sever started at ${PORT}`);
});



app.post("/api/test-cron", async (req, res) => {
  try {
    await runCleanupTasks();
    res.status(200).json({ message: "Cleanup tasks completed successfully" });
  } catch (error) {
    console.error("Error running cleanup tasks:", error);
    res.status(500).json({ message: "Error running cleanup tasks", error: error.message });
  }
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
