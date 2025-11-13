import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ServicesPage from "../pages/ServicesPage";
import BookingPage from "../pages/BookingPage";
import MyBookingsPage from "../pages/MyBookingsPage";
import ProfilePage from "../pages/ProfilePage";
import { UserProtectedRoute } from "./ProtectedRoutes";

export default function UserRoutes() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/user/register" element={<RegisterPage />} />
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/user/services" element={<ServicesPage />} />

      {/* --- Protected Routes --- */}
      <Route element={<UserProtectedRoute />}>
        <Route path="/user/booking" element={<BookingPage />} />
        <Route path="/user/bookings" element={<MyBookingsPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Route>

      {/* --- Fallback Route --- */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
