import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import RoleSelection from './components/RoleSelection';
import RequesterDashboard from './components/requesters/RequesterDashboard';
import SupporterDashboard from './components/supporters/SupporterDashboard';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <ul className="flex justify-center space-x-4 p-4">
            <li><Link to="/" className="text-blue-600 hover:text-blue-800">{t('home')}</Link></li>
            <li><Link to="/login" className="text-blue-600 hover:text-blue-800">{t('login')}</Link></li>
            <li><Link to="/requester-dashboard" className="text-blue-600 hover:text-blue-800">{t('requesterDashboard')}</Link></li>
            <li><Link to="/supporter-dashboard" className="text-blue-600 hover:text-blue-800">{t('supporterDashboard')}</Link></li>
          </ul>
          <div className="flex justify-center space-x-2 p-2">
            <button onClick={() => changeLanguage('en')} className="text-sm">EN</button>
            <button onClick={() => changeLanguage('vi')} className="text-sm">VI</button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            userRole === null ? <RoleSelection /> : (
              <Navigate to={userRole === 'requester' ? '/requester-dashboard' : '/supporter-dashboard'} replace />
            )
          } />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login" element={<PublicRoute isAuthenticated={isAuthenticated}><Login toggleAuth={toggleAuth} /></PublicRoute>} />
          <Route path="/requester-dashboard" element={<PublicRoute isAuthenticated={isAuthenticated}><RequesterDashboard /></PublicRoute>} />
          <Route path="/supporter-dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><SupporterDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;