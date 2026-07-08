import React, { useState, useEffect } from 'react';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data } = await api.get('/bookmarks');
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b._id !== id));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Articles</h1>
        <p className="text-gray-500">
          Your personal collection of bookmarked news.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No saved articles</h3>
          <p className="mt-1 text-gray-500">Start bookmarking interesting news to read them later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <NewsCard 
              key={bookmark._id} 
              article={bookmark} 
              onRemove={handleRemoveBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
