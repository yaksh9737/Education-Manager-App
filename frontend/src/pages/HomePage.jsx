// src/pages/HomePage.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "Teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Education Management System
      </h1>
      <p className="text-lg text-center mb-4">
        We're excited to have you on board! Here, you can manage courses,
        enroll students, and much more.
      </p>
      <p className="text-lg text-center">
        Please select your role to get started.
      </p>
    </div>
  );
};

export default HomePage;
