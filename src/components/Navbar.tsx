import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  darkMode: boolean;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleLanguage, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`${darkMode ? 'dark:bg-gray-800' : 'bg-white'} shadow-md p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center p-0 ${darkMode ? 'text-white hover:text-gray-300' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            Menu
            <svg className={`w-4 h-4 ml-2 ${darkMode ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isMenuOpen && (
            <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'dark:bg-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2 text-sm ${darkMode ? 'dark:text-white dark:hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">{t('home')}</Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2 text-sm ${darkMode ? 'dark:text-white dark:hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">{t('login')}</Link>
                <Link to="/requester-dashboard" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2 text-sm ${darkMode ? 'dark:text-white dark:hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">{t('requesterDashboard')}</Link>
                <Link to="/supporter-dashboard" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-2 text-sm ${darkMode ? 'dark:text-white dark:hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">{t('supporterDashboard')}</Link>
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-bold`}>{t('home')}</Link>
          <Link to="/login" className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-bold`}>{t('login')}</Link>
          <Link to="/requester-dashboard" className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-bold`}>{t('requesterDashboard')}</Link>
          <Link to="/supporter-dashboard" className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-bold`}>{t('supporterDashboard')}</Link>
        </div>
        <div className="flex space-x-2">
          <button onClick={toggleLanguage} className={`text-sm ${darkMode ? 'dark:bg-blue-600 dark:hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-1 px-2 rounded`}>
            {i18n.language === 'en' ? 'VI' : 'EN'}
          </button>
          <button onClick={toggleDarkMode} className={`text-sm ${darkMode ? 'dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black' : 'bg-gray-700 hover:bg-gray-800 text-white'} font-bold py-1 px-2 rounded`}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;