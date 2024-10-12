import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const handleRoleSelection = (role: 'requester' | 'supporter') => {
    localStorage.setItem('userRole', role);
    setIsOpen(false);
    if (role === 'supporter') {
      navigate('/login');
    } else {
      navigate('/requester-dashboard');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-blue-500">{t('roleSelector.selectYourRoleDescription')}</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleRoleSelection('requester')}
          >
            {t('roleSelector.requester')}
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleRoleSelection('supporter')}
          >
            {t('roleSelector.supporter')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;