const Project = require("../../models/Project/projectModel");

// Helper to convert uploaded file buffer to Base64 data URL
const fileToBase64 = (file) => {
  if (!file || !file.buffer) return "";
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

// Helper to generate full URLs for older statically served relative paths
const getFullUrl = (req, relativePath) => {
  if (!relativePath) return "";
  if (relativePath.startsWith("data:") || relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    return relativePath;
  }
  const cleanPath = relativePath.startsWith("/") ? relativePath : "/" + relativePath;
  return `${req.protocol}://${req.get("host")}${cleanPath}`;
};

// Helper to dynamically format project images in response (supports old path fallback)
const formatProjectImages = (req, project) => {
  if (!project) return null;
  const projectJson = project.toJSON ? project.toJSON() : { ...project };
  
  if (projectJson.image) {
    projectJson.image = getFullUrl(req, projectJson.image);
  }
  
  if (Array.isArray(projectJson.carouselImages)) {
    projectJson.carouselImages = projectJson.carouselImages.map((img) => ({
      ...img,
      src: getFullUrl(req, img.src),
    }));
  }
  
  return projectJson;
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]],
    });
    const formattedProjects = projects.map((p) => formatProjectImages(req, p));
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects." });
  }
};

// Get project by route
exports.getProjectByRoute = async (req, res) => {
  try {
    const { routePath } = req.params;
    // Support route matching with or without leading slash
    const matchedRoute = routePath.startsWith("/") ? routePath : "/" + routePath;
    const project = await Project.findOne({
      where: { route: matchedRoute },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json(formatProjectImages(req, project));
  } catch (error) {
    console.error("Error fetching project by route:", error);
    res.status(500).json({ message: "Failed to fetch project details." });
  }
};

// Create new project listing
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      builder,
      location,
      route,
      price,
      status,
      possessionDate,
      reraId,
      totalApartments,
      launchDate,
      description,
      features,
      amenities,
      projectType,
      config,
      area,
    } = req.body;

    if (!title || !builder || !location || !route) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const formattedRoute = route.startsWith("/") ? route : "/" + route;

    const routeExists = await Project.findOne({ where: { route: formattedRoute } });
    if (routeExists) {
      return res.status(400).json({ message: "A project with this route already exists." });
    }

    // Set main image URL if uploaded, otherwise empty
    let mainImageUrl = "";
    if (req.files && req.files["image"] && req.files["image"][0]) {
      mainImageUrl = fileToBase64(req.files["image"][0]);
    }

    // Compile gallery image URLs
    const carouselImages = [];
    if (req.files && req.files["carouselImagesFiles"]) {
      req.files["carouselImagesFiles"].forEach((file) => {
        carouselImages.push({
          id: Date.now() + Math.random(),
          src: fileToBase64(file),
          alt: file.originalname || "Gallery image",
        });
      });
    }

    // Parse features array
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
      } catch (e) {
        parsedFeatures = features.split(",").map((f) => f.trim());
      }
    }

    // Parse amenities array
    let parsedAmenities = [];
    if (amenities) {
      try {
        parsedAmenities = typeof amenities === "string" ? JSON.parse(amenities) : amenities;
      } catch (e) {
        parsedAmenities = amenities.split(",").map((a) => a.trim());
      }
    }

    const newProject = await Project.create({
      title,
      builder,
      location,
      route: formattedRoute,
      price: price || "Price on request",
      status: status || "Under Construction",
      possessionDate,
      reraId,
      totalApartments,
      launchDate,
      description,
      features: parsedFeatures,
      amenities: parsedAmenities,
      image: mainImageUrl,
      carouselImages,
      projectType: projectType || "fast-moving",
      config: config || "",
      area: area || "",
    });

    res.status(201).json(formatProjectImages(req, newProject));
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project: " + error.message });
  }
};

// Update existing project listing
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      builder,
      location,
      route,
      price,
      status,
      possessionDate,
      reraId,
      totalApartments,
      launchDate,
      description,
      features,
      amenities,
      existingCarouselImages,
      image: existingImage,
      projectType,
      config,
      area,
    } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const formattedRoute = route ? (route.startsWith("/") ? route : "/" + route) : project.route;

    if (formattedRoute) {
      const { Op } = require("sequelize");
      const routeExists = await Project.findOne({
        where: {
          route: formattedRoute,
          id: { [Op.ne]: id }
        }
      });
      if (routeExists) {
        return res.status(400).json({ message: "A project with this route already exists." });
      }
    }

    // Main image URL resolution
    let mainImageUrl = project.image;
    if (req.files && req.files["image"] && req.files["image"][0]) {
      mainImageUrl = fileToBase64(req.files["image"][0]);
    } else if (existingImage !== undefined) {
      mainImageUrl = existingImage;
    }

    // Keep existing carousel images whose ids are present in the request
    // (the client sends ids only, so we re-attach the stored src instead of trusting the payload)
    let carouselImages = project.carouselImages || [];
    if (existingCarouselImages) {
      try {
        const sent = typeof existingCarouselImages === "string"
          ? JSON.parse(existingCarouselImages)
          : existingCarouselImages;
        const sentIds = new Set(sent.map((img) => String(img && img.id)).filter(Boolean));
        carouselImages = (project.carouselImages || []).filter((img) => sentIds.has(String(img.id)));
      } catch (e) {
        carouselImages = [];
      }
    }

    // Append new uploaded carousel images
    if (req.files && req.files["carouselImagesFiles"]) {
      req.files["carouselImagesFiles"].forEach((file) => {
        carouselImages.push({
          id: Date.now() + Math.random(),
          src: fileToBase64(file),
          alt: file.originalname || "Gallery image",
        });
      });
    }

    // Parse features
    let parsedFeatures = project.features;
    if (features) {
      try {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
      } catch (e) {
        parsedFeatures = features.split(",").map((f) => f.trim());
      }
    }

    // Parse amenities
    let parsedAmenities = project.amenities;
    if (amenities !== undefined) {
      try {
        parsedAmenities = typeof amenities === "string" ? JSON.parse(amenities) : amenities;
      } catch (e) {
        parsedAmenities = amenities.split(",").map((a) => a.trim());
      }
    }

    await project.update({
      title: title || project.title,
      builder: builder || project.builder,
      location: location || project.location,
      route: formattedRoute,
      price: price || project.price,
      status: status || project.status,
      possessionDate: possessionDate !== undefined ? possessionDate : project.possessionDate,
      reraId: reraId !== undefined ? reraId : project.reraId,
      totalApartments: totalApartments !== undefined ? totalApartments : project.totalApartments,
      launchDate: launchDate !== undefined ? launchDate : project.launchDate,
      description: description !== undefined ? description : project.description,
      features: parsedFeatures,
      amenities: parsedAmenities,
      image: mainImageUrl,
      carouselImages,
      projectType: projectType !== undefined ? projectType : project.projectType,
      config: config !== undefined ? config : project.config,
      area: area !== undefined ? area : project.area,
    });

    res.status(200).json(formatProjectImages(req, project));
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project: " + error.message });
  }
};

// Delete project listing
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project." });
  }
};
