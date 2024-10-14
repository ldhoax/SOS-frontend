import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authActions';
import { useTranslation } from 'react-i18next';
import { supporterRoutes, requesterRoutes } from '../../routes';
import { RootState } from '@reduxjs/toolkit/query/react';

interface LoginProps {
  toggleAuth: () => void;
  darkMode: boolean;
}

const Login: React.FC<LoginProps> = ({ toggleAuth, darkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading, userInfo, error, userToken, success } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  const userRole = localStorage.getItem(import.meta.env.VITE_USER_ROLE_KEY);
  if (userRole === 'supporter') {
    navigate(supporterRoutes.supporterDashboard);
  } else {
    navigate(requesterRoutes.requesterDashboard);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`p-8 rounded shadow-md w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('general.login')}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('general.username')}
            </label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
              }`}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('general.password')}
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
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