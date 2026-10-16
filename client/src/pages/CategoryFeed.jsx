import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, BookOpen, Newspaper } from 'lucide-react';
import { FALLBACK_NEWS } from '../data/fallbackNews';

const CATEGORIES = [
  { name: 'Technology', desc: 'Breakthrough inventions, digital culture, and silicon frontiers.' },
  { name: 'Business', desc: 'Global markets, entrepreneurship, finance, and tradecraft.' },
  { name: 'Sports', desc: 'Championships, athletic triumphs, scores, and field stories.' },
  { name: 'Health', desc: 'Mind-body wellness, medical science, nutrition, and longevity.' },
  { name: 'Science', desc: 'Cosmic discoveries, earth sciences, physics, and ecology.' },
  { name: 'Entertainment', desc: 'Cinema, music, stagecraft, literary arts, and pop culture.' },
  { name: 'General', desc: 'Dispatches, global reports, and essential headlines from every corner.' }
];

const CategoryFeed = () => {
  const { name } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = CATEGORIES.find(c => c.name.toLowerCase() === (name || '').toLowerCase()) || {
    name: name,
    desc: `Curated reports, stories, and developments in ${name}.`
  };

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/news/category/${name}`);
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        } else {
          const filtered = FALLBACK_NEWS.filter(
            a => a.category?.toLowerCase() === (name || '').toLowerCase()
          );
          setNews(filtered.length ? filtered : FALLBACK_NEWS.slice(0, 3));
        }
      } catch (error) {
        console.warn('API unavailable, using category fallback dispatches:', error);
        const filtered = FALLBACK_NEWS.filter(
          a => a.category?.toLowerCase() === (name || '').toLowerCase()
        );
        setNews(filtered.length ? filtered : FALLBACK_NEWS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchNewsByCategory();
  }, [name]);

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

      {/* Category Editorial Masthead */}
      <section className="bg-gradient-to-r from-[#F5EFE6] to-[#FAECE5] rounded-3xl border border-[#EBE3D7] p-6 sm:p-8 shadow-cozy-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#EBE3D7] shadow-cozy-sm flex items-center justify-center text-[#E07A5F] flex-shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#A8988B] mb-1">
              <span>Section Desk</span>
              <span>•</span>
              <span className="capitalize">{name}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#2B231D] capitalize leading-tight mb-2">
              {name} News
            </h1>
            <p className="font-serif italic text-sm sm:text-base text-[#736257] max-w-xl">
              "{currentCategory.desc}"
            </p>
          </div>
        </div>
      </section>

      {/* Other Categories Carousel */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A8988B]">
            Explore Other Desks
          </h2>
        </div>

        <div className="-mx-4 px-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2.5">
            {CATEGORIES.filter(c => c.name.toLowerCase() !== (name || '').toLowerCase()).map(cat => (
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

      {/* News Content */}
      <section>
        {loading ? (
          <LoadingSpinner />
        ) : news.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#EBE3D7] shadow-cozy-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FAECE5] flex items-center justify-center text-[#E07A5F]">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B231D] mb-1">
              No dispatches currently available in {name}
            </h3>
            <p className="text-xs sm:text-sm text-[#736257] max-w-sm mx-auto mb-4">
              Our foreign correspondents are gathering new pieces. Try checking back in a short while or explore other desks!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-[#E07A5F] text-white rounded-full hover:bg-[#C65D42] transition-colors shadow-xs"
            >
              Return to Front Page
            </Link>
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

export default CategoryFeed;
