import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;