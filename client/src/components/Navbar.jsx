import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Search, Menu, X, User as UserIcon, Bookmark, LogOut, Coffee, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const todayStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* Top Editorial Masthead Strip */}
      <div className="bg-[#F5EFE6] border-b border-[#EBE3D7] text-xs text-[#736257] py-1 px-4 font-mono hidden sm:block">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[#E07A5F] font-semibold">
              <Coffee className="w-3.5 h-3.5" /> Morning Edition
            </span>
            <span>•</span>
            <span>{todayStr}</span>
            <span>•</span>
            <span className="text-[#A8988B]">Freshly steeped headlines</span>
          </div>
          <div className="flex items-center gap-3 text-[#736257]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E7A93B]" /> Mindful Reading Sanctuary
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EBE3D7] transition-all">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#C65D42] text-white flex items-center justify-center shadow-cozy-sm group-hover:scale-105 transition-transform duration-200">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#2B231D] leading-none">
                  News<span className="text-[#E07A5F] italic">Agg</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A8988B] leading-none mt-1">
                  Daily Dispatch
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links & Search */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
              {/* Cozy Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search morning stories..."
                  className="pl-9 pr-4 py-2 bg-white/80 border border-[#EBE3D7] rounded-full text-xs lg:text-sm text-[#2B231D] placeholder-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40 focus:border-[#E07A5F] transition-all w-48 lg:w-64 shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#A8988B]" />
              </form>

              {/* Quick Category Links */}
              <Link
                to="/category/technology"
                className={`text-xs lg:text-sm font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                  isActive('/category/technology')
                    ? 'bg-[#FAECE5] text-[#C65D42] font-semibold'
                    : 'text-[#736257] hover:text-[#C65D42] hover:bg-[#F5EFE6]'
                }`}
              >
                Tech
              </Link>
              <Link
                to="/category/business"
                className={`text-xs lg:text-sm font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                  isActive('/category/business')
                    ? 'bg-[#FAECE5] text-[#C65D42] font-semibold'
                    : 'text-[#736257] hover:text-[#C65D42] hover:bg-[#F5EFE6]'
                }`}
              >
                Business
              </Link>

              {/* User Profile / Auth State */}
              {user ? (
                <div className="flex items-center space-x-2 pl-2 border-l border-[#EBE3D7]">
                  <Link
                    to="/bookmarks"
                    className={`flex items-center gap-1.5 text-xs lg:text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                      isActive('/bookmarks')
                        ? 'bg-[#FAECE5] text-[#C65D42] font-semibold'
                        : 'text-[#736257] hover:text-[#C65D42] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 text-[#E07A5F]" />
                    <span>Bookshelf</span>
                  </Link>

                  <Link
                    to="/profile"
                    className={`flex items-center gap-1.5 text-xs lg:text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                      isActive('/profile')
                        ? 'bg-[#FAECE5] text-[#C65D42] font-semibold'
                        : 'text-[#736257] hover:text-[#C65D42] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#E07A5F] text-white text-xs flex items-center justify-center font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-[#736257] hover:text-[#C65D42] hover:bg-[#FAECE5] rounded-full transition-colors"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 pl-2 border-l border-[#EBE3D7]">
                  <Link
                    to="/login"
                    className="text-xs lg:text-sm font-medium text-[#736257] hover:text-[#C65D42] px-3 py-1.5 rounded-full transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#E07A5F] hover:bg-[#C65D42] text-white px-4 py-2 rounded-full font-medium text-xs lg:text-sm shadow-cozy-sm hover:shadow-cozy-md transition-all whitespace-nowrap"
                  >
                    Join the Circle
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-[#2B231D] hover:text-[#E07A5F] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-[#EBE3D7] px-5 py-6 shadow-cozy-lg space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search morning stories..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F0] border border-[#EBE3D7] rounded-xl text-sm text-[#2B231D] placeholder-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#A8988B]" />
            </form>

            <div className="space-y-1 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#A8988B] px-3 mb-1">
                Sections
              </div>
              <Link
                to="/category/technology"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-[#736257] hover:bg-[#FAECE5] hover:text-[#C65D42] rounded-xl transition-colors font-medium"
              >
                Technology
              </Link>
              <Link
                to="/category/business"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-[#736257] hover:bg-[#FAECE5] hover:text-[#C65D42] rounded-xl transition-colors font-medium"
              >
                Business
              </Link>
            </div>

            <div className="border-t border-[#EBE3D7] pt-4 space-y-1">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 bg-[#FAF6F0] rounded-xl mb-3">
                    <span className="w-8 h-8 rounded-full bg-[#E07A5F] text-white flex items-center justify-center font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-[#2B231D] truncate">{user.name}</p>
                      <p className="text-xs text-[#A8988B] truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/bookmarks"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[#736257] hover:bg-[#FAECE5] hover:text-[#C65D42] rounded-xl"
                  >
                    <Bookmark className="w-4 h-4 text-[#E07A5F]" />
                    <span>My Bookshelf</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[#736257] hover:bg-[#FAECE5] hover:text-[#C65D42] rounded-xl"
                  >
                    <UserIcon className="w-4 h-4 text-[#E07A5F]" />
                    <span>Reader Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2.5 px-4 rounded-xl text-sm font-medium text-[#736257] border border-[#EBE3D7] bg-[#FAF6F0]"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-[#E07A5F] shadow-sm"
                  >
                    Join Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
