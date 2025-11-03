import React, { useState, useEffect } from "react";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import our hook
import { updateUserProfile } from "../services/api"; // Import save function

export default function ProfilePage() {
    const { currentUser, userData, setUserData } = useAuth(); // Get REAL data
    const nav = useNavigate();

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Set initial state from userData (from AuthContext)
    const [name, setName] = useState(userData?.name || "");
    const [email, setEmail] = useState(userData?.email || "");
    const [phone, setPhone] = useState(userData?.phone || "");

    // This is the fix for empty fields:
    // When userData loads (it's async), update the form state.
    useEffect(() => {
        if (userData) {
            setName(userData.name);
            setEmail(userData.email);
            setPhone(userData.phone);
        }
    }, [userData]); // This runs when userData changes

    const save = async () => {
        if (!name || !email || !phone) {
            alert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const updates = { name, email, phone };

            // Call the REAL API to save to Firestore
            await updateUserProfile(currentUser.uid, updates);

            // Manually update the AuthContext state so UI updates instantly
            setUserData(updates);

            setEditing(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Failed to update profile:", err);
            alert("Failed to update profile.");
        }
        setLoading(false);
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
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    My Profile
                </h2>

                {!editing ? (
                    <div className="space-y-6">
                        <div className="flex items-center justify-center mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
                                <UserIcon className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        {/* These fields now show the state (which comes from userData) */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                            <p className="text-sm text-gray-600 mb-2 font-semibold">
                                Full Name
                            </p>
                            <p className="text-2xl font-bold text-gray-800">{name}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                            <p className="text-sm text-gray-600 mb-2 font-semibold">Email</p>
                            <p className="text-2xl font-bold text-gray-800">{email}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                            <p className="text-sm text-gray-600 mb-2 font-semibold">
                                Phone Number
                            </p>
                            <p className="text-2xl font-bold text-gray-800">{phone}</p>
                        </div>

                        <button
                            onClick={() => setEditing(true)}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2 text-lg"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700">
                                Phone Number
                            </label>
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
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Changes"}
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