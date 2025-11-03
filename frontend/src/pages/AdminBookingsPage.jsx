import React, { useMemo, useState } from "react";
import { Calendar, Clock, Edit, Filter, Search, Trash2 } from "lucide-react";
import RescheduleModal from "../components/RescheduleModal";
import CancelModal from "../components/CancelModal";
import { getBookings, updateBooking, removeBooking } from "../services/store";

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const setTick = useState(0);

  const [resId, setResId] = useState(null);
  const [resOpen, setResOpen] = useState(false);
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("");

  const [cancelId, setCancelId] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  const bookings = useMemo(() => getBookings(), []);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch =
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.service.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || b.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [bookings, searchTerm, filterStatus]);

  const changeStatus = (id, newStatus) => {
    updateBooking(id, { status: newStatus });
    setTick(t => t + 1);
  };

  const openReschedule = (id) => {
    setResId(id);
    setResOpen(true);
  };
  const confirmReschedule = () => {
    if (!resId || !resDate || !resTime) return;
    updateBooking(resId, { date: resDate, time: resTime });
    setResOpen(false); setResId(null); setResDate(""); setResTime("");
    setTick(t => t + 1);
  };

  const openCancel = (id) => {
    setCancelId(id);
    setCancelOpen(true);
  };
  const confirmCancel = () => {
    if (!cancelId) return;
    removeBooking(cancelId);
    setCancelOpen(false); setCancelId(null);
    setTick(t => t + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">All Bookings Management</h2>

      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition appearance-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">ID</th>
                <th className="px-6 py-4 text-left font-bold">Customer</th>
                <th className="px-6 py-4 text-left font-bold">Service</th>
                <th className="px-6 py-4 text-left font-bold">Date & Time</th>
                <th className="px-6 py-4 text-left font-bold">Price</th>
                <th className="px-6 py-4 text-left font-bold">Status</th>
                <th className="px-6 py-4 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b, index) => (
                <tr key={b.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition`}>
                  <td className="px-6 py-4 font-semibold text-gray-800">#{b.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{b.customerName}</p>
                    <p className="text-sm text-gray-600">{b.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{b.service}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <p className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {b.date}
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {b.time}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-bold text-purple-600">{b.price}</td>
                  <td className="px-6 py-4">
                    <select
                      value={b.status}
                      onChange={(e) => changeStatus(b.id, e.target.value)}
                      className={`px-3 py-1 rounded-full font-semibold text-sm border-2 ${
                        b.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800 border-green-300' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openReschedule(b.id)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        title="Reschedule"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openCancel(b.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        title="Cancel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
