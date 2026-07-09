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
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Saved Articles</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Your personal collection of bookmarked news.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 sm:py-24 bg-white rounded-2xl border border-gray-100 shadow-sm px-4">
          <div className="text-gray-300 mb-4">
            <svg className="mx-auto h-14 w-14 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">No saved articles yet</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Tap the bookmark icon on any article to save it here for later.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-4">{bookmarks.length} article{bookmarks.length !== 1 ? 's' : ''} saved</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {bookmarks.map((bookmark) => (
              <NewsCard
                key={bookmark._id}
                article={bookmark}
                onRemove={handleRemoveBookmark}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookmarks;
