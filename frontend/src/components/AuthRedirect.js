import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthRedirect = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader
  }

  // If the user is logged in, redirect based on their role
  if (user) {
    const rolePath = `/${user.role.toLowerCase()}`;
    return <Navigate to={rolePath} />;
  }

  // If no user is logged in, show the children (login/register pages)
  return children;
};

export default AuthRedirect;
