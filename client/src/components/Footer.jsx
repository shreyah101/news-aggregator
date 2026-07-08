import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto py-8">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <h2 className="text-xl font-bold text-primary-600 mb-2">NewsAgg</h2>
        <p className="text-gray-500 mb-4">Your personalized news aggregator built with the MERN stack.</p>
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} NewsAgg. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
