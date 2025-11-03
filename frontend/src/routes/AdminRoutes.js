import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminBookingsPage from "../pages/AdminBookingsPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/bookings" element={<AdminBookingsPage />} />
    </Routes>
  );
}
