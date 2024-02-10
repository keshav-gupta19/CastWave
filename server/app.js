const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const podcastRoutes = require("./routes/podcastRoutes");
dotenv.config();
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error.message);
  }
};

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
// console.log(process.env.JWT_KEY);
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
const corsConfig = {
  origin: ["https://cast-wave-keshav.vercel.app/"],
  methods: ["POST", "GET", "PUT"],
  credentials: true,
};
app.use(cors(corsConfig));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/podcast", podcastRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port 3000`);
  connectDB();
});
