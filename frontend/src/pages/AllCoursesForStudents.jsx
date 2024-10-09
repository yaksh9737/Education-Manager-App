import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const AllCoursesForStudents = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses"); // Fetch all courses
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await api.get("/courses/student/enrolled");
        setEnrolledCourses(response.data.map((course) => course._id)); // Ensure the data is mapped correctly
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("No courses enrolled yet");
        } else {
          console.error("Failed to fetch enrolled courses", error);
        }
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
    setLoading(false);
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`); // Enroll student in the course
      setEnrolledCourses([...enrolledCourses, courseId]); // Add course to the enrolled list
      alert("You have successfully enrolled in the course.");
    } catch (error) {
      console.error("Failed to enroll in course", error);
      alert("Failed to enroll in the course.");
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading courses...</p>;
  }

  return (
    <div className="p-12 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        All Available Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length === 0 ? (
          <p className="text-center text-lg text-gray-400">
            No courses available at the moment.
          </p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {course.title}
              </h2>
              <p className="text-gray-400 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Start Date:</strong>{" "}
                {new Date(course.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>End Date:</strong>{" "}
                {new Date(course.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                <strong>Teacher:</strong> {course.teacher?.name || "Unknown"}
              </p>

              <div className="mt-4">
                {enrolledCourses.includes(course._id) ? (
                  <button
                    disabled
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Already Enrolled
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllCoursesForStudents;
