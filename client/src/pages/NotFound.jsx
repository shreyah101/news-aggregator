import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      {/* Decorative Lost Icon */}
      <div className="w-20 h-20 mb-6 rounded-3xl bg-[#FAECE5] border border-[#F5D6C6] flex items-center justify-center text-[#E07A5F] shadow-cozy-sm">
        <Compass className="w-10 h-10 animate-spin-slow stroke-[1.5]" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EBE3D7] text-xs font-mono font-semibold uppercase tracking-wider text-[#A8988B] mb-3">
        <span>Dispatch Error • 404</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B231D] mb-3 tracking-tight">
        Lost in the Morning Fog
      </h1>

      <p className="font-serif italic text-sm sm:text-base text-[#736257] mb-8 max-w-md mx-auto leading-relaxed">
        "Perhaps the paperboy misplaced this column, or the article has drifted into a different archive."
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E07A5F] text-white font-semibold text-sm hover:bg-[#C65D42] transition-all shadow-cozy-sm hover:shadow-cozy-md hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Front Page</span>
      </Link>
    </div>
  );
};

export default NotFound;
