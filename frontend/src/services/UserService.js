import api from "../api/api";

// Existing functions

export const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const fetchTeachers = async () => {
  const response = await api.get("/users/teachers");
  return response.data;
};

export const fetchStudents = async () => {
  const response = await api.get("/users/students");
  return response.data;
};

// Add this function to fetch the logged-in user's profile
export const getUserProfile = async () => {
  const response = await api.get("/users/profile"); // Assuming this is the route for user profile
  return response.data;
};
