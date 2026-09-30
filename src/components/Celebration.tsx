import React from 'react';
import { motion } from 'framer-motion';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { CuteCharacter } from './CuteCharacter';
import { ConfettiEffect } from './Confetti';
import { Sparkles, Heart, PartyPopper, RotateCcw, Utensils } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface CelebrationProps {
  onReset: () => void;
}

export const Celebration: React.FC<CelebrationProps> = ({ onReset }) => {
  const { celebration } = APOLOGY_CONFIG;

  const triggerExtraConfetti = () => {
    sounds.playCelebrationFanfare();
  };

  return (
    <section className="py-16 px-4 relative z-20 max-w-4xl mx-auto text-center">
      <ConfettiEffect trigger={true} />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 90 }}
        className="glass-card rounded-3xl sm:rounded-[48px] p-6 sm:p-14 relative overflow-hidden shadow-2xl border-2 border-pink-300/80 bg-gradient-to-b from-white/90 via-pink-50/70 to-white/95"
      >
        {/* Decorative Floating Balloons in Corner */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 -left-6 text-5xl sm:text-6xl select-none pointer-events-none opacity-80"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -top-6 -right-6 text-5xl sm:text-6xl select-none pointer-events-none opacity-80"
        >
          🎉
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 mb-6"
        >
          <PartyPopper className="w-4 h-4 animate-bounce" />
          <span>{celebration.heroBadge}</span>
        </motion.div>

        {/* Dancing Character */}
        <div className="flex justify-center mb-6 relative">
          <CuteCharacter mood="happy" size="xl" onClick={triggerExtraConfetti} />
        </div>

        {/* Happy Headings */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 tracking-tight mb-3"
        >
          {celebration.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-3xl font-extrabold text-gray-800 mb-2"
        >
          {celebration.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-xl font-bold text-pink-600 mb-6"
        >
          {celebration.thankYou}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 rounded-2xl p-6 border border-pink-200 max-w-xl mx-auto shadow-sm mb-8 space-y-3"
        >
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
            {celebration.body}
          </p>
          <div className="pt-3 border-t border-pink-100 flex items-center justify-center gap-2 text-rose-600 font-bold text-sm sm:text-base">
            <Utensils className="w-4 h-4 text-pink-500" />
            <span>{celebration.treatPromise}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 relative z-10"
        >
          <button
            onClick={triggerExtraConfetti}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>More Confetti! 🎉</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onReset();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs sm:text-sm text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Reset to initial state to replay"
          >
            <RotateCcw className="w-4 h-4 text-gray-400" />
            <span>{celebration.resetButtonText}</span>
          </button>
        </motion.div>

        {/* Cute Floating Hearts Banner */}
        <div className="mt-8 flex justify-center items-center gap-2 text-pink-400 text-sm">
          <Heart className="w-4 h-4 fill-pink-400 animate-pulse" />
          <span>Best Friends Forever</span>
          <Heart className="w-4 h-4 fill-pink-400 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};
