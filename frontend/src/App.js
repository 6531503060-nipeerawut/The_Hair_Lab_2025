import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Router>
      <Navbar />
      <UserRoutes />
      <AdminRoutes />
      <Footer />
    </Router>
  );
}
