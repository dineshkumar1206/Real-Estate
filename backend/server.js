const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const sequelize = require("./config/db");
const AdminAuth = require("./models/AdminAuth/adminAuth"); 
const Project = require("./models/Project/projectModel"); 
const adminRoutes = require("./routes/AdminAuth/AdminRoutes"); // ⬅️ IMPORT ROUTES
const inquiryRoutes = require("./routes/Inquiry/inquiryRoutes");
const projectRoutes = require("./routes/Project/projectRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://real-estate-alpha-sand-38.vercel.app"
    ], 
    credentials: true,
  })
);

// ⬅️ ATTACH ROUTES UNDER /api/auth
app.use("/connectyou-api/api/auth", adminRoutes);
app.use("/connectyou-api/api/inquiry", inquiryRoutes);
app.use("/connectyou-api/api/projects", projectRoutes);

app.get("/connectyou-api/api", (req, res) => {
  res.send("ConnectYou RealEstate Backend is running flawlessly!");
});

// 🔍 Database Connection Diagnostic Route
app.get("/connectyou-api/api/db-check", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "connected",
      message: "Database connection has been established successfully.",
      config: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to connect to the database",
      error: error.message,
      config: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
      }
    });
  }
});

const PORT = process.env.PORT || 5175;

sequelize
  .sync()
  .then(() => {
    console.log("🚀 Database connected & synced successfully!");
    app.listen(PORT, () => {
      console.log(`📡 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

  module.exports = app;