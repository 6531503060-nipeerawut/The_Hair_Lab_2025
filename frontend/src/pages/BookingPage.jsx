import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TIME_SLOTS } from "../services/constants";
import { useAuth } from "../context/AuthContext";
import { createBooking, getServices } from "../services/api";

export default function BookingPage() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        alert("Failed to load services. Please check the console.");
      }
      setLoadingServices(false);
    };
    fetchServices();
  }, []);


  const confirmBooking = async () => {

    // The debug check
    if (!selectedService) {
      alert("⚠️ Please select a SERVICE.");
      return;
    }
    if (!selectedDate) {
      alert("⚠️ Please select a DATE.");
      return;
    }
    if (!selectedTime) {
      alert("⚠️ Please select a TIME.");
      return;
    }

    if (!userData) {
      alert("Error: User data is not available. Please try logging out and back in.");
      console.error("confirmBooking failed: userData is null");
      return;
    }

    // --- THIS IS THE FIX (Part 1) ---
    // Find the object using 'name'
    const serviceObject = services.find(
        (s) => s.name === selectedService
    );
    // ---------------------------------

    if (!serviceObject) {
      alert("Error finding service. Please refresh.");
      return;
    }

    const bookingData = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      price: "฿" + serviceObject.price,
      status: "pending",
      userId: currentUser.uid,
      customerName: userData.name,
      customerEmail: userData.email,
    };

    try {
      setIsSubmitting(true);
      await createBooking(bookingData);
      alert("✅ Booking confirmed successfully!");
      navigate("/user/bookings");
    } catch (err)
    {
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
              {loadingServices ? (
                  <p className="col-span-2 text-center text-gray-600">Loading services...</p>
              ) : services.length === 0 ? (
                  <p className="col-span-2 text-center text-red-600">
                    No services found.
                  </p>
              ) : (
                  services.map((service) => (
                      <button
                          key={service.id}
                          // --- THIS IS THE FIX (Part 2) ---
                          // Pass 'service.name' to the handler
                          onClick={() => setSelectedService(service.name)}
                          className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                              // Check against 'service.name'
                              selectedService === service.name
                                  ? "border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                                  : "border-gray-200 hover:border-purple-300 bg-white"
                          }`}
                      >
                        <div className="text-3xl mb-2">{service.icon}</div>
                        {/* --- THIS IS THE FIX (Part 3) --- */}
                        {/* Display 'service.name' */}
                        <p className="font-bold text-lg">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                        <p className="text-purple-600 font-bold text-xl mt-2">
                          {"฿" + service.price}
                        </p>
                      </button>
                  ))
              )}
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