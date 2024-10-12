import { t } from 'i18next';

export const FormatedTime = (dateTime: string) => {
  const currentDate = new Date();
  const requestDate = new Date(dateTime);
  const diffTime = Math.abs(requestDate.getTime() - currentDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffDays > 0 ? `${diffDays} ${t('general.days')}, ` : ''}${diffHours > 0 ? `${diffHours} ${t('general.hours')}, ` : ''}${diffMinutes} ${t('general.minutes')}`;
}
