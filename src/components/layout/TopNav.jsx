// src/components/layout/TopNav.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { clearAuth } from "../../utils/authStorage";

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeView = location.pathname === "/orders"
    ? "orders"
    : location.pathname === "/customers"
      ? "customers"
      : "pos";

  function handleLogout() {
    clearAuth();           // remove access token
    navigate("/login");    // redirect to login
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-black text-white shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/web-logo-gold.webp"
          alt="Aanyasri POS"
          className="h-10 w-auto object-contain"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <span className="font-bold text-lg tracking-wide hidden text-yellow-500">Aanyasri POS</span>
      </div>

      {/* Center - Navigation */}
      <div className="flex gap-4 text-xs font-medium">
        <button
          className={`px-5 py-2 rounded-full transition-all duration-200 border ${activeView === "pos"
            ? "bg-white text-black border-white shadow-sm"
            : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white"
            }`}
          onClick={() => navigate("/")}
        >
          Billing
        </button>

        <button
          className={`px-5 py-2 rounded-full transition-all duration-200 border ${activeView === "orders"
            ? "bg-white text-black border-white shadow-sm"
            : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white"
            }`}
          onClick={() => navigate("/orders")}
        >
          Orders
        </button>

        <button
          className={`px-5 py-2 rounded-full transition-all duration-200 border ${activeView === "customers"
            ? "bg-white text-black border-white shadow-sm"
            : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white"
            }`}
          onClick={() => navigate("/customers")}
        >
          Customers
        </button>
      </div>

      {/* Right - Logout */}
      <button
        onClick={handleLogout}
        className="text-xs px-5 py-2 rounded-full border border-gray-800 bg-gray-900 text-gray-300 hover:bg-red-900 hover:text-red-100 hover:border-red-900 transition-colors"
      >
        Logout
      </button>
    </header>
  );
}
