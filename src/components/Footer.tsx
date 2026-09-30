import React from 'react';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { footer } = APOLOGY_CONFIG;

  return (
    <footer className="py-12 px-4 text-center relative z-10 border-t border-pink-100/60 bg-white/40 backdrop-blur-sm">
      <div className="max-w-md mx-auto flex flex-col items-center gap-2">
        <p className="text-xs sm:text-sm text-gray-600 font-medium flex items-center justify-center flex-wrap gap-1">
          <span>{footer.line1}</span>
        </p>
        <p className="text-sm font-bold text-pink-600 flex items-center gap-1.5">
          <span>{footer.line2}</span>
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
        </p>
      </div>
    </footer>
  );
};
