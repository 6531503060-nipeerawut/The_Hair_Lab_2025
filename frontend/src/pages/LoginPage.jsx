import React, { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- Import useAuth

export default function LoginPage() {
  const { login } = useAuth(); // <-- Use the hook
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // <-- Correctly capture password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email || !password) {
      return setError("Please fill in all fields.");
    }

    setLoading(true);
    try {
      await login(email, password);
      // Success!
      // The onAuthStateChanged listener in AuthContext will now
      // fetch user data, set isAdmin, etc.

      // We can navigate to a default "user" page.
      // If they are an admin, your <AdminRoutes> will
      // automatically redirect them to the admin dashboard.
      nav("/");

    } catch (err)
    {
      // Handle Firebase auth errors (e.g., "auth/wrong-password")
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password.");
      } else {
        setError("Failed to log in. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error message display */}
          {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-600 mt-4">
            Need an account?{" "}
            <span
                className="text-purple-600 font-semibold cursor-pointer hover:underline"
                onClick={() => nav("/user/register")}
            >
            Register here
          </span>
          </p>

          {/* We remove the "Login as Admin" button.
            The system will handle role detection automatically. */}
        </form>
      </div>
  );
}