import express from "express";
import QRCode from "qrcode";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import userModel from "./models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import RollModel from "./models/RollModel.js";
import { Server } from "socket.io";
import http from "http"

const app = express();

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://lnmiit:lnmiit@cluster0.mkoomc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("db successfully connected");
};

app.use(cors());
app.use(express.json());

dotenv.config();

const server = http.createServer(app)

const io = new Server(server, {
  cors:{
    origin: "*"
  }
})

const PORT = 8804;

connectDB();

io.on("connection" , (socket) => {
  console.log("A client connected: " , socket.id)
  socket.on("disconnect" , () => {
    console.log("client disconnected: " , socket.id)
  })
})

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
};

// app.get('/generateQR' , async (req,res) => {
//     try{
//         const url = req.query.url
//         const rollNo = req.query.rollNo

//         console.log(rollNo)
//         console.log(url)
//         const fullUrl = `${url}?rollno=${rollNo}`
//         const qrCodeImage = await QRCode.toDataURL(fullUrl)
//         return res.send(`<img src="${qrCodeImage}" alt="QR Code" />`)
//     } catch(err){
//         console.log("error generating qr code" , err.message)
//         return res.send({success: true , message: `error : ${err.message}`})
//     }
// })

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

app.post("/scanQR", async (req, res) => {
  try {
    const { rollNo } = req.body;

    if (!rollNo) {
      return res.json({ success: false, message: "Roll number is requird" });
    }

    let roll = await RollModel.findOne({ rollNo });
    if (!roll) {
      roll = new RollModel({ rollNo, count: 1 });
    } else {
      roll.count += 1;
    }
    await roll.save();

    io.emit("updateRolls" , {rollNo: roll.rollNo, count: roll.count})

    res.json({ success: true, rollNo: roll.rollNo, count: roll.count });

  } catch (err) {
    console.log("Error incrementing count", err.message);
    res.status(500).json({ success: false, message: "Error: " + err.message });
  }
});

app.post('/incrementCount', async (req, res) => {
  try {
      const { rollNo } = req.body;

      if (!rollNo) {
          return res.status(400).json({ success: false, message: "Roll number is required" });
      }

      // Find the roll number and increment the count
      let roll = await RollModel.findOne({ rollNo });
      if (!roll) {
          return res.status(404).json({ success: false, message: "Roll number not found" });
      }

      roll.count += 1;
      await roll.save();

      // Emit an event to notify all clients about the updated roll number and count
      io.emit('updateRolls', { rollNo: roll.rollNo, count: roll.count });

      res.json({ success: true, rollNo: roll.rollNo, count: roll.count });
  } catch (err) {
      console.log("Error incrementing count", err.message);
      res.status(500).json({ success: false, message: "Error: " + err.message });
  }
});

app.get("/rolls", async (req, res) => {
  try {
    const rolls = await RollModel.find({});
    res.json({ success: true, data: rolls });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
});

app.post("/register", async (req, res) => {
  const { name, rollNo, password } = req.body;
  try {
    const exist = await userModel.findOne({ rollNo });
    if (exist) {
      return res.json({ success: false, message: "user already exist" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      rollNo: rollNo,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { rollNo, password } = req.body;
  try {
    const user = await userModel.findOne({ rollNo });
    if (!user) {
      res.json({ success: false, message: "user does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json({ success: false, message: "invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token, name: user.name });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: "error" });
  }
});

server.listen(PORT, () => {
  console.log(`Sever started at ${PORT}`);
});
