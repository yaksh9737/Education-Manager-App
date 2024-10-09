import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/courses/${courseId}`);
        setCourses(courses.filter((course) => course._id !== courseId));
        alert("Course deleted successfully");
      } catch (error) {
        console.error("Failed to delete course", error);
        alert("Failed to delete course");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-12 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
        All Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 transition-all transform hover:scale-105 hover:bg-gray-700 hover:shadow-2xl duration-300"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                {course.title}
              </h2>
              <p className="text-gray-400 mb-6">{course.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Start Date:</strong>{" "}
                {new Date(course.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>End Date:</strong>{" "}
                {new Date(course.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Teacher:</strong>{" "}
                {course.teacher?.name || "Not assigned"}
              </p>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleEdit(course._id)}
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 hover:scale-105 transition-transform duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-transform duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
