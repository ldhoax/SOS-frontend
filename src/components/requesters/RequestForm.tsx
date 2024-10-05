import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface RequestFormProps {
  onClose: () => void;
  darkMode: boolean;
}

const RequestForm: React.FC<RequestFormProps> = ({ onClose, darkMode }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [emergencyLevel, setEmergencyLevel] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('emergencyLevel', emergencyLevel);
    formData.append('location', location);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    if (!process.env.REQUEST_HOST) {
      throw new Error("REQUEST_HOST is not defined");
    }

    fetch(process.env.REQUEST_HOST, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setImages(filesArray);
    }
  };

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-gray-800' : 'bg-black'} bg-opacity-50 flex items-center justify-center`}>
      <div className={`bg-${darkMode ? 'gray-700' : 'white'} p-6 rounded-lg shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>{t('createRequest')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('phoneNumber')}</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('description')}</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emergencyLevel" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('emergencyLevel')}</label>
            <select
              id="emergencyLevel"
              value={emergencyLevel}
              onChange={(e) => setEmergencyLevel(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
              required
            >
              <option value="">Select Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('location')}</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('images')}</label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
              required
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-md`}>
            {t('createRequestButton')}
          </button>
        </form>
        <div className="flex justify-center">
          <button onClick={onClose} className={`mt-4 ${darkMode ? 'text-red-400' : 'text-red-500'} bg-white`}>{t('cancel')}</button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;