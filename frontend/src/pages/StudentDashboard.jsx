import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Student Dashboard, {user.name}!
      </h1>
      <p className="text-lg">
        Use the sidebar to view your enrolled courses, assignments, and grades.
      </p>
    </div>
  );
};

export default StudentDashboard;