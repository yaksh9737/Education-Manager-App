// controllers/userController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register a new user as a Student by default
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Default role is Student
    const role = "Student";

    // Create new user
    const user = new User({ name, email, password, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // Return the token, id, name, and role
    res.status(200).json({
      token,
      id: user._id,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin creates a new Teacher
exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Role is explicitly set to Teacher
    const role = "Teacher";

    // Create new user with Teacher role
    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "Teacher created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch all teachers (Admin only)
exports.fetchAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "Teacher" }).select("-password");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Fetch all students (Admin or Teacher)
exports.fetchAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
