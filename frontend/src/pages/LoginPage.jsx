import React, { useContext, useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const setPassword = useState(""); // ไว้ต่อ backend ภายหลัง

  const loginUser = () => {
    const userData = {
      name: "Sarah Johnson",
      email: email || "sarah.johnson@email.com",
      phone: "+66 (53) 123-4567",
    };
    login("user", userData);
    nav("/"); // กลับหน้าแรก หรือจะเป็น /user/booking ก็ได้
  };

  const loginAdmin = () => {
    const userData = {
      name: "Admin User",
      email: email || "admin@hairlab.co.th",
      phone: "+66 (53) 999-9999",
    };
    login("admin", userData);
    nav("/admin/dashboard");
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
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginUser} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105">
          Login as User
        </button>
        <button onClick={loginAdmin} className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105">
          Login as Admin
        </button>
      </div>
    </div>
  );
}
