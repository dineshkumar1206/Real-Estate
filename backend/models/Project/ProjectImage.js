const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const ProjectImage = sequelize.define(
  "ProjectImage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Projects",
        key: "id",
      },
    },
    data: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    alt: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "ProjectImages",
    indexes: [
      {
        fields: ["projectId"],
        name: "project_images_project_id_idx",
      },
    ],
  }
);

module.exports = ProjectImage;
