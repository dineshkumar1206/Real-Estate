const jwt = require("jsonwebtoken");
const AdminAuth = require("../../models/AdminAuth/adminAuth");

const JWT_SECRET = process.env.JWT_SECRET;

exports.AdminAuthProtect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.admin_jwt) {
    token = req.cookies.admin_jwt;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized. Token is missing." });
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    req.admin = await AdminAuth.findByPk(decode.id, {
      attributes: { exclude: ["password"] },
    });

    if (!req.admin) {
      return res.status(401).json({ message: "Admin not found." });
    }

    next(); // Pass control to the controller function
  } catch (error) {
    console.error("Verification Error:", error.message);
    return res.status(401).json({ message: "Not authorized. Token is invalid or expired." });
  }
};