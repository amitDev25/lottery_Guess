import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Rank", path: "/rank" },
    { name: "Compare", path: "/compare" }
  ];

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* 🔷 Logo / Title */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600"
        >
          DN - DIRECTOR
        </Link>

        {/* 🖥 Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* 📱 Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 border-b ${
                location.pathname === item.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
