import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES, TIME_SLOTS } from "../services/constants";
// Import our new hook and API functions
import { useAuth } from "../context/AuthContext";
import { createBooking } from "../services/api"; // <-- Changed from store.js to api.js

export default function BookingPage() {
  const navigate = useNavigate();
  // Get all user info from our hook
  const { currentUser, userData } = useAuth();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Redirect logic is REMOVED (handled by UserProtectedRoute)

  // ✅ Confirm booking
  const confirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("⚠️ Please select all fields before confirming.");
      return;
    }

    const price =
        SERVICES.find((s) => s.name === selectedService)?.price || "฿0";

    // ✅ Build the new booking data
    const bookingData = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      price,
      status: "pending",
      // --- CRITICAL: Link booking to user ---
      userId: currentUser.uid, // <-- The Firebase User ID
      customerName: userData.name, // <-- From 'users' collection
      customerEmail: userData.email, // <-- From 'users' collection
    };

    try {
      setIsSubmitting(true);
      await createBooking(bookingData); // <-- Use new api.js function
      alert("✅ Booking confirmed successfully!");
      navigate("/user/bookings");
    } catch (err) {
      console.error("Error while confirming booking:", err);
      alert("❌ Failed to confirm booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Book Your Appointment
        </h2>

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl space-y-8">
          {/* ✅ Select Service (no change) */}
          <div>
            <label className="block text-xl font-bold mb-4 text-gray-800">
              Select Service
            </label>
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                  <button
                      key={service.id}
                      onClick={() => setSelectedService(service.name)}
                      className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                          selectedService === service.name
                              ? "border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                              : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                  >
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <p className="font-bold text-lg">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                    <p className="text-purple-600 font-bold text-xl mt-2">
                      {service.price}
                    </p>
                  </button>
              ))}
            </div>
          </div>

          {/* ✅ Select Date (no change) */}
          <div>
            <label className="block text-xl font-bold mb-4 text-gray-800">
              Select Date
            </label>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-600 transition text-lg"
            />
          </div>

          {/* ✅ Select Time (no change) */}
          <div>
            <label className="block text-xl font-bold mb-4 text-gray-800">
              Select Time
            </label>
            <div className="grid grid-cols-4 gap-3">
              {TIME_SLOTS.map((time) => (
                  <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                          selectedTime === time
                              ? "border-purple-600 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                              : "border-gray-200 hover:border-purple-300 bg-white text-gray-700"
                      }`}
                  >
                    {time}
                  </button>
              ))}
            </div>
          </div>

          {/* ✅ Confirm Button (no change) */}
          <button
              onClick={confirmBooking}
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl font-bold text-xl transition transform hover:scale-105 ${
                  isSubmitting
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:shadow-2xl"
              }`}
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>
  );
}