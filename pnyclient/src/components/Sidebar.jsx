import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Get initial state from localStorage
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: "Users", icon: "👥", path: "/dashboard/users" },
    { label: "Products", icon: "📦", path: "/dashboard/products" },
    { label: "Orders", icon: "🛒", path: "/dashboard" },
  ];

  return (
    <div
      className={`bg-gradient-to-b from-blue-600 to-blue-800 h-screen shadow-lg text-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } p-4 space-y-6 flex flex-col`}
    >
      {/* Header with Toggle Button */}
      <div className="flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-white">Management</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-blue-500 rounded-lg transition"
        >
          {isCollapsed ? (
            <FaChevronRight size={20} />
          ) : (
            <FaChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                isActive(item.path)
                  ? "bg-white text-blue-600 font-semibold shadow-md"
                  : "hover:bg-blue-500 text-white"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
