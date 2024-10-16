import React, { useState } from 'react';
import { useQuery } from 'react-query';
import RequestForm from './RequestForm';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { FormatedTime } from '../utils/Time';
import LoadingStatus from '../LoadingStatus';
const fetchRequests = async () => {
  const response = await fetch(`${import.meta.env.VITE_REQUEST_BASE_URL}/requests`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data['data'];
};

const RequesterDashboard: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: requests, error, isLoading } = useQuery('requests', fetchRequests);

  return (
    <div className={`mx-auto my-8 p-4 rounded-lg ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
      <h1>{t('requester.requesterDashboard')}</h1>
      <div className="text-right">
        <button onClick={() => setIsFormOpen(true)} className={'mt-4 text-white bg-blue-500 px-4 py-2 rounded'}>
          {t('requester.createRequest')}
        </button>
      </div>
      {isFormOpen && <RequestForm onClose={() => setIsFormOpen(false)} darkMode={darkMode} />}
      <LoadingStatus isLoading={isLoading} error={error as Error | null} />
      {
        !isLoading && !error && (
          <div className="mt-4">
            <ul>
              {Array.isArray(requests) && requests.map((request, index) => (
              <li key={index} className={`border p-4 my-4 rounded-lg relative ${darkMode ? 'bg-gray-700 text-white' : ''} shadow-lg`}>
                <Link to={`/request-detail/${request['ID']}`} className={`absolute top-0 right-0 m-4 ${darkMode ? 'bg-green-600' : 'bg-green-500'} text-white px-4 py-2 rounded`}>{t('requester.view')}</Link>
                <p><strong>{t('requester.shortDescription')}:</strong> {request['short_description']}</p>
                <p><strong>{t('requester.location')}:</strong> {request['location']}</p>
                <p><strong>{t('requester.contact')}:</strong> {request['email'] ? request['email'] : request['phone_number'] ? request['phone_number'] : t('requester.na')}</p>
                <p><strong>{t('requester.requested')}:</strong> {FormatedTime(request['created_at'])}</p>
                <p><strong>{t('requester.emergencyLevel')}:</strong> {request['emergency_level']}</p>
              </li>
            ))}
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default RequesterDashboard;