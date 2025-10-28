import React, { useState } from 'react';
import { Calendar, Clock, Scissors, MapPin, Phone, Mail, LogOut, User, Menu, X, Edit, Trash2, ArrowLeft, BarChart3, Users, DollarSign, TrendingUp, Check, XCircle, Search, Filter } from 'lucide-react';

export default function HairLab() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookings, setBookings] = useState([
    { id: 1, service: 'Hair Styling', date: '2025-10-20', time: '10:00', price: '฿500', status: 'confirmed', customerName: 'Sarah Johnson', customerEmail: 'sarah@email.com' },
    { id: 2, service: 'Haircut', date: '2025-10-25', time: '14:00', price: '฿300', status: 'confirmed', customerName: 'Sarah Johnson', customerEmail: 'sarah@email.com' },
    { id: 3, service: 'Hair Coloring', date: '2025-10-28', time: '11:00', price: '฿800', status: 'pending', customerName: 'John Smith', customerEmail: 'john@email.com' },
    { id: 4, service: 'Hair Treatment', date: '2025-10-29', time: '15:00', price: '฿600', status: 'confirmed', customerName: 'Emma Wilson', customerEmail: 'emma@email.com' },
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const services = [
    { id: 1, name: 'Haircut', duration: '30 min', price: '฿300', icon: '✂️' },
    { id: 2, name: 'Hair Coloring', duration: '90 min', price: '฿800', icon: '🎨' },
    { id: 3, name: 'Styling', duration: '45 min', price: '฿500', icon: '💇' },
    { id: 4, name: 'Hair Treatment', duration: '60 min', price: '฿600', icon: '✨' },
  ];

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleLogin = (asAdmin = false) => {
    setIsLoggedIn(true);
    setIsAdmin(asAdmin);
    if (asAdmin) {
      setUserName('Admin User');
      setUserEmail('admin@hairlab.co.th');
      setUserPhone('+66 (53) 999-9999');
      setCurrentPage('admin-dashboard');
    } else {
      setUserName('Sarah Johnson');
      setUserEmail('sarah.johnson@email.com');
      setUserPhone('+66 (53) 123-4567');
      setCurrentPage('home');
    }
  };

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      const newBooking = {
        id: bookings.length + 1,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        price: services.find(s => s.name === selectedService)?.price || '฿0',
        status: 'pending',
        customerName: userName,
        customerEmail: userEmail
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

  const handleStatusChange = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
  };

  const openRescheduleModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowRescheduleModal(true);
  };

  const openCancelModal = (bookingId) => {
    setCancelBookingId(bookingId);
    setShowCancelModal(true);
  };

  // Admin stats calculations
  const totalRevenue = bookings.reduce((sum, b) => sum + parseInt(b.price.replace('฿', '')), 0);
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalCustomers = new Set(bookings.map(b => b.customerEmail)).size;

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const userBookings = bookings.filter(b => b.customerEmail === userEmail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage(isAdmin ? 'admin-dashboard' : 'home')}>
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">The Hair Lab</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              {!isAdmin && (
                <>
                  <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-purple-600 transition font-medium">Home</button>
                  <button onClick={() => setCurrentPage('services')} className="text-gray-700 hover:text-purple-600 transition font-medium">Services</button>
                </>
              )}
              {isLoggedIn ? (
                <>
                  {isAdmin ? (
                    <>
                      <button onClick={() => setCurrentPage('admin-dashboard')} className="text-gray-700 hover:text-purple-600 transition font-medium flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" /> Dashboard
                      </button>
                      <button onClick={() => setCurrentPage('admin-bookings')} className="text-gray-700 hover:text-purple-600 transition font-medium">All Bookings</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setCurrentPage('bookings')} className="text-gray-700 hover:text-purple-600 transition font-medium">My Bookings</button>
                      <button onClick={() => setCurrentPage('profile')} className="text-gray-700 hover:text-purple-600 transition font-medium flex items-center gap-2">
                        <User className="w-4 h-4" /> Profile
                      </button>
                    </>
                  )}
                  <button onClick={() => { setIsLoggedIn(false); setIsAdmin(false); setCurrentPage('home'); }} className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition transform hover:scale-105">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <button onClick={() => setCurrentPage('login')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition transform hover:scale-105 font-semibold">Login</button>
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
              {!isAdmin && (
                <>
                  <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded">Home</button>
                  <button onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded">Services</button>
                </>
              )}
              {isLoggedIn && (
                <>
                  {isAdmin ? (
                    <>
                      <button onClick={() => { setCurrentPage('admin-dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded">Dashboard</button>
                      <button onClick={() => { setCurrentPage('admin-bookings'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded">All Bookings</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setCurrentPage('bookings'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded">My Bookings</button>
                      <button onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 rounded">Profile</button>
                    </>
                  )}
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
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
                Welcome to The Hair Lab
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">Transform your look with expert stylists. Book your perfect salon appointment in just a few clicks ✨</p>
              {!isLoggedIn ? (
                <button onClick={() => setCurrentPage('login')} className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-1">
                  Get Started Now
                </button>
              ) : (
                <button onClick={() => setCurrentPage('booking')} className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-1">
                  Book Your Appointment
                </button>
              )}
            </div>
          </section>

          {/* Features */}
          <section className="bg-white/50 backdrop-blur-sm py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Why Choose Us</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Easy Booking</h3>
                  <p className="text-gray-600 text-lg">Schedule appointments anytime, anywhere with real-time availability</p>
                </div>
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-pink-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Save Time</h3>
                  <p className="text-gray-600 text-lg">No more waiting lists. Get instant booking confirmation</p>
                </div>
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Scissors className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Expert Stylists</h3>
                  <p className="text-gray-600 text-lg">Work with our professional and experienced team</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Get In Touch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl hover:shadow-xl transition text-center">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Location</h3>
                <p className="text-gray-600">Chiang Rai, Thailand</p>
              </div>
              <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl hover:shadow-xl transition text-center">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Phone</h3>
                <p className="text-gray-600">+66 (53) XXX-XXXX</p>
              </div>
              <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl hover:shadow-xl transition text-center">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Email</h3>
                <p className="text-gray-600">info@hairlab.co.th</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Login Page */}
      {currentPage === 'login' && (
        <div className="max-w-md mx-auto my-20 p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition" />
            <button onClick={() => handleLogin(false)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105">
              Login as User
            </button>
            <button onClick={() => handleLogin(true)} className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105">
              Login as Admin
            </button>
            <button onClick={() => { handleLogin(false); }} className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition">
              Continue as Guest
            </button>
          </div>
        </div>
      )}

      {/* Services Page */}
      {currentPage === 'services' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
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
      )}

      {/* Booking Page */}
      {currentPage === 'booking' && isLoggedIn && !isAdmin && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {!bookingConfirmed ? (
            <>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Book Your Appointment</h2>
              <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl space-y-8">
                
                {/* Service Selection */}
                <div>
                  <label className="block text-xl font-bold mb-4 text-gray-800">Select Service</label>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map(service => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.name)}
                        className={`p-6 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                          selectedService === service.name
                            ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                            : 'border-gray-200 hover:border-purple-300 bg-white'
                        }`}
                      >
                        <div className="text-3xl mb-2">{service.icon}</div>
                        <p className="font-bold text-lg">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                        <p className="text-purple-600 font-bold text-xl mt-2">{service.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-xl font-bold mb-4 text-gray-800">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-600 transition text-lg"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-xl font-bold mb-4 text-gray-800">Select Time</label>
                  <div className="grid grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                          selectedTime === time
                            ? 'border-purple-600 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                            : 'border-gray-200 hover:border-purple-300 bg-white text-gray-700'
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
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition transform hover:scale-105"
                >
                  Confirm Booking
                </button>
              </div>
            </>
          ) : (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <span className="text-4xl text-white">✓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Booking Confirmed!</h2>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 text-left">
                  <p className="text-gray-700 mb-3 flex items-center gap-2"><span className="font-bold">Service:</span> {selectedService}</p>
                  <p className="text-gray-700 mb-3 flex items-center gap-2"><span className="font-bold">Date:</span> {selectedDate}</p>
                  <p className="text-gray-700 flex items-center gap-2"><span className="font-bold">Time:</span> {selectedTime}</p>
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
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition mb-3"
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
                className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition"
              >
                View My Bookings
              </button>
            </div>
          )}
        </div>
      )}

      {/* My Bookings Page */}
      {currentPage === 'bookings' && isLoggedIn && !isAdmin && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">My Bookings</h2>
          
          {userBookings.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-xl text-center">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-600 text-lg mb-6">You don't have any bookings yet.</p>
              <button
                onClick={() => setCurrentPage('booking')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition transform hover:scale-105"
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userBookings.map(booking => (
                <div key={booking.id} className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{booking.service}</h3>
                      <p className="text-gray-600 flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" /> {booking.date} at {booking.time}
                      </p>
                      <p className="text-purple-600 font-bold text-xl mt-2">{booking.price}</p>
                      <span className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-bold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openRescheduleModal(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105 font-semibold"
                      >
                        <Edit className="w-4 h-4" /> Reschedule
                      </button>
                      <button
                        onClick={() => openCancelModal(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition transform hover:scale-105 font-semibold"
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

      {/* Admin Dashboard */}
      {currentPage === 'admin-dashboard' && isAdmin && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Admin Dashboard</h2>
            <p className="text-gray-600 text-lg">Manage your salon business efficiently</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
              <div className="flex justify-between items-start mb-4">
                <DollarSign className="w-10 h-10" />
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-purple-200 mb-1 font-semibold">Total Revenue</p>
              <p className="text-4xl font-bold">฿{totalRevenue.toLocaleString()}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
              <div className="flex justify-between items-start mb-4">
                <Calendar className="w-10 h-10" />
                <Check className="w-6 h-6" />
              </div>
              <p className="text-blue-200 mb-1 font-semibold">Confirmed Bookings</p>
              <p className="text-4xl font-bold">{confirmedBookings}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-pink-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
              <div className="flex justify-between items-start mb-4">
                <Clock className="w-10 h-10" />
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-pink-200 mb-1 font-semibold">Pending Bookings</p>
              <p className="text-4xl font-bold">{pendingBookings}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl shadow-xl text-white transform hover:scale-105 transition">
              <div className="flex justify-between items-start mb-4">
                <Users className="w-10 h-10" />
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-green-200 mb-1 font-semibold">Total Customers</p>
              <p className="text-4xl font-bold">{totalCustomers}</p>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Bookings</h3>
            <div className="space-y-4">
              {bookings.slice(0, 5).map(booking => (
                <div key={booking.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:shadow-md transition">
                  <div>
                    <p className="font-bold text-gray-800">{booking.customerName}</p>
                    <p className="text-sm text-gray-600">{booking.service} - {booking.date} at {booking.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{booking.price}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage('admin-bookings')}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
            >
              View All Bookings
            </button>
          </div>
        </div>
      )}

      {/* Admin All Bookings */}
      {currentPage === 'admin-bookings' && isAdmin && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">All Bookings Management</h2>
          
          {/* Search and Filter */}
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

          {/* Bookings Table */}
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
                  {filteredBookings.map((booking, index) => (
                    <tr key={booking.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition`}>
                      <td className="px-6 py-4 font-semibold text-gray-800">#{booking.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{booking.service}</td>
                      <td className="px-6 py-4 text-gray-700">
                        <p className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {booking.date}
                        </p>
                        <p className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {booking.time}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-bold text-purple-600">{booking.price}</td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`px-3 py-1 rounded-full font-semibold text-sm border-2 ${
                            booking.status === 'confirmed' 
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
                            onClick={() => openRescheduleModal(booking.id)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            title="Reschedule"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openCancelModal(booking.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            title="Cancel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Reschedule Appointment</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">New Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setRescheduleTime(time)}
                      className={`p-2 rounded-xl border-2 transition text-sm font-semibold ${
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
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
                >
                  Confirm Reschedule
                </button>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Cancel Appointment?</h3>
            <p className="text-gray-600 mb-8">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Page */}
      {currentPage === 'profile' && isLoggedIn && !isAdmin && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-bold transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
          
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">My Profile</h2>
            
            {!editingProfile ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Full Name</p>
                  <p className="text-2xl font-bold text-gray-800">{userName}</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Email</p>
                  <p className="text-2xl font-bold text-gray-800">{userEmail}</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Phone Number</p>
                  <p className="text-2xl font-bold text-gray-800">{userPhone}</p>
                </div>
                
                <button
                  onClick={() => {
                    setEditingProfile(true);
                    setTempName(userName);
                    setTempEmail(userEmail);
                    setTempPhone(userPhone);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2 text-lg"
                >
                  <Edit className="w-5 h-5" /> Edit Profile
                </button>
                
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Booking History</h3>
                  <div className="space-y-3">
                    {userBookings.length === 0 ? (
                      <p className="text-gray-600 text-center py-4">No bookings yet</p>
                    ) : (
                      userBookings.map(booking => (
                        <div key={booking.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <div>
                            <p className="font-bold text-gray-800">{booking.service}</p>
                            <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                          </div>
                          <p className="font-bold text-purple-600 text-lg">{booking.price}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 transition"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingProfile(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
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
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scissors className="w-6 h-6 text-purple-400" />
            <p className="text-xl font-bold">The Hair Lab</p>
          </div>
          <p className="text-lg mb-2">&copy; 2025 The Hair Lab. All rights reserved.</p>
          <p className="text-gray-400">Your trusted salon booking platform in Chiang Rai 💜</p>
        </div>
      </footer>
    </div>
  );
}