import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const categories = [
    { name: 'Technology' },
    { name: 'Business' },
    { name: 'Sports' },
    { name: 'Health' },
    { name: 'Science' },
    { name: 'Entertainment' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5EFE6] border-t border-[#EBE3D7] mt-auto">
      <div className="container mx-auto px-4 max-w-6xl py-12 sm:py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Colophon */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shadow-xs">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2B231D]">
                News<span className="text-[#E07A5F] italic">Agg</span>
              </span>
            </div>

            <p className="font-serif italic text-sm text-[#736257] leading-relaxed max-w-sm">
              "A quiet sanctuary for your morning coffee. Bringing clarity, calm, and world perspective to your daily reading routine."
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A8988B] bg-white/70 px-3 py-1.5 rounded-lg border border-[#EBE3D7]">
              <span>Freshly curated daily</span>
              <span>•</span>
              <span>Vol. XXIV</span>
            </div>
          </div>

          {/* Editorial Sections Directory */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs font-semibold text-[#A8988B] uppercase tracking-wider mb-4">
              News Desks & Topics
            </h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {categories.map(cat => (
                <Link
                  key={cat.name}
                  to={`/category/${cat.name.toLowerCase()}`}
                  className="flex items-center gap-2 text-xs text-[#736257] hover:text-[#C65D42] transition-colors py-0.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]/50 group-hover:bg-[#E07A5F] transition-colors" />
                  <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Reader Community & Mindful Note */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-mono text-xs font-semibold text-[#A8988B] uppercase tracking-wider mb-4">
              Mindful Reading
            </h3>
            <p className="text-xs text-[#736257] leading-relaxed">
              Curate your reading pace. Bookmark long-form stories for later and savor the craft of independent journalism.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C65D42] hover:text-[#943C25] bg-[#FAECE5] px-3.5 py-2 rounded-xl transition-all hover:shadow-xs group"
            >
              <span>Back to Masthead</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="border-t border-[#EBE3D7] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8988B] gap-4">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} NewsAgg Press. Brewed with</span>
            <Heart className="w-3.5 h-3.5 fill-[#E07A5F] text-[#E07A5F] inline mx-0.5" />
            <span>for thoughtful readers.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>MERN Stack</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Storybook Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
