import React from "react";
import { Calendar, Clock, Scissors, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import { useAuth } from "../context/AuthContext"; // <-- Import useAuth

export default function HomePage() {
  const { isLoggedIn } = useAuth(); // <-- Get the user's login state
  const navigate = useNavigate(); // <-- Get the navigation function

  // This function decides where to go
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/user/booking"); // Go to booking if logged in
    } else {
      navigate("/user/login"); // Go to login if not
    }
  };

  return (
      <div>
        <section className="text-center py-20">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Welcome to The Hair Lab
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Transform your look with expert stylists. Book your perfect salon
            appointment in just a few clicks ✨
          </p>

          {/* --- THIS IS THE FIX --- */}
          {/* We replace the <Link> with a <button> */}
          <button
              onClick={handleGetStarted} // <-- Use our smart function
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold"
          >
            Get Started
          </button>
          {/* ----------------------- */}

        </section>

        <section className="bg-white py-20 text-center">
          <h2 className="text-4xl font-bold mb-12 text-purple-600">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 bg-purple-50 rounded-2xl">
              <Calendar className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Easy Booking</h3>
              <p>Schedule appointments anytime, anywhere</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-2xl">
              <Clock className="w-10 h-10 text-pink-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Save Time</h3>
              <p>No more waiting lists. Get instant confirmation</p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl">
              <Scissors className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Expert Stylists</h3>
              <p>Professional and experienced team</p>
            </div>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-4xl font-bold text-purple-600 mb-12">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p>Chiang Rai, Thailand</p>
            </div>
            <div>
              <Phone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p>+66 (53) XXX-XXXX</p>
            </div>
            <div>
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p>info@hairlab.co.th</p>
            </div>
          </div>
        </section>
      </div>
  );
}