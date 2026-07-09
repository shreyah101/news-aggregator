import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Search, Menu, X, User as UserIcon, Bookmark } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-primary-600 flex-shrink-0">
            NewsAgg
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="pl-9 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:border-primary-500 bg-gray-50 w-48 lg:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>

            <Link to="/category/technology" className="text-gray-600 hover:text-primary-600 font-medium text-sm whitespace-nowrap">Tech</Link>
            <Link to="/category/business" className="text-gray-600 hover:text-primary-600 font-medium text-sm whitespace-nowrap">Business</Link>

            {user ? (
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Link to="/bookmarks" className="text-gray-600 hover:text-primary-600 font-medium text-sm whitespace-nowrap">Bookmarks</Link>
                <Link to="/profile" className="flex items-center text-gray-600 hover:text-primary-600 font-medium text-sm whitespace-nowrap">
                  <UserIcon className="w-4 h-4 mr-1" /> Profile
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-primary-600 font-medium text-sm whitespace-nowrap">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium text-sm whitespace-nowrap">Login</Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 font-medium text-sm transition-colors whitespace-nowrap">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile: search icon + hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-primary-500 bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </form>

            {/* Mobile Nav Links */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium text-sm transition-colors"
            >
              Home
            </Link>
            <Link
              to="/category/technology"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium text-sm transition-colors"
            >
              Technology
            </Link>
            <Link
              to="/category/business"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium text-sm transition-colors"
            >
              Business
            </Link>
            <Link
              to="/category/sports"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium text-sm transition-colors"
            >
              Sports
            </Link>
            <Link
              to="/category/health"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium text-sm transition-colors"
            >
              Health
            </Link>

            <div className="border-t pt-2 mt-2">
              {user ? (
                <>
                  <Link
                    to="/bookmarks"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium text-sm transition-colors"
                  >
                    <Bookmark className="w-4 h-4 mr-2" /> Bookmarks
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium text-sm transition-colors"
                  >
                    <UserIcon className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 border border-primary-600 text-primary-600 rounded-lg font-medium text-sm transition-colors hover:bg-primary-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
