const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/Project/projectController");
const { AdminAuthProtect } = require("../../middlewares/AdminAuthMiddleware/AdminMiddleware");
const { handleImageUpload } = require("../../middlewares/multerMiddleware");

// Public routes
router.get("/", projectController.getAllProjects);
router.get("/route/:routePath", projectController.getProjectByRoute);

// Protected admin routes
router.post("/", AdminAuthProtect, handleImageUpload, projectController.createProject);
router.put("/:id", AdminAuthProtect, handleImageUpload, projectController.updateProject);
router.delete("/:id", AdminAuthProtect, projectController.deleteProject);

module.exports = router;
