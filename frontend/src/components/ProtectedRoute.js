import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Show a loading spinner or message
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if the user has one of the allowed roles (if role is an array)
  if (Array.isArray(role)) {
    if (!role.includes(user.role)) {
      return <Navigate to="/admin" />; // Or redirect to a "not authorized" page
    }
  } else if (user.role !== role) {
    // If role is a single string, compare it with user's role
    return <Navigate to="/admin" />;
  }

  // If user is authenticated and has the required role(s), render the children components
  return children;
};

export default ProtectedRoute;
