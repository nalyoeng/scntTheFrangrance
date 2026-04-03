import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure the path is correct

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // 1. Handle the "loading" state
  // This prevents the app from kicking you out while it's still reading localStorage
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Verifying Access...</p>
      </div>
    );
  }

  // 2. Check for Authentication and Role
  // If there is a user AND that user has the 'admin' role, let them in
  if (user && user.role === 'admin') {
    return <Outlet />; // This renders the children (Admin, UserManagement, etc.)
  }

  // 3. Deny Access
  // If they aren't an admin, send them to login. 
  // We use "replace" so they can't click 'back' to return to the locked page.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;