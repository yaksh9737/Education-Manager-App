// SidebarLink.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg
        ${
          isActive
            ? "bg-blue-600 text-gray-100"
            : "text-blue-400 hover:bg-blue-500 hover:text-gray-100"
        }
        transition-colors duration-200`
      }
    >
      {Icon && <Icon className="w-5 h-5 mr-3" />}
      {children}
    </NavLink>
  );
};

export default SidebarLink;
