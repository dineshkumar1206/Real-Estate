const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const sequelize = require("./config/db");
const AdminAuth = require("./models/AdminAuth/adminAuth"); 
const Project = require("./models/Project/projectModel"); 
const ProjectImage = require("./models/Project/ProjectImage"); 

Project.hasMany(ProjectImage, { as: "galleryImages", foreignKey: "projectId", onDelete: "CASCADE" });
ProjectImage.belongsTo(Project, { foreignKey: "projectId", onDelete: "CASCADE" });
const adminRoutes = require("./routes/AdminAuth/AdminRoutes"); // ⬅️ IMPORT ROUTES
const inquiryRoutes = require("./routes/Inquiry/inquiryRoutes");
const projectRoutes = require("./routes/Project/projectRoutes");

const path = require("path");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://real-estate-alpha-sand-38.vercel.app",
      "https://www.connectyourealty.in",
      "https://connectyourealty.in" 
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

// 🚨 Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler Catch:", err.stack || err.message || err);
  res.status(err.status || err.statusCode || 500).json({
    success: false,
    message: err.message || "An unexpected internal server error occurred on the backend.",
  });
});

const PORT = process.env.PORT || 5175;

const mysql = require("mysql2/promise");

const ensureDatabaseExists = async () => {
  const isProduction = process.env.NODE_ENV === "production" || 
                       (process.env.DB_USER && process.env.DB_USER.startsWith("amigoweb_"));
  const dbPort = isProduction ? 3306 : (process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: dbPort,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.end();
    console.log(`✅ Checked/Created database: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("❌ Failed to ensure database exists:", error.message);
  }
};

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    console.log("⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not specified in .env. Skipping admin seeding.");
    return;
  }

  try {
    const bcrypt = require("bcrypt");
    // Find if a super_admin already exists
    let admin = await AdminAuth.findOne({ where: { role: "super_admin" } });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    if (admin) {
      // Update existing admin email & password
      admin.email = adminEmail;
      admin.password = hashedPassword;
      admin.name = "Super Admin";
      await admin.save();
      console.log("👤 Super Admin account successfully updated from .env!");
    } else {
      // Create new super_admin
      await AdminAuth.create({
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "super_admin",
        isActive: true
      });
      console.log("👤 Super Admin account successfully created from .env!");
    }
  } catch (error) {
    console.error("❌ Error seeding/updating Admin account:", error.message);
  }
};

const configureMaxAllowedPacket = async () => {
  try {
    await sequelize.query("SET GLOBAL max_allowed_packet = 104857600;");
    console.log("✅ Successfully configured database max_allowed_packet to 100MB globally!");
  } catch (error) {
    console.warn("⚠️ Warning: Could not set global max_allowed_packet. You might need to set it in cPanel/phpMyAdmin:", error.message);
  }

  try {
    await sequelize.query("ALTER TABLE Projects MODIFY COLUMN image LONGTEXT;");
    await sequelize.query("ALTER TABLE Projects MODIFY COLUMN carouselImages LONGTEXT;");
    console.log("✅ Successfully altered Projects columns to LONGTEXT!");
  } catch (error) {
    console.warn("⚠️ Warning: Could not ALTER Projects table columns to LONGTEXT. Make sure to set them to LONGTEXT manually in phpMyAdmin:", error.message);
  }
};

// Ensure DB exists first, then sync and start server
ensureDatabaseExists().then(() => {
  sequelize
    .sync({ alter: true })
    .then(async () => {
      console.log("🚀 Database connected & synced successfully!");
      await configureMaxAllowedPacket();
      await seedAdmin();
      app.listen(PORT, () => {
        console.log(`📡 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("❌ Database connection failed:", error.message);
    });
});

  module.exports = app;