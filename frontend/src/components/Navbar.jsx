import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Scissors, LogOut, User, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // <-- 1. Use our hook

export default function Navbar() {
  // 2. Get the REAL data and functions from our hook
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/user/login"); // Redirect to login after logout
    } catch (err) {
      console.error("Failed to log out:", err);
      alert("Failed to log out.");
    }
  };

  return (
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="text-purple-600 w-6 h-6" />
            <span className="font-bold text-xl text-purple-600">The Hair Lab</span>
          </Link>

          <div className="flex gap-4 items-center font-medium">
            {/* 3. This logic is now connected to Firebase */}
            {!isLoggedIn && (
                <Link
                    to="/user/login"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Login
                </Link>
            )}

            {isLoggedIn && !isAdmin && (
                <>
                  <Link to="/user/booking">Booking</Link>
                  <Link to="/user/bookings">My Bookings</Link>
                  <Link to="/user/profile" className="flex items-center gap-1">
                    <User size={18} /> Profile
                  </Link>
                  <button
                      onClick={handleLogout} // <-- 4. Use the async logout
                      className="text-red-600 flex items-center gap-1"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
            )}

            {isAdmin && (
                <>
                  <Link to="/admin/dashboard" className="flex items-center gap-1">
                    <BarChart3 size={18} /> Dashboard
                  </Link>
                  <Link to="/admin/bookings">Bookings</Link>
                  <button
                      onClick={handleLogout} // <-- 4. Use the async logout
                      className="text-red-600 flex items-center gap-1"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
            )}
          </div>
        </div>
      </nav>
  );
}