import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-4 text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <p className="text-sm">
        Created with <span className="text-red-500">❤️</span> by a Vietnamese
        | {' '}
        <Link to="/planned-features" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
          Planned Features
        </Link>
      </p>
    </footer>
  );
};

export default Footer;