const { Sequelize } = require("sequelize");
require("dotenv").config();

// Determine if we are in production based on cPanel database credentials or NODE_ENV.
// If the DB username starts with 'amigoweb_' or NODE_ENV is 'production', we use the default MySQL port 3306.
const isProduction = process.env.NODE_ENV === "production" || 
                     (process.env.DB_USER && process.env.DB_USER.startsWith("amigoweb_"));

const dbPort = isProduction ? 3306 : (process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306);

// Initialize Sequelize with credentials from the .env file
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: dbPort,
    dialect: "mysql",
    logging: false, // Turn off console logs for database queries
    charset: "utf8mb4", // Support full Unicode (₹ symbol, emojis, etc.)
    collate: "utf8mb4_unicode_ci",
  }
);

module.exports = sequelize;