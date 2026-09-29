import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiCamera } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">🌾 Pasumai AI</h1>
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-green-200">
            <FiHome /> Dashboard
          </Link>
          <Link to="/scanner" className="flex items-center gap-2 hover:text-green-200">
            <FiCamera /> Scanner
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
