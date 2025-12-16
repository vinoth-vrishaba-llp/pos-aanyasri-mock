// src/components/layout/TopNav.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { clearAuth } from "../../utils/authStorage";

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeView = location.pathname === "/orders" ? "orders" : "pos";

  function handleLogout() {
    clearAuth();           // remove access token
    navigate("/login");    // redirect to login
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
      {/* Left */}
      <div className="font-semibold text-sm">
        Aanyasri POS
      </div>

      {/* Center */}
      <div className="flex gap-2 text-xs">
        <button
          className={`px-3 py-1 rounded-full border ${activeView === "pos"
            ? "bg-black text-white border-black"
            : "bg-white text-gray-700 border-gray-300 hover:border-black"
            }`}
          onClick={() => navigate("/")}
        >
          Billing
        </button>

        <button
          className={`px-3 py-1 rounded-full border ${activeView === "orders"
            ? "bg-black text-white border-black"
            : "bg-white text-gray-700 border-gray-300 hover:border-black"
            }`}
          onClick={() => navigate("/orders")}
        >
          Orders
        </button>
      </div>

      {/* Right */}
      <button
        onClick={handleLogout}
        className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </header>
  );
}
