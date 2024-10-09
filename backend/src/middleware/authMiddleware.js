// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

exports.admin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

exports.teacher = (req, res, next) => {
  if (req.user.role !== "Teacher") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

exports.adminOrTeacher = (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "Teacher") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};