import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/auth.service.jsx';

const ProtectedRoute = ({ children }) => {
  const currentUser = AuthService.getCurrentUser();

  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
