const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const AdminAuth = sequelize.define(
  "AdminAuth",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("super_admin", "moderator", "editor"),
      defaultValue: "moderator",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "AdminAuth",
    indexes: [
      {
        unique: true,
        fields: ["email"],
        name: "admin_email_unique",
      },
    ],
  }
);

module.exports = AdminAuth;