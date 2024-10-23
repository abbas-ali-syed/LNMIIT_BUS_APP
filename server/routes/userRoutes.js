
import express from "express";
import authorizeRoles from "../middlewares/roleMiddleware.js";
const router= express.Router();
import verifyToken from "../middlewares/authMiddleware.js";
//Both User Admin
router.get("/user",verifyToken,authorizeRoles("admin","user"),(req,res)=>{
    res.json({message:"welcome user"});
});
const busSchedule = { 
    "Monday": [
      { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 50, capacity: 100, time: "06:00 AM" },
      { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
      { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
      { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
      { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
      { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
      { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
      { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
      { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
      { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
      { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
      { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
    ],
    "Tuesday": [
      { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
      { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 50, capacity: 100, time: "07:00 AM" },
      { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
      { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 50, capacity: 100, time: "10:00 AM" },
      { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
      { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
      { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 50, capacity: 100, time: "03:45 PM" },
      { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
      { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
      { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
      { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
      { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
      { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
    ],
    "Wednesday": [
      { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
      { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
      { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
      { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
      { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
      { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
      { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
      { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
      { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
      { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
      { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
      { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
    ],
    "Thursday": [
      { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
      { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
      { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
      { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
      { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
      { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
      { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
      { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
      { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
      { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
      { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
      { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
    ],
    "Friday": [
      { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:00 AM" },
      { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 3, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 4, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
      { id: 5, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:00 AM" },
      { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "11:45 AM" },
      { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "01:30 PM" },
      { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:45 PM" },
      { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "05:45 PM" },
      { id: 10, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
      { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "07:00 PM" },
      { id: 12, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:15 PM" },
      { id: 13, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
      { id: 14, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
    ],
    "Saturday": [
      { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
      { id: 3, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:30 AM" },
      { id: 4, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
      { id: 5, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
      { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "01:00 PM" },
      { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "02:00 PM" },
      { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:00 PM" },
      { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "04:00 PM" },
      { id: 10, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:00 PM" },
      { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:15 PM" },
      { id: 12, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
      { id: 13, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "06:30 PM" },
      { id: 14, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "07:45 PM" },
      { id: 15, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
      { id: 16, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
    ],
    "Sunday": [
      { id: 1, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "07:00 AM" },
      { id: 2, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:00 AM" },
      { id: 3, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "08:30 AM" },
      { id: 4, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
      { id: 5, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "10:30 AM" },
      { id: 6, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "01:00 PM" },
      { id: 7, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "02:00 PM" },
      { id: 8, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "03:00 PM" },
      { id: 9, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "04:00 PM" },
      { id: 10, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:00 PM" },
      { id: 11, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "05:15 PM" },
      { id: 12, start: "LNMIIT", destination: "Ajmeri Gate", status: "On Time", count: 0, capacity: 100, time: "06:15 PM" },
      { id: 13, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "06:30 PM" },
      { id: 14, start: "LNMIIT", destination: "Raja Park", status: "On Time", count: 0, capacity: 100, time: "07:45 PM" },
      { id: 15, start: "Ajmeri Gate", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "08:45 PM" },
      { id: 16, start: "Raja Park", destination: "LNMIIT", status: "On Time", count: 0, capacity: 100, time: "09:00 PM" }
    ]
  };
  
  
router.get("/schedule/:day", async (req, res) => {
    const { day } = req.params;
    const schedule = busSchedule[day];
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for the given day" });
    }
    res.status(200).json(schedule);
  });

router.post("/createBus", async (req, res) => {
    const { day, start, destination, status, count, capacity, time } = req.body;
  
    const today = await Days.findOne({ name: day });
  
    if (!today) {
      return res.status(404).json({ message: "Day not found" });
    }
  
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
  

//Only Admin
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json({message:"welcome admin"});
});
// router.get("/generateQR",verifyToken,authorizeRoles("admin","user"), async (req, res) => {
//     try {
//       const rollNo = req.query.rollNo;
  
//       if (!rollNo) {
//         return res.send({ success: false, message: "Roll number is required" });
//       }
  
//       // Generate QR code with just the roll number
//       const qrCodeImage = await QRCode.toDataURL(rollNo);
  
//       return res.send(`<img src="${qrCodeImage}" alt="QR Code" />`);
//     } catch (err) {
//       console.log("Error generating QR code", err.message);
//       return res.send({ success: false, message: `Error: ${err.message}` });
//     }
//   }
// );
// ... existing imports ...
import QRCode from 'qrcode';
import Day from '../models/busModel.js';

// ... existing code ...

// Add this new route for generating QR code
router.get("/generateBusQR", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { day, busId } = req.query;

    if (!day || !busId) {
      return res.status(400).json({ success: false, message: "Day and bus ID are required" });
    }

    const daySchedule = await Day.findOne({ name: day });
    if (!daySchedule) {
      return res.status(404).json({ success: false, message: "Day not found" });
    }

    const bus = daySchedule.buses.id(busId);
    if (!bus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    const qrData = JSON.stringify({ day, busId });
    const qrCodeImage = await QRCode.toDataURL(qrData);

    return res.json({ success: true, qrCode: qrCodeImage });
  } catch (err) {
    console.log("Error generating QR code", err.message);
    return res.status(500).json({ success: false, message: `Error: ${err.message}` });
  }
});

// Add this new route for scanning QR code
// Scan QR code route
router.post("/scanBusQR", async (req, res) => {
  try {
    const { day, busId } = req.body.qrData; // qrData is already an object
    
    // Find the schedule for the day
    const daySchedule = await Day.findOne({ name: day });
    if (!daySchedule) {
      return res.status(404).json({ success: false, message: "Day not found" });
    }

    // Find the bus by busId
    const bus = daySchedule.buses.find(b => b.id.toString() === busId);
    if (!bus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    // Check if the bus is full
    if (bus.count >= bus.capacity) {
      return res.status(400).json({ success: false, message: "Bus is full" });
    }

    // Increment the bus count
    bus.count += 1;
    await daySchedule.save();

    return res.json({ success: true, message: "Bus count increased successfully", updatedBus: bus });
  } catch (err) {
    console.log("Error scanning QR code", err.message);
    return res.status(500).json({ success: false, message: `Error: ${err.message}` });
  }
});

import { getCurrentDay } from '../utils/dateUtils.js';

// Get individual bus route
router.get("/bus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching bus with id:", id);
    
    const day = getCurrentDay(); // You'll need to implement this function
    console.log("Current day:", day);
    
    const daySchedule = await Day.findOne({ name: day });
    if (!daySchedule) {
      console.log("Day schedule not found for:", day);
      return res.status(404).json({ success: false, message: "Day not found" });
    }
    console.log("Day schedule found:", daySchedule);
    
    const bus = daySchedule.buses.find(b => b.id.toString() === id);
    if (!bus) {
      console.log("Bus not found with id:", id);
      return res.status(404).json({ success: false, message: "Bus not found" });
    }
    console.log("Bus found:", bus);
    
    res.json(bus);
  } catch (error) {
    console.error("Error fetching bus data:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// status update wala route 
router.patch('/api/buses/:id/status', (req, res) => {
  const busId = req.params.id;
  const status = req.body.status;

  
  Bus.findByIdAndUpdate(busId, { status }, (err, bus) => {
    if (err) {
      res.status(500).send({ message: 'Error updating bus status' });
    } else {
      res.send({ message: 'Bus status updated successfully' });
    }
  });
});


export default router;