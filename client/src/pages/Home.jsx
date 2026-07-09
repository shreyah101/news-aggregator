import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';

const CATEGORIES = ['Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get('/news');
        setNews(data);
      } catch (error) {
        console.error('Error fetching news', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          {user ? `Welcome back, ${user.name.split(' ')[0]} 👋` : "Today's Top Headlines"}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Stay updated with the latest news from around the world.
        </p>
      </div>

      {/* Category Quick-Links — horizontal scroll on mobile */}
      <div className="mb-6 sm:mb-8 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="flex-shrink-0 px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary-500 hover:text-primary-600 bg-white transition-colors whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {news.length === 0 ? (
        <div className="text-center py-16 sm:py-20 text-gray-400 text-sm">
          No news articles found at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
