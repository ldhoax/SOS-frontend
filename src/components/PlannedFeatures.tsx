import React from 'react';
import { useTranslation } from 'react-i18next';

const PlannedFeatures: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    'Register with phone number, verify by sms',
    'Requester home page',
    'Supporter home page',
    'Create request, edit request, mark as done',
    'Pick request to support, cancel support, expiration pickup',
    'Notify when have new request only for supporter without pickup',
    'Notify when pickup request',
    'History support',
    'Sort or find the suitest request by distance, emergency level',
  ];

  return (
    <div className="container mx-auto my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Planned Features</h2>
      <ul className="list-disc pl-6">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 text-gray-700 dark:text-gray-300">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlannedFeatures;