import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import { AuthContext } from "../context/AuthContext";
import CustomButton from "../components/Sidebar/Customs/CustomButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Function to validate form fields
  const validateForm = () => {
    const errors = {};
    const emailPattern = /\S+@\S+\.\S+/;

    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 3) {
      errors.password = "Password must be at least 3 characters long.";
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const data = await loginUser({ email, password });

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // Set user details in the context
      setUser({
        id: data.id,
        name: data.name,
        role: data.role,
      });

      // Navigate to the dashboard based on the user's role
      navigate(`/${data.role.toLowerCase()}`);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleLogin}>
          {/* Email Field */}
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
              } rounded mt-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.password ? "border-red-500" : "border-gray-600"
              } rounded mt-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
              required
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <CustomButton
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login here
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
