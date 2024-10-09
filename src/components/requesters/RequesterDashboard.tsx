import React, { useState, useEffect } from 'react';
import RequestForm from './RequestForm';
import { t } from 'i18next';

const RequesterDashboard: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REQUEST_HOST}/api/v1/requests`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRequests(data['data']);
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
          {Array.isArray(requests) && requests.map((request, index) => (
            <li key={index} className={`border p-4 my-4 rounded-lg relative ${darkMode ? 'bg-gray-700 text-white' : ''} transition duration-500 ease-in-out transform shadow-lg`}>
              <button className={`absolute top-0 right-0 m-4 ${darkMode ? 'bg-green-600' : 'bg-green-500'} text-white px-4 py-2 rounded`} onClick={() => console.log(`Pick request ${index}`)}>Pick</button>
              <p><strong>{t('requester.shortDescription')}:</strong> {request['short_description']}</p>
              <p><strong>{t('requester.location')}:</strong> {request['location']}</p>
              <p><strong>{t('requester.contact')}:</strong> {request['email'] ? request['email'] : request['phone_number'] ? request['phone_number'] : t('requester.na')}</p>
              <p><strong>{t('requester.requested')}:</strong> {FormatedTime(request['created_at'])}</p>
              <p><strong>{t('requester.emergencyLevel')}:</strong> {request['emergency_level']}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FormatedTime = (dateTime: string) => {
  const currentDate = new Date();
  const requestDate = new Date(dateTime);
  const diffTime = Math.abs(requestDate.getTime() - currentDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffDays > 0 ? `${diffDays} ${t('general.days')}, ` : ''}${diffHours > 0 ? `${diffHours} ${t('general.hours')}, ` : ''}${diffMinutes} ${t('general.minutes')}`;
}

export default RequesterDashboard;