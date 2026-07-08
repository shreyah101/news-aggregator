import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [preferredCategories, setPreferredCategories] = useState(user?.preferredCategories || []);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const categories = ['General', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];

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
      setMessage({ text: 'Profile updated successfully', type: 'success' });
      setPassword('');
    } catch (error) {
      setMessage({ text: 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 border rounded-xl shadow-sm">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.name}'s Profile</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {message.text && (
        <div className={`p-3 rounded mb-6 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Password (leave blank to keep current)</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-3">Your Interests</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  preferredCategories.includes(category) 
                    ? 'bg-primary-600 text-white border-primary-600 shadow-sm' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full sm:w-auto bg-primary-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
