// routes/userRoutes.js
const express = require("express");
const {
  register,
  login,
  getUserProfile,
  createTeacher,
  fetchAllTeachers,
  fetchAllStudents,
} = require("../controllers/userController");
const {
  protect,
  admin,
  adminOrTeacher,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", protect, getUserProfile);

// Admin routes
router.post("/create-teacher", protect, admin, createTeacher); // Only admin can create teachers

// Fetch all teachers (Admin only)
router.get("/teachers", protect, admin, fetchAllTeachers);

// Fetch all students (Admin and Teacher only)
router.get("/students", protect, adminOrTeacher, fetchAllStudents);
module.exports = router;
