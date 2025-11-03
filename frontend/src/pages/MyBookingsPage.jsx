import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import RescheduleModal from "../components/RescheduleModal";
import CancelModal from "../components/CancelModal";
import { getUserBookings, updateBooking, removeBooking } from "../services/store";
import { AuthContext } from "../context/AuthContext";

export default function MyBookingsPage() {
  const nav = useNavigate();
  const { isLoggedIn, isAdmin, user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [resOpen, setResOpen] = useState(false);
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("");
  const [resId, setResId] = useState(null);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  // ✅ ถ้า user ยังไม่ล็อกอิน หรือเป็น admin ให้ redirect
  if (!isLoggedIn || isAdmin) {
    nav("/user/login");
  }

  // ✅ โหลดข้อมูลการจองของ user
  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.email) {
        const data = await getUserBookings(user.email);
        setBookings(Array.isArray(data) ? data : []);
      }
    };
    fetchBookings();
  }, [user]);

  // ✅ เปิด modal สำหรับเลื่อนนัด
  const openReschedule = (id) => {
    setResId(id);
    setResOpen(true);
  };

  const confirmReschedule = async () => {
    if (!resId || !resDate || !resTime) return;
    await updateBooking(resId, { date: resDate, time: resTime });
    setResOpen(false);
    setResId(null);
    setResDate("");
    setResTime("");
    // รีโหลดข้อมูลใหม่
    const data = await getUserBookings(user.email);
    setBookings(data);
    alert("Appointment rescheduled successfully!");
  };

  // ✅ เปิด modal สำหรับยกเลิกนัด
  const openCancel = (id) => {
    setCancelId(id);
    setCancelOpen(true);
  };

  const confirmCancel = async () => {
    if (!cancelId) return;
    await removeBooking(cancelId);
    setCancelOpen(false);
    setCancelId(null);
    // รีโหลดข้อมูลใหม่
    const data = await getUserBookings(user.email);
    setBookings(data);
    alert("Appointment cancelled successfully!");
  };

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

      {/* ✅ Modal เลื่อนนัด */}
      <RescheduleModal
        open={resOpen}
        date={resDate}
        time={resTime}
        setDate={setResDate}
        setTime={setResTime}
        onConfirm={confirmReschedule}
        onClose={() => setResOpen(false)}
      />

      {/* ✅ Modal ยกเลิกนัด */}
      <CancelModal
        open={cancelOpen}
        onConfirm={confirmCancel}
        onClose={() => setCancelOpen(false)}
      />
    </div>
  );
}
