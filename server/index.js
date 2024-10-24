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
const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    
    origin: '*',
    methods: ["GET", "POST","PUT","PATCH"],
    headers: ['Content-Type', 'Authorization'],

    credentials: true
  },
  transports: ['polling', 'websocket']
});


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
    process.env.MONGODB_URI
  );
  console.log("db successfully connected");
  initCronJobs();
};


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);



connectDB();


app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],

  credentials: true 
}));


const PORT = process.env.PORT || 8804;

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





