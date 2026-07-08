import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
