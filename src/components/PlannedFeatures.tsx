import React from 'react';

const PlannedFeatures: React.FC = () => {

  const features = {
    requesterService: [
      'Requester home page',
      'Create request, edit request, mark as done',
      'Notify when pickup request',
    ],
    supporterService: [
      'Supporter home page',
      'Pick request to support, cancel support, expiration pickup',
      'Notify when have new request only for supporter without pickup',
      'Sort or find the suitest request by distance, emergency level',
      'History support',
    ],
    verifyAndLabelRequests: [
      'Verify requests with sms or phone call, photo,...',
      'Label requests with emergency level',
    ],
    suggestionService: [
      'Suggest requests to supporters',
    ],
    monitoringService: [
      'Show requests/supporters on map, pickup status, request status, ...',
    ],
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Planned Features</h2>
      {Object.entries(features).map(([category, featuresList]) => (
        <div key={category}>
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul className="list-disc pl-6">
            {featuresList.map((feature, index) => (
              <li key={index} className="mb-2 text-gray-700 dark:text-gray-300">{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PlannedFeatures;