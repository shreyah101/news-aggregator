import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Search, Menu, X, User as UserIcon } from 'lucide-react';

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
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">NewsAgg</Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-primary-500 bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>

            <Link to="/category/technology" className="text-gray-600 hover:text-primary-600 font-medium">Tech</Link>
            <Link to="/category/business" className="text-gray-600 hover:text-primary-600 font-medium">Business</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/bookmarks" className="text-gray-600 hover:text-primary-600 font-medium">Bookmarks</Link>
                <Link to="/profile" className="flex items-center text-gray-600 hover:text-primary-600 font-medium">
                  <UserIcon className="w-5 h-5 mr-1" /> Profile
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-primary-600 font-medium">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium">Login</Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 font-medium transition-colors">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-primary-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-primary-500 bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            <Link to="/category/technology" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium">Tech</Link>
            <Link to="/category/business" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium">Business</Link>
            
            {user ? (
              <>
                <Link to="/bookmarks" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium">Bookmarks</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-primary-600 font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
