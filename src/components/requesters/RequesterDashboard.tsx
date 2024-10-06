import React, { useState, useEffect } from 'react';
import RequestForm from './RequestForm';
import { t } from 'i18next';

const RequesterDashboard: React.FC = ({ darkMode }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${process.env.REQUEST_HOST}/api/v1/requests`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className={`mx-auto my-8 p-4 rounded-lg ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
      <h1>{t('requester.requesterDashboard')}</h1>
      <div className="text-right">
        <button onClick={() => setIsFormOpen(true)} className={'mt-4 text-white bg-blue-500 px-4 py-2 rounded'}>
          {t('requester.createRequest')}
        </button>
      </div>
      {isFormOpen && <RequestForm onClose={() => setIsFormOpen(false)} darkMode={darkMode} />}
      <div className="mt-4">
        <ul>
          {requests.map((request, index) => (
            <li key={index}>{'request.title'}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequesterDashboard;