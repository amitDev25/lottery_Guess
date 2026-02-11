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

        {/* 🔷 Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
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
          className="md:hidden text-gray-600 focus:outline-none transition-transform duration-500"
        >
          <span
            className={`inline-block transform transition-transform duration-300 ${
              open ? "rotate-90" : ""
            }`}
          >
            ☰
          </span>
        </button>
      </div>

      {/* 📱 Mobile Menu (Animated) */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-500
          ease-in-out
          ${open ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
        `}
      >
        <div className="bg-white border-t">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 border-b transition ${
                location.pathname === item.path
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
