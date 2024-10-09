import React, { useEffect, useState } from "react";
import api from "../api/api";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/users/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers");
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-900 min-h-screen text-gray-200">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">
        All Teachers
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th className="px-6 py-3 border-b border-gray-700">#</th>
              <th className="px-6 py-3 border-b border-gray-700">Name</th>
              <th className="px-6 py-3 border-b border-gray-700">Email</th>
              <th className="px-6 py-3 border-b border-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition-colors duration-300`}
              >
                <td className="px-6 py-4 border-b border-gray-700 text-center text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-b border-gray-700 font-medium text-white">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-700 text-gray-400">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-700 text-green-400">
                  Teacher
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeachers;
