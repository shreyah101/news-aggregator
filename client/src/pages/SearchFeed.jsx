import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, ArrowLeft, BookOpen, Compass } from 'lucide-react';
import { FALLBACK_NEWS } from '../data/fallbackNews';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SUGGESTED_TOPICS = ['AI & Tech', 'Global Economy', 'Space Discovery', 'Wellness & Health', 'Climate'];

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
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        } else {
          const lower = searchTerm.toLowerCase();
          const filtered = FALLBACK_NEWS.filter(
            a => a.title?.toLowerCase().includes(lower) || a.description?.toLowerCase().includes(lower) || a.category?.toLowerCase().includes(lower)
          );
          setNews(filtered);
        }
      } catch (error) {
        console.warn('API search failed, filtering fallback dispatches:', error);
        const lower = searchTerm.toLowerCase();
        const filtered = FALLBACK_NEWS.filter(
          a => a.title?.toLowerCase().includes(lower) || a.description?.toLowerCase().includes(lower) || a.category?.toLowerCase().includes(lower)
        );
        setNews(filtered);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      {/* Return to Front Page Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#736257] hover:text-[#C65D42] px-3 py-1.5 rounded-full bg-white border border-[#EBE3D7] shadow-xs transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Front Page</span>
        </Link>
      </div>

      {/* Search Header Banner */}
      <section className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#FAECE5] rounded-3xl border border-[#EBE3D7] p-6 sm:p-8 shadow-cozy-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#EBE3D7] shadow-cozy-sm flex items-center justify-center text-[#E07A5F] flex-shrink-0">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#A8988B] mb-1">
              <span>Archive Inquiry</span>
              <span>•</span>
              <span>Search Results</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B231D] leading-tight mb-2">
              {searchTerm ? (
                <>
                  Stories matching <span className="text-[#E07A5F] italic">"{searchTerm}"</span>
                </>
              ) : (
                'Search the Newsstand'
              )}
            </h1>
            <p className="font-serif italic text-xs sm:text-sm text-[#736257]">
              {searchTerm ? `Found ${news.length} matching story dispatches in the archive.` : 'Type a query above to explore reports and articles.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        {loading ? (
          <LoadingSpinner />
        ) : !searchTerm ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#EBE3D7] shadow-cozy-sm">
            <Compass className="w-12 h-12 text-[#E07A5F] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2B231D] mb-1">
              Ready to explore?
            </h3>
            <p className="text-xs sm:text-sm text-[#736257] max-w-sm mx-auto mb-6">
              Enter any topic, keyword, or company name in the search bar above.
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {SUGGESTED_TOPICS.map(topic => (
                <Link
                  key={topic}
                  to={`/search?q=${encodeURIComponent(topic)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#FAF6F0] text-[#736257] hover:text-[#C65D42] hover:bg-[#FAECE5] border border-[#EBE3D7] transition-colors"
                >
                  <Search className="w-3 h-3 text-[#A8988B]" />
                  <span>{topic}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#EBE3D7] shadow-cozy-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FAECE5] flex items-center justify-center text-[#E07A5F]">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B231D] mb-1">
              No dispatches found for "{searchTerm}"
            </h3>
            <p className="text-xs sm:text-sm text-[#736257] max-w-sm mx-auto mb-6">
              The archive could not locate stories matching your query. Try broader keywords or browse our core desks.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-[#E07A5F] text-white rounded-full hover:bg-[#C65D42] transition-colors shadow-xs"
              >
                Back to Front Page
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {news.map((article, index) => (
              <NewsCard key={article._id || index} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchFeed;
