import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Checks if a user is logged in.
 * If not, redirects them to the login page.
 * Used for pages like "My Bookings" or "Profile".
 */
export const UserProtectedRoute = () => {
    const { isLoggedIn, loading } = useAuth(); // <-- Get loading state

    // 1. If we are still loading the auth state, wait.
    //    (You can show a loading spinner here if you want)
    if (loading) {
        return <div>Loading...</div>;
    }

    // 2. If we are done loading and the user is NOT logged in, redirect.
    if (!isLoggedIn) {
        return <Navigate to="/user/login" replace />;
    }

    // 3. If we are done loading and the user IS logged in, show the page.
    return <Outlet />;
};

/**
 * Checks if a user is an Admin.
 * (This one needs the same logic)
 */
export const AdminProtectedRoute = () => {
    const { isLoggedIn, isAdmin, loading } = useAuth(); // <-- Get loading state

    // 1. Wait for loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // 2. Check for admin
    if (!isLoggedIn || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 3. Show admin page
    return <Outlet />;
};