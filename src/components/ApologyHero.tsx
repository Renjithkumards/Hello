import React from 'react';
import { motion } from 'framer-motion';
import { CuteCharacter } from './CuteCharacter';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { fadeInUp, staggerContainer } from '../animations/pageAnimations';
import { ChevronDown, HeartHandshake } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ApologyHeroProps {
  onScrollToMessage: () => void;
  isHappyMode: boolean;
}

export const ApologyHero: React.FC<ApologyHeroProps> = ({ onScrollToMessage, isHappyMode }) => {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 relative z-10"
    >
      {/* Top cute badge */}
      <motion.div variants={fadeInUp} className="mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/80 text-pink-600 shadow-sm border border-pink-200/80 backdrop-blur-sm">
          <HeartHandshake className="w-4 h-4 text-pink-500 animate-pulse" />
          A message for someone really special
        </span>
      </motion.div>

      {/* Main Greeting */}
      <motion.h1
        variants={fadeInUp}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 tracking-tight mb-4 text-glow"
      >
        {APOLOGY_CONFIG.hero.greeting}
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-lg sm:text-2xl text-gray-700 font-medium max-w-xl mb-8 leading-relaxed"
      >
        {APOLOGY_CONFIG.hero.subtitle}
      </motion.p>

      {/* Mascot Character with interactive click */}
      <motion.div
        variants={fadeInUp}
        className="my-2 flex flex-col items-center justify-center relative"
      >
        <CuteCharacter
          mood={isHappyMode ? 'happy' : 'sad'}
          size="xl"
          onClick={() => sounds.playPop()}
        />

        {/* Character speech bubble */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-6 px-6 py-3 rounded-2xl bg-white/90 shadow-md border border-pink-100 max-w-md backdrop-blur-sm relative"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-pink-100 rotate-45" />
          <p className="text-base sm:text-lg font-bold text-gray-800">
            {isHappyMode ? "You made me the happiest bear in the world! 🥰🎉" : APOLOGY_CONFIG.hero.apologyLine}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Down Trigger Button */}
      {!isHappyMode && (
        <motion.div variants={fadeInUp} className="mt-12">
          <button
            onClick={() => {
              sounds.playPop();
              onScrollToMessage();
            }}
            className="group flex flex-col items-center gap-2 text-pink-600/80 hover:text-pink-600 transition-colors cursor-pointer"
            aria-label="Scroll to apology letter"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-wide group-hover:scale-105 transition-transform">
              {APOLOGY_CONFIG.hero.scrollHint}
            </span>
            <div className="w-10 h-10 rounded-full bg-white/80 border border-pink-200 flex items-center justify-center shadow-sm group-hover:bg-pink-50 group-hover:shadow-md transition-all">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};
