import React, { useEffect, useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
// Import from your new Firebase api.js file
import { getAllBookings } from "../services/api";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBookings(); // <-- Use Firebase function
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching all bookings:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Calculate stats *after* data is loaded

  // New revenue calculation
  const totalRevenue = bookings
      .filter((b) => b.status === "confirmed")
      .reduce((acc, booking) => {
        // Convert "฿800" to 800
        const price = parseInt(booking.price.replace("฿", "")) || 0;
        return acc + price;
      }, 0);

  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  // Get unique customers
  const customers = new Set(bookings.map((b) => b.customerEmail)).size;

  if (loading) {
    return (
        <div className="text-center py-20 text-gray-600 text-lg">
          Loading Dashboard...
        </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 text-lg">
            Manage your salon business efficiently
          </p>
        </div>

        {/* Stats Cards (now display real data) */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Revenue */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start mb-4">
              <DollarSign className="w-10 h-10" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-purple-200 mb-1 font-semibold">Total Revenue</p>
            <p className="text-4xl font-bold">
              ฿{totalRevenue.toLocaleString()}
            </p>
          </div>

          {/* Confirmed */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start mb-4">
              <Calendar className="w-10 h-10" />
              <Check className="w-6 h-6" />
            </div>
            <p className="text-blue-200 mb-1 font-semibold">
              Confirmed Bookings
            </p>
            <p className="text-4xl font-bold">{confirmed}</p>
          </div>

          {/* Pending */}
          <div className="bg-gradient-to-br from-pink-500 to-pink-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start mb-4">
              <Clock className="w-10 h-10" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-pink-200 mb-1 font-semibold">Pending Bookings</p>
            <p className="text-4xl font-bold">{pending}</p>
          </div>

          {/* Customers */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start mb-4">
              <Users className="w-10 h-10" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-green-200 mb-1 font-semibold">Total Customers</p>
            <p className="text-4xl font-bold">{customers}</p>
          </div>
        </div>

        {/* Recent Bookings (now shows real data) */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Recent Bookings
          </h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map((b) => (
                <div
                    key={b.id}
                    className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:shadow-md transition"
                >
                  <div>
                    <p className="font-bold text-gray-800">{b.customerName}</p>
                    <p className="text-sm text-gray-600">
                      {b.service} - {b.date} at {b.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{b.price}</p>
                    <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            b.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                  {b.status}
                </span>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}