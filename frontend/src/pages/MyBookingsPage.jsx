import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import RescheduleModal from "../components/RescheduleModal";
import CancelModal from "../components/CancelModal";
import { useAuth } from "../context/AuthContext";
import {
  getUserBookings,
  updateBooking,
  deleteBooking,
  getBookingsByDate, // ✅ Added to check for duplicate time slots
} from "../services/api";

export default function MyBookingsPage() {
  const nav = useNavigate();
  const { currentUser } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resOpen, setResOpen] = useState(false);
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("");
  const [resId, setResId] = useState(null);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  // ✅ Load user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getUserBookings(currentUser.uid);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [currentUser]);

  // ✅ Open reschedule modal
  const openReschedule = (id) => {
    setResId(id);
    setResOpen(true);
  };

  // ✅ Confirm reschedule (with duplicate check)
  const confirmReschedule = async () => {
    if (!resId || !resDate || !resTime) {
      alert("⚠️ Please select both date and time.");
      return;
    }

    try {
      // Get all bookings for the selected date from all users
      const existingBookings = await getBookingsByDate(resDate);

      // ✅ Check if another user has already booked this time (excluding current booking)
      const conflict = existingBookings.find(
        (b) => b.time === resTime && b.id !== resId
      );

      if (conflict) {
        alert("❌ This time slot is already booked. Please choose another time.");
        return;
      }

      // ✅ No conflict → proceed with update
      await updateBooking(currentUser.uid, resId, {
        date: resDate,
        time: resTime,
      });

      setResOpen(false);

      // Reload data after update
      const data = await getUserBookings(currentUser.uid);
      setBookings(Array.isArray(data) ? data : []);

      alert("✅ Appointment rescheduled successfully!");
    } catch (err) {
      console.error("Error during reschedule:", err);
      alert("❌ Failed to reschedule. Please try again.");
    }
  };

  // ✅ Open cancel modal
  const openCancel = (id) => {
    setCancelId(id);
    setCancelOpen(true);
  };

  // ✅ Confirm cancellation
  const confirmCancel = async () => {
    if (!cancelId) return;

    try {
      await deleteBooking(currentUser.uid, cancelId);
      setCancelOpen(false);

      // Reload data after cancellation
      const data = await getUserBookings(currentUser.uid);
      setBookings(Array.isArray(data) ? data : []);

      alert("✅ Appointment cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("❌ Failed to cancel. Please try again.");
    }
  };

  // ✅ Show loading message while fetching data
  if (loading) {
    return (
      <div className="text-center py-40 text-lg text-gray-600">
        Loading your bookings...
      </div>
    );
  }

  // ✅ Main display section
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-xl text-center">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-600 text-lg mb-6">
            You don't have any bookings yet.
          </p>
          <button
            onClick={() => nav("/user/booking")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onReschedule={openReschedule}
              onCancel={openCancel}
            />
          ))}
        </div>
      )}

      {/* ✅ Modals */}
      <RescheduleModal
        open={resOpen}
        date={resDate}
        time={resTime}
        setDate={setResDate}
        setTime={setResTime}
        onConfirm={confirmReschedule}
        onClose={() => setResOpen(false)}
      />

      <CancelModal
        open={cancelOpen}
        onConfirm={confirmCancel}
        onClose={() => setCancelOpen(false)}
      />
    </div>
  );
}
