import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface RequestFormProps {
  onClose: () => void;
  darkMode: boolean;
}

const RequestForm: React.FC<RequestFormProps> = ({ onClose, darkMode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState(''); // Added short description field
  const [emergencyLevel, setEmergencyLevel] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // const [images, setImages] = useState<File[]>([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(phoneNumber);
    if (!isEmailValid && !isPhoneValid) {
      setFormError(t('requester.atLeastOneValid'));
      return;
    }
    setFormError('');

    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('short_description', shortDescription);
    formData.append('emergency_level', emergencyLevel);
    formData.append('location', location);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    // images.forEach((image, index) => {
    //   formData.append(`images[${index}]`, image);
    // });

    const requestHost = import.meta.env.VITE_REQUEST_BASE_URL;
    if (!requestHost) {
      throw new Error("VITE_REQUEST_BASE_URL is not defined");
    }

    fetch(`${requestHost}/requests`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(({ data }) => {
      localStorage.setItem(import.meta.env.VITE_REQUESTER_TOKEN_KEY, data['token']);
      navigate(`/request-detail/${data.request['ID']}`);
    })
    .catch(error => console.error('Error:', error));
    onClose();
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const filesArray = Array.from(files);
  //     setImages(filesArray);
  //   }
  // };

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-gray-800' : 'bg-black'} bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-${darkMode ? 'gray-700' : 'white'} p-6 rounded-lg shadow-lg max-w-4xl mx-auto`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>{t('requester.createRequest')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('requester.phoneNumber')}<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('requester.email')}<span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shortDescription" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('requester.shortDescription')}<span className="text-red-500">*</span></label>
            <textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('requester.location')}<span className="text-red-500">*</span></label>
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
            <label htmlFor="emergencyLevel" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('requester.emergencyLevel')}</label>
            <select
              id="emergencyLevel"
              value={emergencyLevel}
              onChange={(e) => setEmergencyLevel(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
            >
              <option value="">Select Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('requester.description')}</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="images" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>{t('requester.images')}</label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
            />
          </div> */}
          <button type="submit" className={`w-full py-2 px-4 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-md`}>
            {t('requester.createRequestButton')}
          </button>
          {formError && <div className="text-red-500 mt-2">{formError}</div>}
        </form>
        <div className="flex justify-center">
          <button onClick={onClose} className={`mt-4 ${darkMode ? 'text-red-400' : 'text-red-500'} bg-white`}>{t('general.cancel')}</button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;