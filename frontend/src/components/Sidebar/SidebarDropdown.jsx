// SidebarDropdown.jsx
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const SidebarDropdown = ({ title, icon: Icon, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if current path matches any link
  const isAnyLinkActive = links.some((link) =>
    location.pathname.startsWith(link.to)
  );

  // Open the dropdown if any link is active
  React.useEffect(() => {
    if (isAnyLinkActive) {
      setIsOpen(true);
    }
  }, [isAnyLinkActive]);

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-left text-blue-400 hover:bg-blue-500 hover:text-gray-100 rounded-lg focus:outline-none transition-colors duration-200"
      >
        <div className="flex items-center">
          {Icon && <Icon className="w-5 h-5 mr-3" />}
          {title}
        </div>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {isOpen && (
        <div className="ml-8 mt-2 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium rounded-lg
                ${
                  isActive
                    ? "bg-blue-600 text-gray-100"
                    : "text-blue-400 hover:bg-blue-500 hover:text-gray-100"
                }
                transition-colors duration-200`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
