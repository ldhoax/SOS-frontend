import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;