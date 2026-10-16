import React from 'react';
import { Coffee, Newspaper } from 'lucide-react';

const SplashScreen = ({ progress = 0 }) => {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B231D] flex flex-col items-center justify-center px-4 relative overflow-hidden select-none">
      {/* Background warm glowing circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F5D6C6]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#EFF5F0]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Main Storybook Container */}
      <div className="w-full max-w-md text-center relative z-10 p-8 sm:p-10 bg-white/80 backdrop-blur-md rounded-3xl border border-[#EBE3D7] shadow-cozy-lg">
        
        {/* Animated Steaming Coffee Cup Icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          {/* Swirling Steam particles */}
          <div className="absolute -top-3 left-7 w-2 h-7 bg-[#E07A5F]/40 rounded-full blur-[1px] animate-steam" />
          <div className="absolute -top-5 left-11 w-2.5 h-9 bg-[#E07A5F]/50 rounded-full blur-[1px] animate-steam-delayed" />
          <div className="absolute -top-2 left-15 w-2 h-6 bg-[#E07A5F]/40 rounded-full blur-[1px] animate-steam" />

          {/* Cup graphic with saucer */}
          <div className="w-16 h-14 bg-gradient-to-br from-[#E07A5F] to-[#C65D42] rounded-b-2xl rounded-t-sm shadow-md flex items-center justify-center relative">
            <Coffee className="w-6 h-6 text-white stroke-[1.8]" />
            {/* Cup Handle */}
            <div className="absolute -right-3 top-2 w-4 h-7 border-4 border-[#C65D42] rounded-r-xl" />
          </div>
          {/* Saucer */}
          <div className="absolute bottom-2 w-20 h-2 bg-[#DCD2C2] rounded-full shadow-sm" />
        </div>

        {/* Vintage Masthead Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAECE5] text-[#C65D42] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#F5D6C6]">
            <Newspaper className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>The Daily Dispatch</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2B231D] mb-2 leading-tight">
            News<span className="text-[#E07A5F] italic">Agg</span>
          </h1>
          
          <p className="font-serif italic text-sm text-[#736257] max-w-xs mx-auto leading-relaxed">
            "Your quiet morning nook for thoughtful headlines & hot coffee."
          </p>
        </div>

        {/* Brewing Progress Bar */}
        <div className="space-y-2 max-w-xs mx-auto">
          <div className="w-full bg-[#F5EFE6] rounded-full h-2.5 overflow-hidden border border-[#EBE3D7] p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-[#E07A5F] to-[#D4A017] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(Math.max(progress, 5), 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-[#A8988B] font-medium pt-1">
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E07A5F] animate-pulse" />
              Brewing your feed...
            </span>
            <span className="font-mono text-[#736257]">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Edition Stamp */}
        <div className="mt-8 pt-4 border-t border-[#F5EFE6] flex items-center justify-center gap-2 text-[11px] text-[#A8988B] uppercase tracking-widest font-mono">
          <span>Morning Edition</span>
          <span>•</span>
          <span>Issue No. 1</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
