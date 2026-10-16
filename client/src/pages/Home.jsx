import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import { Sparkles, Coffee } from 'lucide-react';
import { FALLBACK_NEWS } from '../data/fallbackNews';

const CATEGORIES = [
  { name: 'Technology' },
  { name: 'Business' },
  { name: 'Sports' },
  { name: 'Health' },
  { name: 'Science' },
  { name: 'Entertainment' }
];

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get('/news');
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        } else {
          setNews(FALLBACK_NEWS);
        }
      } catch (error) {
        console.warn('API cold-starting or unavailable, displaying editorial fallbacks:', error);
        setNews(FALLBACK_NEWS);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Time-of-day dynamic cozy greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        title: user ? `Good morning, ${user.name.split(' ')[0]}` : "The Morning Edition",
        subtitle: "Grab your warm brew and ease into today's most essential world stories.",
        badge: "Morning Dispatch"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        title: user ? `Good afternoon, ${user.name.split(' ')[0]}` : "The Midday Edition",
        subtitle: "Catch up on what's unfolding across the globe during your midday pause.",
        badge: "Afternoon Edition"
      };
    } else {
      return {
        title: user ? `Good evening, ${user.name.split(' ')[0]}` : "The Evening Digest",
        subtitle: "Wind down your day with quiet, thoughtful reading and curated dispatches.",
        badge: "Evening Digest"
      };
    }
  };

  const greeting = getGreeting();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Editorial Masthead Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#FAECE5] rounded-3xl border border-[#EBE3D7] p-6 sm:p-10 shadow-cozy-sm">
        {/* Soft decorative background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E07A5F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#E7A93B]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#EBE3D7] text-xs font-semibold text-[#C65D42] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E7A93B]" />
            <span>{greeting.badge}</span>
            <span className="text-[#A8988B]">•</span>
            <span className="font-mono text-[11px] text-[#736257]">Fresh Ink</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B231D] tracking-tight mb-3 leading-tight">
            {greeting.title}
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-[#736257] leading-relaxed max-w-xl">
            "{greeting.subtitle}"
          </p>
        </div>
      </section>

      {/* Category Pills Scroller */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A8988B]">
              Browse News Desks
            </h2>
          </div>
          <span className="text-xs text-[#A8988B] hidden sm:inline">
            Scroll for more topics →
          </span>
        </div>

        <div className="-mx-4 px-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2.5">
            {/* Active All Stories Tab */}
            <Link
              to="/"
              className="flex-shrink-0 inline-flex items-center px-4 py-2 rounded-full bg-[#2B231D] text-white text-xs sm:text-sm font-semibold shadow-cozy-sm whitespace-nowrap"
            >
              <span>All Top Stories</span>
            </Link>

            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/category/${cat.name.toLowerCase()}`}
                className="flex-shrink-0 inline-flex items-center px-4 py-2 rounded-full bg-white text-[#736257] hover:text-[#C65D42] hover:bg-[#FAECE5] border border-[#EBE3D7] text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-xs whitespace-nowrap"
              >
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main News Grid */}
      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B231D]">
            Today's Front Page
          </h2>
          <span className="text-xs font-mono text-[#A8988B]">
            {news.length} {news.length === 1 ? 'Dispatch' : 'Dispatches'}
          </span>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#EBE3D7] shadow-cozy-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FAECE5] flex items-center justify-center text-[#E07A5F]">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B231D] mb-1">
              No dispatches found at the newsstand
            </h3>
            <p className="text-xs sm:text-sm text-[#736257] max-w-sm mx-auto mb-4">
              The printing presses are waiting for fresh stories. Check your internet connection or come back in a few moments!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-[#E07A5F] text-white rounded-full hover:bg-[#C65D42] transition-colors shadow-xs"
            >
              Refresh Newsstand
            </button>
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

export default Home;
