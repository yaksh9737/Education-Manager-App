import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import CustomButton from "../components/Sidebar/Customs/CustomButton";

const EditCourse = () => {
  const { id } = useParams(); // Get course ID from the route
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    teacher: "", // This should hold the teacher ID
  });

  const [teachers, setTeachers] = useState([]); // State to store all available teachers
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(""); // State to manage errors

  // Fetch available teachers for the teacher dropdown
  const fetchTeachers = async () => {
    try {
      const response = await api.get("/users/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Failed to fetch teachers", error);
      setError("Failed to fetch teachers.");
    }
  };

  // Fetch the course details for editing
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse({
          title: response.data.title || "",
          description: response.data.description || "",
          startDate: new Date(response.data.startDate)
            .toISOString()
            .split("T")[0],
          endDate: new Date(response.data.endDate).toISOString().split("T")[0],
          teacher: response.data.teacher?._id || "", // Set teacher ID if it exists
        });
        setLoading(false); // Set loading to false after data is loaded
      } catch (error) {
        console.error("Failed to load course", error);
        setError("Failed to load course.");
      }
    };
    fetchCourse();
    fetchTeachers(); // Fetch the teachers to populate the dropdown
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for updating the course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/courses/${id}`, course);
      alert("Course updated successfully");
      navigate("/courses");
    } catch (error) {
      console.error("Failed to update course", error);
      setError("Failed to update course.");
    }
  };

  if (loading) {
    return <div className="text-white">Loading course data...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-4">Edit Course</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Show errors if any */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mt-2 text-white placeholder-gray-400 focus:ring focus:ring-blue-600"
              placeholder="Enter course title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block">Description</label>
            <input
              type="text"
              name="description"
              value={course.description}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mt-2 text-white placeholder-gray-400 focus:ring focus:ring-blue-600"
              placeholder="Enter course description"
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={course.startDate}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mt-2 text-white placeholder-gray-400 focus:ring focus:ring-blue-600"
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block">End Date</label>
            <input
              type="date"
              name="endDate"
              value={course.endDate}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mt-2 text-white placeholder-gray-400 focus:ring focus:ring-blue-600"
              required
            />
          </div>

          {/* Teacher Dropdown */}
          <div className="mb-4">
            <label className="block">Teacher</label>
            <select
              name="teacher"
              value={course.teacher}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded mt-2 text-white placeholder-gray-400 focus:ring focus:ring-blue-600"
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <CustomButton
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Update Course
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
