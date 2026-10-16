import React from 'react';
import { Coffee } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20 px-4 text-center">
      {/* Cute Steaming Coffee Cup Graphic */}
      <div className="relative mb-5 w-16 h-16 flex items-center justify-center">
        {/* Swirling Steam */}
        <div className="absolute -top-3 left-4 w-1.5 h-6 bg-[#E07A5F]/40 rounded-full blur-[0.5px] animate-steam" />
        <div className="absolute -top-4 left-7 w-2 h-7 bg-[#E07A5F]/50 rounded-full blur-[0.5px] animate-steam-delayed" />
        <div className="absolute -top-2 left-10 w-1.5 h-5 bg-[#E07A5F]/40 rounded-full blur-[0.5px] animate-steam" />

        {/* Cup */}
        <div className="w-12 h-10 bg-gradient-to-br from-[#E07A5F] to-[#C65D42] rounded-b-xl rounded-t-xs shadow-cozy-sm flex items-center justify-center relative">
          <Coffee className="w-5 h-5 text-white stroke-[2]" />
          {/* Handle */}
          <div className="absolute -right-2 top-1.5 w-3 h-5 border-2 border-[#C65D42] rounded-r-lg" />
        </div>
        {/* Saucer */}
        <div className="absolute bottom-1 w-16 h-1.5 bg-[#DCD2C2] rounded-full shadow-xs" />
      </div>

      <p className="font-serif italic text-base text-[#736257] mb-1">
        Steeping the latest dispatches...
      </p>
      <p className="text-xs text-[#A8988B] tracking-wide">
        Gathering stories from trusted newsrooms
      </p>
    </div>
  );
};

export default LoadingSpinner;
