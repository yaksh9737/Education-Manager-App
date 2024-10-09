import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import CustomButton from "../components/Sidebar/Customs/CustomButton";

const CreateTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Form validation state
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Function to handle form submission
  const handleCreateTeacher = async (e) => {
    e.preventDefault();

    // Basic validation checks
    if (!name) {
      setValidationErrors((prev) => ({ ...prev, name: "Name is required." }));
      return;
    }

    if (!validateEmail(email)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Invalid email format.",
      }));
      return;
    }

    if (password.length < 6) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    try {
      await api.post("/users/create-teacher", { name, email, password });
      setSuccess("Teacher created successfully");
      setError(null);
      navigate("/teachers"); // Redirect to the list of teachers
    } catch (err) {
      setError("Failed to create teacher");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">
          Create Teacher
        </h2>

        {/* Show success or error messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleCreateTeacher}>
          {/* Name input */}
          <div className="mb-4">
            <label className="block text-gray-400">Name</label>
            <input
              type="text"
              placeholder="Enter teacher's name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setValidationErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.name ? "border-red-500" : "border-gray-600"
              } bg-gray-800 rounded mt-2 text-white`}
              required
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter teacher's email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.email ? "border-red-500" : "border-gray-600"
              } bg-gray-800 rounded mt-2 text-white`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter password (min 6 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.password ? "border-red-500" : "border-gray-600"
              } bg-gray-800 rounded mt-2 text-white`}
              required
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          <CustomButton
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Create Teacher
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacher;
