require("dotenv").config();

const express = require("express");
const cors = require("cors");
const openDatabase = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[24CS039] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    student: "Jainam Khetani",
    studentId: "24CS039",
    message: "Full-stack Task API is running"
  });
});

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    studentId: "24CS039",
    error: "Endpoint not found"
  });
});

app.use(errorHandler);

async function start() {
  try {
    await openDatabase();

    app.listen(PORT, () => {
      console.log("======================================");
      console.log("AWDF Practical 6 Backend");
      console.log("Student: Jainam Khetani");
      console.log("ID: 24CS039");
      console.log("MongoDB connected");
      console.log(`API: http://localhost:${PORT}`);
      console.log("======================================");
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

start();
