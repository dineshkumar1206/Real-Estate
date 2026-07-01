const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminAuth = require("../../models/AdminAuth/adminAuth");

const JWT_SECRET = process.env.JWT_SECRET;
const isProd = process.env.NODE_ENV === "production" || 
               (process.env.DB_USER && process.env.DB_USER.startsWith("amigoweb_"));

const COOKIE_OPTIONS = {
  httpOnly: true, // Prevents client-side scripts from reading the cookie
  secure: isProd, 
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};

// 1. Admin Register
exports.registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all required fields." });
  }

  try {
    const adminExists = await AdminAuth.findOne({ where: { email } });
    if (adminExists) {
      return res.status(400).json({ message: "This email address is already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await AdminAuth.create({
      name,
      email,
      password: hashedPassword,
      role: role || "moderator",
    });

    const token = generateToken(admin.id);
    res.cookie("admin_jwt", token, COOKIE_OPTIONS);

    res.status(201).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      message: "Admin registered successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

// 2. Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const admin = await AdminAuth.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(admin.id);
    res.cookie("admin_jwt", token, COOKIE_OPTIONS);

    res.status(200).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      message: "Logged in successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get Me Admin
exports.getMeAdmin = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  res.status(200).json({
    id: req.admin.id,
    name: req.admin.name,
    email: req.admin.email,
    role: req.admin.role,
  });
};

// 4. Admin Logout
exports.logoutAdmin = (req, res) => {
  const isProd = process.env.NODE_ENV === "production" || 
                 (process.env.DB_USER && process.env.DB_USER.startsWith("amigoweb_"));

  res.clearCookie("admin_jwt", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  res.status(200).json({ success: true, message: "Logged out successfully." });
};