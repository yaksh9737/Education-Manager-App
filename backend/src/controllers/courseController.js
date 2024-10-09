// controllers/courseController.js
const Course = require("../models/courseModel");

// Admin creates a course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, startDate, endDate, teacher } = req.body;
    const course = new Course({
      title,
      description,
      startDate,
      endDate,
      teacher,
    });
    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Admin or Teacher can update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Admin can delete a course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Students can view all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher students");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "students",
      "name email"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Student enrolls in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    // Check if student is already enrolled
    if (!course.students.includes(req.user._id)) {
      course.students.push(req.user._id); // Add the student to the course
      await course.save();
      res
        .status(200)
        .json({ message: "Enrolled in course successfully", course });
    } else {
      res
        .status(400)
        .json({ message: "Student is already enrolled in this course" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Admin, Teacher, or Student can remove a student from the course
exports.removeStudentFromCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is either an Admin, Teacher, or the student themselves
    if (
      req.user.role === "Admin" ||
      req.user.role === "Teacher" ||
      req.user._id.toString() === req.params.studentId
    ) {
      // Remove the student from the course
      course.students = course.students.filter(
        (studentId) => studentId.toString() !== req.params.studentId
      );

      await course.save();
      return res
        .status(200)
        .json({ message: "Student removed from course", course });
    } else {
      return res
        .status(403)
        .json({ message: "You do not have permission to remove this student" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Teacher assigns a grade to a student
exports.assignGrade = async (req, res) => {
  try {
    const { studentId, grade } = req.body;
    const course = await Course.findById(req.params.courseId);

    // Check if the student is enrolled in the course
    if (!course.students.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in this course" });
    }

    // Check if the grade already exists for this student
    const existingGrade = course.grades.find(
      (g) => g.student.toString() === studentId
    );

    if (existingGrade) {
      existingGrade.grade = grade; // Update the grade if it already exists
    } else {
      course.grades.push({ student: studentId, grade }); // Add new grade
    }

    await course.save();
    res.status(200).json({ message: "Grade assigned successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Students can view their grades for a specific course
exports.getGrades = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "grades.student"
    );

    // Filter to only show the grades for the logged-in student
    const studentGrades = course.grades.filter(
      (grade) => grade.student._id.toString() === req.user._id.toString()
    );

    if (studentGrades.length === 0) {
      return res
        .status(404)
        .json({ message: "No grades found for this student" });
    }

    res.status(200).json(studentGrades);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
// Fetch courses assigned to a specific teacher
exports.getCoursesForTeacher = async (req, res) => {
  try {
    // Find courses where the teacher is the logged-in user (req.user._id)
    const courses = await Course.find({ teacher: req.user._id }).populate(
      "students"
    );

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses assigned to this teacher" });
    }

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
// Get all courses where the logged-in student is enrolled
exports.getEnrolledCourses = async (req, res) => {
  try {
    // Find courses where the current student (req.user._id) is enrolled
    const courses = await Course.find({ students: req.user._id }).populate(
      "teacher",
      "name email" // Populate teacher's name and email
    );

    if (!courses.length) {
      return res.status(404).json({ message: "No courses enrolled" });
    }

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
// Fetch specific course grade for the logged-in student
exports.getGradesByCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "grades.student",
      "name email" // Populate student info in grades
    );

    // Filter grades for the logged-in student
    const studentGrade = course.grades.find(
      (grade) => grade.student._id.toString() === req.user._id.toString()
    );

    if (!studentGrade) {
      return res
        .status(404)
        .json({ message: "No grade found for this student" });
    }

    res.status(200).json(studentGrade);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
exports.enrollStudentInCourse = async (req, res) => {
  try {
    const { studentId } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check if the student is already enrolled
    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: "Student is already enrolled." });
    }

    // Add the student to the course
    course.students.push(studentId);
    await course.save();

    res.status(200).json({ message: "Student enrolled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
