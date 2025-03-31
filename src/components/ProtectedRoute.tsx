
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // This is a simplified version - you would typically check for authentication here
  const isAuthenticated = false; // For now, always redirect to login

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
