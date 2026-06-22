const express = require("express");
const { registerAdmin, loginAdmin, logoutAdmin, getMeAdmin } = require("../../controllers/AdminAuthController/AdminController");
const { AdminAuthProtect } = require("../../middlewares/AdminAuthMiddleware/AdminMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", AdminAuthProtect, getMeAdmin);

module.exports = router;