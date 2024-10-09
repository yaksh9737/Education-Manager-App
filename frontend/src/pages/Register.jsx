import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";
import CustomButton from "../components/Sidebar/Customs/CustomButton";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 3) {
      errors.password = "Password must be at least 3 characters long";
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await registerUser({ name, email, password });
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError("Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setValidationErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.name ? "border-red-500" : "border-gray-600"
              } rounded mt-2 bg-gray-700 text-white`}
              required
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.email ? "border-red-500" : "border-gray-600"
              } rounded mt-2 bg-gray-700 text-white`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password (min 3 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.password ? "border-red-500" : "border-gray-600"
              } rounded mt-2 bg-gray-700 text-white`}
              required
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>
          {/* Submit Button */}
          <CustomButton
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register here
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
