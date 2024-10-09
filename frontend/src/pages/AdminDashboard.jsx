import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">
          Welcome to Our School
        </h1>
        <p className="text-center text-lg text-gray-300 mb-6">
          A place where learning meets innovation.
        </p>
      </div>

      {/* Vision Section without Card */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">
          Our Vision
        </h2>
        <p className="text-gray-300 text-justify">
          Our vision is to be a beacon of excellence in education, nurturing
          young minds to become future leaders. We strive to create a nurturing
          environment that fosters curiosity, creativity, and critical thinking.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
