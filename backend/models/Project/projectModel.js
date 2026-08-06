const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    builder: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    possessionDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    reraId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    totalApartments: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    launchDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    config: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    features: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("features");
        try {
          return rawValue ? JSON.parse(rawValue) : [];
        } catch (e) {
          return [];
        }
      },
      set(value) {
        this.setDataValue("features", JSON.stringify(value || []));
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    imageMimeType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    imageAlt: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    carouselImages: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("carouselImages");
        try {
          return rawValue ? JSON.parse(rawValue) : [];
        } catch (e) {
          return [];
        }
      },
      set(value) {
        this.setDataValue("carouselImages", JSON.stringify(value || []));
      }
    },
    amenities: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("amenities");
        try {
          return rawValue ? JSON.parse(rawValue) : [];
        } catch (e) {
          return [];
        }
      },
      set(value) {
        this.setDataValue("amenities", JSON.stringify(value || []));
      }
    },
    projectType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "fast-moving",
    },
  },
  {
    timestamps: true,
    tableName: "Projects",
    indexes: [
      {
        unique: true,
        fields: ["route"],
        name: "project_route_unique",
      },
    ],
  }
);

module.exports = Project;
