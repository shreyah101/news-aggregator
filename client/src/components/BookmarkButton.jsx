import React, { useState, useContext } from 'react';
import { Bookmark as BookmarkIcon, BookmarkCheck } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookmarkButton = ({ article, isSaved = false, onRemove }) => {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleToggleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (saved && article._id) {
        await api.delete(`/bookmarks/${article._id}`);
        setSaved(false);
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
      className={`p-1.5 rounded-full transition-colors ${saved ? 'text-primary-600 bg-primary-50' : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'}`}
      title={saved ? "Remove bookmark" : "Save article"}
    >
      {saved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
    </button>
  );
};

export default BookmarkButton;
