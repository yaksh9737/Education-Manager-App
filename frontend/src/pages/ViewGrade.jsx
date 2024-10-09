import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const ViewGrade = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const { data } = await api.get(`/courses/${courseId}/student/grades`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGrade(data);
      } catch (error) {
        setError("Grade not assigned by teacher.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrade();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700 transition-all transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">
          Your Grade
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-400 animate-pulse">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : grade ? (
          <div className="bg-gray-700 shadow-lg rounded-lg p-6 border border-blue-500 hover:border-blue-400 transition-all duration-300">
            <p className="text-2xl text-center font-semibold text-green-400">
              Grade: {grade.grade} marks
            </p>
            {/* Pass/Fail message */}
            {grade.grade > 35 ? (
              <p className="text-xl text-center font-bold text-green-400 mt-4">
                Congratulations, you're pass!
              </p>
            ) : (
              <p className="text-xl text-center font-bold text-red-500 mt-4">
                You're fail
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-400">
            Grade not yet assigned.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewGrade;
