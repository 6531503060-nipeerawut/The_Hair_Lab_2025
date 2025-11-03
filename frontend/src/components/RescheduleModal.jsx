import React from "react";
import { TIME_SLOTS } from "../services/constants";

export default function RescheduleModal({
  open,
  date,
  time,
  setDate,
  setTime,
  onConfirm,
  onClose,
  title = "Reschedule Appointment",
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">New Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">New Time</label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map(t => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`p-2 rounded-xl border-2 transition text-sm font-semibold ${
                    time === t
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
