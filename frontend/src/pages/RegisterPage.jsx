import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- Import useAuth

export default function RegisterPage() {
  const { signup } = useAuth(); // <-- Use the signup function
  const nav = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // <-- Added
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!fullname || !email || !password || !phone || !confirmPassword) {
      return setError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    // Check for password strength (example)
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      // Call the signup function from our context
      await signup(email, password, fullname, phone);

      // Success! User is created, data is in Firestore,
      // and they are logged in.

      // Navigate to the main page or profile.
      // Not /user/login, because they are already logged in!
      nav("/");

    } catch (err) {
      // Handle Firebase errors (e.g., "auth/email-already-in-use")
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email address is already in use.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Register to The Hair Lab</p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 transition"
          />
          <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 transition"
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 transition"
          />
          <input
              type="password"
              placeholder="Confirm Password" // <-- Added
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 transition"
          />
          <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 transition"
          />

          {/* Error message display */}
          {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
                className="text-green-600 font-semibold cursor-pointer hover:underline"
                onClick={() => nav("/user/login")}
            >
            Login here
          </span>
          </p>
        </form>
      </div>
  );
}