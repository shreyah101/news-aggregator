import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Bookmark, Sparkles, BookOpen, Coffee } from 'lucide-react';
import { FALLBACK_NEWS } from '../data/fallbackNews';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data } = await api.get('/bookmarks');
        if (Array.isArray(data) && data.length > 0) {
          setBookmarks(data);
        } else {
          setBookmarks(FALLBACK_NEWS.slice(0, 2));
        }
      } catch (error) {
        console.warn('API cold-starting, showing sample saved bookshelf:', error);
        setBookmarks(FALLBACK_NEWS.slice(0, 2));
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
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#FAECE5] rounded-3xl border border-[#EBE3D7] p-6 sm:p-10 shadow-cozy-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#EBE3D7] text-xs font-semibold text-[#C65D42] mb-3 shadow-xs">
              <Bookmark className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Personal Library</span>
              <span className="text-[#A8988B]">•</span>
              <span className="font-mono text-[11px] text-[#736257]">Mindful Collection</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B231D] tracking-tight mb-2">
              My Reading Bookshelf
            </h1>
            
            <p className="font-serif italic text-sm sm:text-base text-[#736257] max-w-lg">
              "Your quiet alcove for articles to savor over a second cup of coffee."
            </p>
          </div>

          {bookmarks.length > 0 && (
            <div className="sm:self-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#EBE3D7] text-xs font-semibold text-[#2B231D] shadow-cozy-sm">
                <Sparkles className="w-4 h-4 text-[#E7A93B]" />
                <span>{bookmarks.length} {bookmarks.length === 1 ? 'Story' : 'Stories'} Saved</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section>
        {bookmarks.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-[#EBE3D7] shadow-cozy-sm max-w-xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-[#FAECE5] flex items-center justify-center text-[#E07A5F] shadow-inner">
              <BookOpen className="w-10 h-10 stroke-[1.5]" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B231D] mb-2">
              Your bookshelf is waiting for its first story
            </h3>

            <p className="font-serif italic text-sm text-[#736257] leading-relaxed mb-6">
              "Whenever you spot a piece you'd love to read with an afternoon tea or quiet evening, tap the bookmark ribbon to tuck it away here."
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E07A5F] text-white font-medium text-sm hover:bg-[#C65D42] transition-all shadow-cozy-sm hover:shadow-cozy-md hover:scale-105 active:scale-95"
            >
              <Coffee className="w-4 h-4" />
              <span>Browse Today's Headlines</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A8988B]">
                Saved Dispatches
              </h2>
              <span className="text-xs text-[#A8988B]">
                Click ribbon to remove from bookshelf
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {bookmarks.map((bookmark) => (
                <NewsCard
                  key={bookmark._id}
                  article={bookmark}
                  onRemove={handleRemoveBookmark}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Bookmarks;
