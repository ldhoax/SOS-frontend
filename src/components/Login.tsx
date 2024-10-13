import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LoginProps {
  toggleAuth: () => void;
  darkMode: boolean;
}

const Login: React.FC<LoginProps> = ({ toggleAuth, darkMode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your login logic here with phoneNumber and password
    console.log('Logging in with:', phoneNumber, password);
    toggleAuth(); // Set authenticated to true
    const userRole = localStorage.getItem(import.meta.env.VITE_USER_ROLE_KEY);
    if (userRole === 'supporter') {
      navigate('/supporter-dashboard');
    } else {
      navigate('/requester-dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`p-8 rounded shadow-md w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('general.login')}</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('requester.phoneNumber')}
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
              }`}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
              }`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {t('general.login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;