import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import RoleSelection from './components/RoleSelection';
import RequesterDashboard from './components/requesters/RequesterDashboard';
import SupporterDashboard from './components/supporters/SupporterDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlannedFeatures from './components/PlannedFeatures';
import RequestDetail from './components/requesters/RequestDetail';
import { requesterRoutes, supporterRoutes, publicRoutes } from './routes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem(import.meta.env.VITE_USER_ROLE_KEY);
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-gray-100 text-black'}`}>
        <div className="max-w-screen-xl mx-auto">
          <Navbar
            darkMode={darkMode}
            toggleLanguage={toggleLanguage}
            toggleDarkMode={toggleDarkMode}
          />
          <Routes>
            <Route path={publicRoutes.main} element={
              userRole === null ? <RoleSelection /> : (
                <Navigate to={userRole === 'requester' ? requesterRoutes.requesterDashboard : supporterRoutes.supporterDashboard} replace />
              )
            } />
            <Route path={publicRoutes.roleSelection} element={<RoleSelection />} />
            <Route path={publicRoutes.login} element={<PublicRoute isAuthenticated={isAuthenticated}><Login toggleAuth={toggleAuth} darkMode={darkMode} /></PublicRoute>} />
            <Route path={publicRoutes.register} element={<PublicRoute isAuthenticated={isAuthenticated}><Register darkMode={darkMode} /></PublicRoute>} />
            <Route path={requesterRoutes.requesterDashboard} element={<PublicRoute isAuthenticated={isAuthenticated}><RequesterDashboard darkMode={darkMode} /></PublicRoute>} />
            <Route path={requesterRoutes.requestDetail} element={<PublicRoute isAuthenticated={isAuthenticated}><RequestDetail darkMode={darkMode} /></PublicRoute>} />
            <Route path={supporterRoutes.supporterDashboard} element={<PrivateRoute isAuthenticated={isAuthenticated}><SupporterDashboard /></PrivateRoute>} />
            <Route path={publicRoutes.plannedFeatures} element={<PlannedFeatures />} />
          </Routes>
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </Router>
  );
}

export default App;