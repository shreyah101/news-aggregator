import React, { useState, useContext } from 'react';
import { Bookmark as BookmarkIcon, BookmarkCheck } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookmarkButton = ({ article, isSaved = false, onRemove }) => {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);
  const [justToggled, setJustToggled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleToggleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (saved && article._id) {
        await api.delete(`/bookmarks/${article._id}`);
        setSaved(false);
        setJustToggled(true);
        setTimeout(() => setJustToggled(false), 500);
        if (onRemove) onRemove(article._id);
      } else if (!saved) {
        await api.post('/bookmarks', {
          title: article.title,
          url: article.url,
          urlToImage: article.urlToImage,
          source: article.source?.name,
          publishedAt: article.publishedAt,
          description: article.description,
          category: article.category
        });
        setSaved(true);
        setJustToggled(true);
        setTimeout(() => setJustToggled(false), 500);
      }
    } catch (error) {
      console.error('Error toggling bookmark', error);
      alert('Failed to update bookmark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={loading}
      aria-label={saved ? "Remove bookmark" : "Save article to bookshelf"}
      title={saved ? "Saved to your bookshelf (Click to remove)" : "Save to bookshelf"}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 group active:scale-90 ${
        saved
          ? 'bg-[#FAECE5] text-[#C65D42] shadow-sm hover:bg-[#F5D6C6]'
          : 'bg-[#FAF6F0] text-[#736257] hover:bg-[#FAECE5] hover:text-[#C65D42] border border-[#EBE3D7]'
      } ${justToggled ? 'animate-ribbon' : ''}`}
    >
      {saved ? (
        <BookmarkCheck className="w-4 h-4 fill-[#C65D42]/20 stroke-[2.2]" />
      ) : (
        <BookmarkIcon className="w-4 h-4 stroke-[1.8] group-hover:scale-110 transition-transform" />
      )}
      
      {/* Tiny Ribbon Notch Visual Indicator when saved */}
      {saved && (
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E07A5F] ring-2 ring-white" />
      )}
    </button>
  );
};

export default BookmarkButton;
