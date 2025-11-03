import React from "react";
import { XCircle } from "lucide-react";

export default function CancelModal({ open, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-gray-800">Cancel Appointment?</h3>
        <p className="text-gray-600 mb-8">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
          >
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
