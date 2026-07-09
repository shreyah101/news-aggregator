import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      <h1 className="text-7xl sm:text-9xl font-bold text-gray-200 mb-4 select-none">404</h1>
      <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-sm mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-primary-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
