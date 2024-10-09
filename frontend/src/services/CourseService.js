import api from "../api/api";

export const fetchCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post("/courses", courseData);
  return response.data;
};

const fetchEnrolledCourses = async () => {
  try {
    const { data } = await api.get("/courses/student/enrolled");
    setCourses(data);
  } catch (error) {
    console.error("Failed to fetch enrolled courses", error);
  }
};

const fetchCourseGrades = async (courseId) => {
  try {
    const { data } = await api.get(`/courses/${courseId}/student/grades`);
    setGrades(data);
  } catch (error) {
    console.error("Failed to fetch grades", error);
  }
};
