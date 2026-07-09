import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const CATEGORIES = ['General', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [preferredCategories, setPreferredCategories] = useState(user?.preferredCategories || []);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPreferredCategories(user.preferredCategories || []);
    }
  }, [user]);

  const handleCategoryChange = (category) => {
    if (preferredCategories.includes(category)) {
      setPreferredCategories(preferredCategories.filter(c => c !== category));
    } else {
      setPreferredCategories([...preferredCategories, category]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const { data } = await api.put('/profile', {
        name,
        password: password || undefined,
        preferredCategories: preferredCategories.length ? preferredCategories : ['General']
      });
      setUser(data);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setPassword('');
    } catch (error) {
      setMessage({ text: 'Failed to update profile. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-4 py-4 sm:py-8">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Profile Header Banner */}
        <div className="bg-primary-600 h-20 sm:h-24" />

        <div className="px-5 sm:px-8 pb-6 sm:pb-8">
          {/* Avatar (overlapping the banner) */}
          <div className="-mt-10 sm:-mt-12 mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-4 border-white shadow-md text-primary-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Name & Email */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>

          {/* Status Message */}
          {message.text && (
            <div className={`p-3 rounded-xl mb-5 text-sm border ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border-green-100'
                : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                New Password{' '}
                <span className="font-normal text-gray-400">(leave blank to keep current)</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Your Interests</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-colors ${
                      preferredCategories.includes(category)
                        ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-primary-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
