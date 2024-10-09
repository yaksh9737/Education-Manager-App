// src/pages/EnrollStudent.jsx
import React, { useState, useEffect } from "react";
import api from "../api/api";

const EnrollStudent = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all students and courses on component mount
    const fetchData = async () => {
      try {
        const studentsResponse = await api.get("/users/students");
        setStudents(studentsResponse.data);

        const coursesResponse = await api.get("/courses");
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async () => {
    if (!selectedStudent || !selectedCourse) {
      setMessage("Please select both student and course.");
      return;
    }

    try {
      // Make API request to enroll the student in the course
      await api.post(`/courses/${selectedCourse}/enroll-student`, {
        studentId: selectedStudent,
      });

      // Set success message
      setMessage("Student enrolled successfully!");

      // Clear the dropdowns
      setSelectedStudent(""); // Reset selected student
      setSelectedCourse(""); // Reset selected course
    } catch (error) {
      setMessage("Failed to enroll student.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
        Enroll Student in Course
      </h1>

      {/* Show success or error message */}
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("successfully") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      {/* Select Student */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-300">
          Select Student
        </label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="block w-full px-4 py-2 border rounded-lg text-gray-200 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        >
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.email})
            </option>
          ))}
        </select>
      </div>

      {/* Select Course */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-300">
          Select Course
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="block w-full px-4 py-2 border rounded-lg text-gray-200 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleEnroll}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        Enroll Student
      </button>
    </div>
  );
};

export default EnrollStudent;
