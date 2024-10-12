import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FormatedTime } from '../utils/Time';
import LoadingStatus from '../LoadingStatus';
import { t } from 'i18next';

const RequestDetail: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['request', id], () => fetchRequest(id ?? ''));
  const request = data?.data;

  return (
    <div className={`mx-auto my-8 p-4 rounded-lg ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} space-y-4`}>
      <h1>{t('requester.requestDetail')}</h1>
      <LoadingStatus isLoading={isLoading} error={error as Error | null} />
      {
        request && (
          <>
            <p className="mb-2"><strong>{t('requester.contact')}:</strong> {request['email'] ? request['email'] : request['phone_number'] ? request['phone_number'] : t('requester.na')}</p>
            <p className="mb-2"><strong>{t('requester.requested')}:</strong> {FormatedTime(request['created_at'])}</p>
            <p className="mb-2"><strong>{t('requester.shortDescription')}:</strong> {request['short_description']}</p>
            <p className="mb-2"><strong>{t('requester.location')}:</strong> {request['location']}</p>
            <div className="text-center">
              <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded">{t('requester.pickThisRequest')}</button>
            </div>
          </>
        )
      }
    </div>
  );
};

const fetchRequest = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_REQUEST_HOST}/api/v1/requests/${id}`);
  return response.json();
};

export default RequestDetail;
