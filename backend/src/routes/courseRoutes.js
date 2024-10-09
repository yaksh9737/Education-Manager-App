// routes/courseRoutes.js
const express = require("express");
const {
  protect,
  admin,
  teacher,
  adminOrTeacher,
} = require("../middleware/authMiddleware");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  enrollInCourse,
  removeStudentFromCourse,
  assignGrade, // New function to assign grades
  getGrades,
  getCourseById,
  getCoursesForTeacher,
  getEnrolledCourses,
  getGradesByCourse,
  enrollStudentInCourse, // New function to get student's grades
} = require("../controllers/courseController");

const router = express.Router();

// Admin and Teacher routes
router.post("/", protect, admin, createCourse); // Admin creates courses
router.put("/:id", protect, adminOrTeacher, updateCourse); // Admin or Teacher updates courses
router.delete("/:id", protect, admin, deleteCourse); // Admin deletes courses

// Public route (students can view all courses)
router.get("/", protect, getAllCourses);

// Student enrolls in a course
router.post("/:id/enroll", protect, enrollInCourse); // Student enrolls in a course

// routes/courseRoutes.js
router.get("/:id", protect, getCourseById); // Make sure this route exists and matches the frontend request

// Admin removes a student from a course
router.delete(
  "/:courseId/remove-student/:studentId",
  protect,
  removeStudentFromCourse
); // Admin removes a student

// Teacher assigns grades to students
router.post("/:courseId/assign-grade", protect, teacher, assignGrade); // Only teachers can assign grades

// Students view their grades
router.get("/:courseId/grades", protect, getGrades); // Only students can view their own grades

// Fetch courses assigned to the logged-in teacher
router.get("/teacher/courses", protect, teacher, getCoursesForTeacher);

// Route for students to view their enrolled courses
router.get("/student/enrolled", protect, getEnrolledCourses);

// Route for students to view their grades for a specific course
router.get("/:courseId/student/grades", protect, getGradesByCourse);

router.post("/:id/enroll-student", protect, admin, enrollStudentInCourse);
module.exports = router;
