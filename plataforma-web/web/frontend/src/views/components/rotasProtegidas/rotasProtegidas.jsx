import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {

  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('activeRole');
  const location = useLocation();

  return !isAuthenticated ? <Navigate to="/login" state={{ from: location }} replace />
                          : isAuthenticated && !allowedRoles.includes(role)
                          ? <Navigate to="/not-permission" state={{ from: location }} replace />                     
                          : children;
};

export default ProtectedRoute;