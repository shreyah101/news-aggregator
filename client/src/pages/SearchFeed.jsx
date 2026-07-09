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

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Search Results</h1>
        {searchTerm && (
          <p className="text-gray-500 text-sm sm:text-base">
            Showing results for:{' '}
            <span className="font-semibold text-primary-600">"{searchTerm}"</span>
          </p>
        )}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : !searchTerm ? (
        <div className="text-center py-16 sm:py-20 text-gray-400 text-sm">
          Please enter a search query in the search bar above.
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 font-medium mb-1">No results found</p>
          <p className="text-gray-400 text-sm">Try searching with different or broader keywords.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-4">{news.length} result{news.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchFeed;
