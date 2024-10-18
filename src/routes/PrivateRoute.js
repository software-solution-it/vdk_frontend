import React from 'react';
import { Navigate } from 'react-router-dom';
import { TokenService } from '../services/TokenService';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = TokenService.isAuthenticated();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
