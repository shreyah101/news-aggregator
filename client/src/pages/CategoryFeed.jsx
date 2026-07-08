import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';

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

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {name} News
        </h1>
        <p className="text-gray-500">
          Latest top headlines in {name}.
        </p>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No articles found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFeed;
