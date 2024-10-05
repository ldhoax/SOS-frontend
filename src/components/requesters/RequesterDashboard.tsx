import React, { useState } from 'react';
import RequestForm from './RequestForm';

const RequesterDashboard: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <h1>Requester Dashboard</h1>
      <button onClick={() => setIsFormOpen(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Create Request
      </button>
      {isFormOpen && <RequestForm onClose={() => setIsFormOpen(false)} darkMode={true} />}
    </div>
  );
};

export default RequesterDashboard;