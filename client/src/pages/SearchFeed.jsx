import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchFeed = () => {
  const query = useQuery();
  const searchTerm = query.get('q');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await api.get(`/news/search?q=${encodeURIComponent(searchTerm)}`);
        setNews(data);
      } catch (error) {
        console.error('Error fetching search results', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-gray-500">
          Showing results for: <span className="font-semibold text-primary-600">"{searchTerm}"</span>
        </p>
      </div>

      {!searchTerm ? (
         <div className="text-center py-20 text-gray-500">
            Please enter a search query.
         </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No articles found matching your search.
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

export default SearchFeed;
