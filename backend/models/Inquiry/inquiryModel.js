const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Inquiry = sequelize.define(
  "Inquiry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    formType: {
      type: DataTypes.ENUM("property_callback", "contact_page"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    // Captures which project they are on (e.g., "Lodha Group Centre Park")
    propertyName: {
      type: DataTypes.STRING(250),
      allowNull: true, 
    },
    // The fields below are marked optional so they can support Form 2 seamlessly later
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    userRole: {
      type: DataTypes.STRING(100), // e.g., "Prospective Buyer / Investor"
      allowNull: true,
    },
    projectInterest: {
      type: DataTypes.STRING(100), // e.g., "General / Other Requirements"
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically manages fields like createdAt and updatedAt
    tableName: "Inquiries",
  }
);

module.exports = Inquiry;