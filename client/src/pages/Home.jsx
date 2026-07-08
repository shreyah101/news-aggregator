import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Today\'s Top Headlines'}
        </h1>
        <p className="text-gray-500">
          Stay updated with the latest news from around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
      
      {news.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No news articles found at the moment.
        </div>
      )}
    </div>
  );
};

export default Home;
