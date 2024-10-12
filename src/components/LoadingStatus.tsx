import React from 'react';
import { t } from 'i18next';
interface LoadingStatusProps {
  isLoading: boolean;
  error: Error | null;
}

const LoadingStatus: React.FC<LoadingStatusProps> = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>{t('loadingStatus.loading')}</div>;
  }

  if (error) {
    return <div>{t('loadingStatus.error', { error: error.message })}</div>;
  }

  return null;
};

export default LoadingStatus;
