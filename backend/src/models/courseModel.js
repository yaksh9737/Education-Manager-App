// models/Course.js
const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the teacher (User model)
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to students enrolled in the course
    },
  ],
  grades: [GradeSchema], // Add grades to the course schema
});

module.exports = mongoose.model("Course", CourseSchema);
