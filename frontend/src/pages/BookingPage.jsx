import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES, TIME_SLOTS } from "../services/constants";
import { addBooking } from "../services/store";
import { AuthContext } from "../context/AuthContext";

export default function BookingPage() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, user } = useContext(AuthContext);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ ใช้ useEffect เพื่อป้องกันการเรียก navigate ใน render (จะไม่ error)
  useEffect(() => {
    if (!isLoggedIn || isAdmin) {
      navigate("/user/login");
    }
  }, [isLoggedIn, isAdmin, navigate]);

  // ✅ ฟังก์ชันยืนยันการจอง
  const confirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("⚠️ Please select all fields before confirming.");
      return;
    }

    const price = SERVICES.find((s) => s.name === selectedService)?.price || "฿0";

    const bookingData = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      price,
      status: "pending",
      customerName: user?.name || "Guest",
      customerEmail: user?.email || "",
    };

    try {
      setIsSubmitting(true);
      await addBooking(bookingData); // ✅ รอ backend ตอบกลับก่อน navigate
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

        {/* ✅ Select Service */}
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

        {/* ✅ Select Date */}
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

        {/* ✅ Select Time */}
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

        {/* ✅ Confirm Button */}
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
