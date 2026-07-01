const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/Project/projectController");
const { AdminAuthProtect } = require("../../middlewares/AdminAuthMiddleware/AdminMiddleware");
const { upload } = require("../../config/cloudinary");

// Configure Multer to accept single image card cover and multiple gallery images
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "carouselImagesFiles", maxCount: 15 },
]);

// Public routes
router.get("/", projectController.getAllProjects);
router.get("/route/:routePath", projectController.getProjectByRoute);

// Protected admin routes
router.post("/", AdminAuthProtect, uploadFields, projectController.createProject);
router.put("/:id", AdminAuthProtect, uploadFields, projectController.updateProject);
router.delete("/:id", AdminAuthProtect, projectController.deleteProject);

module.exports = router;
