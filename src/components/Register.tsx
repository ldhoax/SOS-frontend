import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RegisterProps {
  darkMode: boolean;
}

const Register: React.FC<RegisterProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Registering with:', phoneNumber, password);
    // After successful registration, you might want to automatically log the user in
    // and redirect them to the appropriate dashboard
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`p-8 rounded shadow-md w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('register')}</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('phoneNumber')}
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                setPhoneNumber(onlyNumbers);
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
              }`}
              required
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('password')}
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {t('register')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;