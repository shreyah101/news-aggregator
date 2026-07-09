import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const categories = ['Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 max-w-6xl py-8 sm:py-10">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-6">
          {/* Brand */}
          <div className="flex-shrink-0">
            <h2 className="text-xl font-bold text-primary-600 mb-1">NewsAgg</h2>
            <p className="text-gray-500 text-sm max-w-xs">
              Your personalized news aggregator. Stay informed, stay ahead.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {categories.map(cat => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  className="text-sm text-gray-500 hover:text-primary-600 transition-colors py-0.5"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t pt-4 text-center sm:text-left">
          <span className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} NewsAgg. Built with the MERN Stack. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
