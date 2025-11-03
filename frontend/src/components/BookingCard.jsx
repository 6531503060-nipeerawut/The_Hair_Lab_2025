import React from "react";
import { Calendar, Edit, Trash2 } from "lucide-react";

export default function BookingCard({ booking, onReschedule, onCancel }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{booking.service}</h3>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <Calendar className="w-4 h-4" /> {booking.date} at {booking.time}
          </p>
          <p className="text-purple-600 font-bold text-xl mt-2">{booking.price}</p>
          <span
            className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-bold ${
              booking.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onReschedule(booking.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105 font-semibold"
          >
            <Edit className="w-4 h-4" /> Reschedule
          </button>
          <button
            onClick={() => onCancel(booking.id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition transform hover:scale-105 font-semibold"
          >
            <Trash2 className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
