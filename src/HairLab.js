import React, { useState } from 'react';
import { Calendar, Clock, Scissors, MapPin, Phone, Mail, LogOut, User, Menu, X, Edit, Trash2, ArrowLeft } from 'lucide-react';

export default function HairLab() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookings, setBookings] = useState([
    { id: 1, service: 'Hair Styling', date: '2025-10-20', time: '10:00', price: '฿500', status: 'confirmed' },
    { id: 2, service: 'Haircut', date: '2025-10-25', time: '14:00', price: '฿300', status: 'confirmed' },
  ]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  const services = [
    { id: 1, name: 'Haircut', duration: '30 min', price: '฿300' },
    { id: 2, name: 'Hair Coloring', duration: '90 min', price: '฿800' },
    { id: 3, name: 'Styling', duration: '45 min', price: '฿500' },
    { id: 4, name: 'Hair Treatment', duration: '60 min', price: '฿600' },
  ];

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName('Sarah Johnson');
    setUserEmail('sarah.johnson@email.com');
    setUserPhone('+66 (53) 123-4567');
    setCurrentPage('home');
  };

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      const newBooking = {
        id: bookings.length + 1,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        price: services.find(s => s.name === selectedService)?.price || '฿0',
        status: 'confirmed'
      };
      setBookings([...bookings, newBooking]);
      setBookingConfirmed(true);
    }
  };

  const handleReschedule = () => {
    if (rescheduleDate && rescheduleTime && selectedBookingId) {
      const updatedBookings = bookings.map(booking =>
        booking.id === selectedBookingId
          ? { ...booking, date: rescheduleDate, time: rescheduleTime }
          : booking
      );
      setBookings(updatedBookings);
      setShowRescheduleModal(false);
      setRescheduleDate('');
      setRescheduleTime('');
      setSelectedBookingId(null);
      alert('Appointment rescheduled successfully!');
    }
  };

  const handleCancel = () => {
    const updatedBookings = bookings.filter(booking => booking.id !== cancelBookingId);
    setBookings(updatedBookings);
    setShowCancelModal(false);
    setCancelBookingId(null);
    alert('Appointment cancelled successfully!');
  };

  const handleUpdateProfile = () => {
    setUserName(tempName);
    setUserEmail(tempEmail);
    setUserPhone(tempPhone);
    setEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const openRescheduleModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowRescheduleModal(true);
  };

  const openCancelModal = (bookingId) => {
    setCancelBookingId(bookingId);
    setShowCancelModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Scissors className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">The Hair Lab</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-purple-600 transition">Home</button>
              <button onClick={() => setCurrentPage('services')} className="text-gray-700 hover:text-purple-600 transition">Services</button>
              {isLoggedIn ? (
                <>
                  <button onClick={() => setCurrentPage('bookings')} className="text-gray-700 hover:text-purple-600 transition">My Bookings</button>
                  <button onClick={() => setCurrentPage('profile')} className="text-gray-700 hover:text-purple-600 transition flex items-center gap-2">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <button onClick={() => setCurrentPage('login')} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Login</button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100">Home</button>
              <button onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100">Services</button>
              {isLoggedIn && (
                <>
                  <button onClick={() => { setCurrentPage('bookings'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100">My Bookings</button>
                  <button onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100">Profile</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Welcome to The Hair Lab</h1>
            <p className="text-xl text-gray-600 mb-8">Book your perfect salon appointment in just a few clicks</p>
            {!isLoggedIn ? (
              <button onClick={() => setCurrentPage('login')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
                Get Started
              </button>
            ) : (
              <button onClick={() => setCurrentPage('booking')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
                Book Now
              </button>
            )}
          </section>

          {/* Features */}
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                  <p className="text-gray-600">Schedule appointments anytime, anywhere with real-time availability</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-pink-50">
                  <Clock className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                  <p className="text-gray-600">No more waiting lists. Get instant booking confirmation</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <Scissors className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Expert Stylists</h3>
                  <p className="text-gray-600">Work with our professional and experienced team</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Get In Touch</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-gray-600">Chiang Rai, Thailand</p>
              </div>
              <div className="p-6">
                <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+66 (53) XXX-XXXX</p>
              </div>
              <div className="p-6">
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@hairlab.co.th</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Login Page */}
      {currentPage === 'login' && (
        <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login / Sign Up</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600" />
            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
              Login
            </button>
            <button onClick={() => { handleLogin(); }} className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
              Continue as Guest
            </button>
          </div>
        </div>
      )}

      {/* Services Page */}
      {currentPage === 'services' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
                <Scissors className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-2">{service.duration}</p>
                <p className="text-2xl font-bold text-purple-600">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Page */}
      {currentPage === 'booking' && isLoggedIn && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {!bookingConfirmed ? (
            <>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Book Your Appointment</h2>
              <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                
                {/* Service Selection */}
                <div>
                  <label className="block text-lg font-semibold mb-4 text-gray-700">Select Service</label>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map(service => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.name)}
                        className={`p-4 rounded-lg border-2 transition ${
                          selectedService === service.name
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                        <p className="text-purple-600 font-bold">{service.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-lg font-semibold mb-4 text-gray-700">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-lg font-semibold mb-4 text-gray-700">Select Time</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 transition ${
                          selectedTime === time
                            ? 'border-purple-600 bg-purple-600 text-white'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition"
                >
                  Confirm Booking
                </button>
              </div>
            </>
          ) : (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-green-600">✓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
                <div className="bg-purple-50 p-4 rounded-lg mb-6 text-left">
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Service:</span> {selectedService}</p>
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Date:</span> {selectedDate}</p>
                  <p className="text-gray-700"><span className="font-semibold">Time:</span> {selectedTime}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedService('');
                  setSelectedDate('');
                  setSelectedTime('');
                  setBookingConfirmed(false);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition mb-3"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('bookings');
                  setSelectedService('');
                  setSelectedDate('');
                  setSelectedTime('');
                  setBookingConfirmed(false);
                }}
                className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
              >
                View My Bookings
              </button>
            </div>
          )}
        </div>
      )}

      {/* My Bookings Page */}
      {currentPage === 'bookings' && isLoggedIn && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h2>
          
          {bookings.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="text-gray-600 mb-6">You don't have any bookings yet.</p>
              <button
                onClick={() => setCurrentPage('booking')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{booking.service}</h3>
                      <p className="text-gray-600">{booking.date} at {booking.time}</p>
                      <p className="text-purple-600 font-semibold mt-2">{booking.price}</p>
                      <span className="inline-block mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openRescheduleModal(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        <Edit className="w-4 h-4" /> Reschedule
                      </button>
                      <button
                        onClick={() => openCancelModal(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Reschedule Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">New Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setRescheduleTime(time)}
                      className={`p-2 rounded-lg border-2 transition text-sm ${
                        rescheduleTime === time
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReschedule}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Confirm Reschedule
                </button>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Cancel Appointment?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Page */}
      {currentPage === 'profile' && isLoggedIn && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h2>
            
            {!editingProfile ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Full Name</p>
                  <p className="text-xl font-semibold text-gray-800">{userName}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Email</p>
                  <p className="text-xl font-semibold text-gray-800">{userEmail}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Phone Number</p>
                  <p className="text-xl font-semibold text-gray-800">{userPhone}</p>
                </div>
                
                <button
                  onClick={() => {
                    setEditingProfile(true);
                    setTempName(userName);
                    setTempEmail(userEmail);
                    setTempPhone(userPhone);
                  }}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" /> Edit Profile
                </button>
                
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Booking History</h3>
                  <div className="space-y-3">
                    {bookings.length === 0 ? (
                      <p className="text-gray-600">No bookings yet</p>
                    ) : (
                      bookings.map(booking => (
                        <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-800">{booking.service}</p>
                            <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                          </div>
                          <p className="font-bold text-purple-600">{booking.price}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingProfile(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 The Hair Lab. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Your trusted salon booking platform in Chiang Rai</p>
        </div>
      </footer>
    </div>
  );
}