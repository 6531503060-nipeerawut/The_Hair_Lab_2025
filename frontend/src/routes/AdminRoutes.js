import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminBookingsPage from "../pages/AdminBookingsPage";

// Import our new protected route
import { AdminProtectedRoute } from "./ProtectedRoutes";

export default function AdminRoutes() {
    return (
        <Routes>
            {/* --- Protected Admin Routes --- */}
            {/* All admin routes are wrapped. Only admins can access them. */}
            <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            </Route>
        </Routes>
    );
}