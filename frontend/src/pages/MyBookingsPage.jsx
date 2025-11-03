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
} from "../services/api";

export default function MyBookingsPage() {
  const nav = useNavigate();
  const { currentUser } = useAuth(); // <-- Get the Firebase user

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Starts true, which is correct
  const [resOpen, setResOpen] = useState(false);
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("");
  const [resId, setResId] = useState(null);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  // --- THIS IS THE FIX ---
  // We use useEffect to fetch data *only when currentUser changes*
  useEffect(() => {
    // Define an async function *inside* the effect
    const fetchBookings = async () => {
      // We already know currentUser exists, so just fetch
      try {
        const data = await getUserBookings(currentUser.uid);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      }
      setLoading(false); // <-- Set loading false *after* fetching
    };

    if (currentUser) {
      // If there is a user, fetch their bookings
      fetchBookings();
    } else {
      // If there is no user (logged out), stop loading immediately
      setBookings([]); // Clear any old data
      setLoading(false); // <-- This was the missing piece
    }
  }, [currentUser]); // The dependency array is the key

  // --- (Your other functions remain the same) ---

  const openReschedule = (id) => {
    setResId(id);
    setResOpen(true);
  };

  const confirmReschedule = async () => {
    if (!resId || !resDate || !resTime) return;
    try {
      // We need to pass the userId now
      await updateBooking(currentUser.uid, resId, { date: resDate, time: resTime });
      setResOpen(false);
      setResId(null);
      setResDate("");
      setResTime("");
      // Re-fetch after update
      const data = await getUserBookings(currentUser.uid);
      setBookings(Array.isArray(data) ? data : []);
      alert("Appointment rescheduled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to reschedule. Please try again.");
    }
  };

  const openCancel = (id) => {
    setCancelId(id);
    setCancelOpen(true);
  };

  const confirmCancel = async () => {
    if (!cancelId) return;
    try {
      // We need to pass the userId now
      await deleteBooking(currentUser.uid, cancelId);
      setCancelOpen(false);
      setCancelId(null);
      // Re-fetch after delete
      const data = await getUserBookings(currentUser.uid);
      setBookings(Array.isArray(data) ? data : []);
      alert("Appointment cancelled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel. Please try again.");
    }
  };

  // --- (Render logic) ---

  // This loading state is now correct
  if (loading) {
    return (
        <div className="text-center py-40 text-lg text-gray-600">
          Loading your bookings...
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Bookings
        </h2>

        {/* This logic is now safe because loading is handled */}
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

        {/* Modals (no change) */}
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