const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize with credentials from the .env file
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,   //on live this should be there only on local
    dialect: "mysql",
    logging: false, // Turn off console logs for database queries
  }
);

module.exports = sequelize;