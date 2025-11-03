import React from "react";
import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Scissors className="w-6 h-6 text-purple-400" />
          <p className="text-xl font-bold">The Hair Lab</p>
        </div>
        <p className="text-lg mb-2">&copy; 2025 The Hair Lab. All rights reserved.</p>
        <p className="text-gray-400">Your trusted salon booking platform in Chiang Rai 💜</p>
      </div>
    </footer>
  );
}
