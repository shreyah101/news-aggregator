import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = ['Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment', 'General'];

const CategoryFeed = () => {
  const { name } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/news/category/${name}`);
        setNews(data);
      } catch (error) {
        console.error('Error fetching category news', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsByCategory();
  }, [name]);

  return (
    <div>
      {/* Header */}
      <div className="mb-5 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 capitalize">
          {name} News
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Latest top headlines in {name}.
        </p>
      </div>

      {/* Other category pills — horizontal scroll on mobile */}
      <div className="mb-5 sm:mb-8 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.filter(c => c.toLowerCase() !== name.toLowerCase()).map(cat => (
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

      {loading ? (
        <LoadingSpinner />
      ) : news.length === 0 ? (
        <div className="text-center py-16 sm:py-20 text-gray-400 text-sm">
          No articles found for this category.
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

export default CategoryFeed;
