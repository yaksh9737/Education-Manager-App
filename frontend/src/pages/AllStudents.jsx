import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/users/students");
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return <p className="text-center text-gray-400">Loading students...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-12 bg-gray-900 min-h-screen text-gray-200">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">
        All Students
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition-colors duration-300`}
              >
                <td className="px-6 py-4 text-center text-white">{index + 1}</td>
                <td className="px-6 py-4 text-white font-medium">
                  {student.name}
                </td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4 text-green-400">{student.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudents;
