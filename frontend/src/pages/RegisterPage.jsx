import React, { useState, useContext } from "react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RegisterPage() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    if (!fullname || !email || !password || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    // ✅ Mock register (ในอนาคตจะเปลี่ยนเป็น API call)
    const newUser = {
      name: fullname,
      email,
      phone,
    };

    // บันทึกลง localStorage เฉย ๆ เพื่อจำลองระบบ
    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    // ล็อกอินอัตโนมัติหลังสมัครเสร็จ
    login("user", newUser);

    alert("Registration successful!");
    nav("/user/login"); // เปลี่ยนไปหน้า booking หลังสมัคร
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

      <div className="space-y-4">
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
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 transition"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105"
        >
          Register
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
      </div>
    </div>
  );
}
