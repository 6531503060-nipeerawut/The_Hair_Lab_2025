import React from "react";
import { Clock } from "lucide-react";
import { SERVICES } from "../services/constants";

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Services</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map(service => (
          <div key={service.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.name}</h3>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" /> {service.duration}
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
