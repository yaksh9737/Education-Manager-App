// Sidebar.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './Sidebar.css';

import {
  FaChalkboardTeacher,
  FaBook,
  FaSignOutAlt,
  FaUser,
  FaUserGraduate,
  FaTachometerAlt,
} from "react-icons/fa"; // Import icons
import SidebarLink from "./SidebarLink";
import SidebarDropdown from "./SidebarDropdown";

const Sidebar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 sidebar text-gray-100 h-screen w-64 p-6 flex flex-col ">
      <h1 className="text-2xl font-bold mb-8">EMA Dashboard</h1>

      {user ? (
        <div className="flex-1 overflow-y-auto">
          {/* User Info */}
          <div className="mb-6">
            <p className="flex items-center text-sm font-medium">
              <FaUser className="mr-2 w-4 h-4" /> Hello, {user.name}
            </p>
          </div>

          {/* Dashboard Link */}
          <div className="mb-6">
            <SidebarLink to="/" icon={FaTachometerAlt}>
              Dashboard
            </SidebarLink>
          </div>

          {/* Conditional Dropdowns based on Role */}
          {user.role === "Admin" && (
            <div className="mb-6">
              <SidebarDropdown
                title="Manage Teacher"
                icon={FaChalkboardTeacher}
                links={[
                  { to: "/create-teacher", label: "Create Teacher" },
                  { to: "/teachers", label: "See All Teachers" },
                ]}
              />
              <SidebarDropdown
                title="Manage Course"
                icon={FaBook}
                links={[
                  { to: "/create-course", label: "Create Course" },
                  { to: "/courses", label: "See All Courses" },
                ]}
              />
              <SidebarDropdown
                title="Manage Student"
                icon={FaUserGraduate}
                links={[
                  { to: "/students", label: "See All Students" },
                  { to: "/enroll-student", label: "Enroll Student in Course" },
                ]}
              />
            </div>
          )}

          {user.role === "Teacher" && (
            <div className="mb-6">
              <SidebarDropdown
                title="Assigned Courses"
                icon={FaBook}
                links={[
                  { to: "/assigned-courses", label: "View Assigned Courses" },
                ]}
              />
              <SidebarDropdown
                title="Manage Student"
                icon={FaUserGraduate}
                links={[
                  { to: "/students", label: "See All Students" },
                ]}
              />
            </div>
          )}

          {user.role === "Student" && (
            <div className="mb-6">
              <SidebarDropdown
                title="All Courses"
                icon={FaBook}
                links={[
                  { to: "/all-courses", label: "Enroll in Courses" },
                ]}
              />
              <SidebarDropdown
                title="Enrolled Courses"
                icon={FaUserGraduate}
                links={[
                  { to: "/enrolled-courses", label: "See Your Enrolled Courses" },
                ]}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {/* Login and Register Links */}
          <SidebarLink to="/login" icon={FaSignOutAlt}>
            Login
          </SidebarLink>
          <SidebarLink to="/register" icon={FaSignOutAlt}>
            Register
          </SidebarLink>
        </div>
      )}

      {/* Logout Button */}
      {user && (
        <button
          onClick={handleLogout}
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-100 py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
          aria-label="Logout"
        >
          <FaSignOutAlt className="mr-2 w-4 h-4" /> Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
