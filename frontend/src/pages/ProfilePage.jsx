import React, { useContext, useState } from "react";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { isLoggedIn, isAdmin, user, login } = useContext(AuthContext);
  const nav = useNavigate();

  if (!isLoggedIn || isAdmin) {
    nav("/user/login");
  }

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const save = () => {
    // ใช้ login(role='user', userData) เพื่ออัปเดต user ใน context อย่างง่าย
    login("user", { name, email, phone });
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button
        onClick={() => nav("/")}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-bold transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">My Profile</h2>

        {!editing ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
                <UserIcon className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Full Name</p>
              <p className="text-2xl font-bold text-gray-800">{user?.name}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Email</p>
              <p className="text-2xl font-bold text-gray-800">{user?.email}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Phone Number</p>
              <p className="text-2xl font-bold text-gray-800">{user?.phone}</p>
            </div>

            <button
              onClick={() => {
                setEditing(true);
                setName(user?.name || "");
                setEmail(user?.email || "");
                setPhone(user?.phone || "");
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2 text-lg"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={save}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
