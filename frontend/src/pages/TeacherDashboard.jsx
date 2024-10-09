import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-500 text-lg">Today is {currentDate}</p>
        <p className="text-lg mt-4">
          Manage your courses, view students, and stay updated on all your
          teaching activities from here.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Dashboard Tips</h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li>Keep track of your course progress and deadlines.</li>
          <li>Review and give feedback on students' assignments.</li>
          <li>Stay updated with the latest announcements and events.</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
