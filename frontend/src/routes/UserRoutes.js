import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ServicesPage from "../pages/ServicesPage";
import BookingPage from "../pages/BookingPage";
import MyBookingsPage from "../pages/MyBookingsPage";
import ProfilePage from "../pages/ProfilePage";

// Import our new protected route
import { UserProtectedRoute } from "./ProtectedRoutes";

export default function UserRoutes() {
    return (
        <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/user/register" element={<RegisterPage />} />
            <Route path="/user/login" element={<LoginPage />} />
            <Route path="/user/services" element={<ServicesPage />} /> {/* Assuming public */}

            {/* --- Protected User Routes --- */}
            {/* These routes are now wrapped. Only logged-in users can access them. */}
            <Route element={<UserProtectedRoute />}>
                <Route path="/user/booking" element={<BookingPage />} />
                <Route path="/user/bookings" element={<MyBookingsPage />} />
                <Route path="/user/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
}