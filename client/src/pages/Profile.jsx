import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { User, Shield, Sparkles, Check, Coffee } from 'lucide-react';

const CATEGORIES = [
  { name: 'General' },
  { name: 'Technology' },
  { name: 'Business' },
  { name: 'Sports' },
  { name: 'Health' },
  { name: 'Science' },
  { name: 'Entertainment' }
];

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
      setMessage({ text: 'Reader profile updated successfully.', type: 'success' });
      setPassword('');
    } catch (error) {
      setMessage({ text: 'Failed to update profile. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8">
      {/* Reader's Guild Membership Card */}
      <div className="bg-white rounded-3xl border border-[#EBE3D7] shadow-cozy-md overflow-hidden">
        
        {/* Vintage Masthead Card Banner */}
        <div className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#FAECE5] border-b border-[#EBE3D7] p-6 sm:p-8 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-mono font-semibold uppercase tracking-wider text-[#C65D42] border border-[#EBE3D7] mb-2 shadow-xs">
                <Coffee className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>Reader's Guild Pass</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B231D]">
                Reader Profile
              </h1>
              <p className="font-serif italic text-xs sm:text-sm text-[#736257]">
                Personalize your morning edition delivery & interest desks.
              </p>
            </div>
            <div className="hidden sm:block text-right font-mono text-[11px] text-[#A8988B]">
              <p>NEWSAGG PRESS</p>
              <p>MEMBER PASS</p>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-10 py-8">
          {/* Avatar and Reader Info */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#F5EFE6]">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#C65D42] text-white flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold shadow-cozy-sm border-2 border-white ring-2 ring-[#FAECE5]">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2B231D]">
                {user?.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#736257] font-mono">
                {user?.email}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#588157] font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#588157]" /> Active Reader
              </span>
            </div>
          </div>

          {/* Status Message */}
          {message.text && (
            <div
              className={`p-4 rounded-2xl mb-6 text-sm flex items-center gap-2 border ${
                message.type === 'success'
                  ? 'bg-[#EFF5F0] text-[#3A5A40] border-[#D2E4D5]'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {message.type === 'success' ? <Sparkles className="w-4 h-4 text-[#588157]" /> : <Shield className="w-4 h-4 text-red-500" />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#736257] mb-2">
                Reader's Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF6F0] border border-[#EBE3D7] rounded-xl text-sm text-[#2B231D] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40 focus:border-[#E07A5F] transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#A8988B]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#736257] mb-2">
                New Key / Password{' '}
                <span className="normal-case font-normal text-[#A8988B]">(leave blank to keep current)</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF6F0] border border-[#EBE3D7] rounded-xl text-sm text-[#2B231D] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40 focus:border-[#E07A5F] transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  autoComplete="new-password"
                />
                <Shield className="absolute left-3.5 top-3.5 h-4 w-4 text-[#A8988B]" />
              </div>
            </div>

            {/* Interest Desks */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#736257]">
                  Your Preferred Reading Desks
                </label>
                <span className="text-[11px] text-[#A8988B]">
                  {preferredCategories.length} selected
                </span>
              </div>
              <p className="text-xs text-[#736257] mb-3">
                Select topics you'd love to see prioritized in your morning feed:
              </p>

              <div className="flex flex-wrap gap-2.5">
                {CATEGORIES.map(category => {
                  const isSelected = preferredCategories.includes(category.name);
                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => handleCategoryChange(category.name)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#E07A5F] text-white border-[#C65D42] shadow-xs'
                          : 'bg-[#FAF6F0] text-[#736257] border-[#EBE3D7] hover:border-[#E07A5F] hover:bg-[#FAECE5]'
                      }`}
                    >
                      <span>{category.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 ml-0.5 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#C65D42] text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-cozy-sm hover:shadow-cozy-md disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                <Coffee className="w-4 h-4" />
                <span>{loading ? 'Updating Pass...' : 'Save Reader Settings'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
