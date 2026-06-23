const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const sequelize = require("./config/db");
const AdminAuth = require("./models/AdminAuth/adminAuth"); 
const adminRoutes = require("./routes/AdminAuth/AdminRoutes"); // ⬅️ IMPORT ROUTES
const inquiryRoutes = require("./routes/Inquiry/inquiryRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// ⬅️ ATTACH ROUTES UNDER /api/auth
app.use("/api/auth", adminRoutes);
app.use("/api/inquiry", inquiryRoutes);

app.get("/", (req, res) => {
  res.send("ConnectYou RealEstate Backend is running flawlessly!");
});

const PORT = process.env.PORT || 5175;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("🚀 Database connected & synced successfully!");
    app.listen(PORT, () => {
      console.log(`📡 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });