import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleRoleSelection = (role: 'requester' | 'supporter') => {
    localStorage.setItem('userRole', role);
    if (role === 'supporter') {
      navigate('/login');
    } else {
      navigate('/requester-dashboard');
    }
  };

  return (
    <div>
      <h1>Select Your Role</h1>
      <button onClick={() => handleRoleSelection('requester')}>{t('requester')}</button>
      <button onClick={() => handleRoleSelection('supporter')}>{t('supporter')}</button>
    </div>
  );
};

export default RoleSelection;