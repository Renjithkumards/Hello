import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { useNoButton } from '../hooks/useNoButton';
import { useMousePosition } from '../hooks/useMousePosition';
import { useProximity } from '../hooks/useProximity';
import { yesButtonVariants, pulseHeartIcon } from '../animations/buttonAnimations';
import { Heart, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ForgivenessButtonsProps {
  onAccept: () => void;
  disabled?: boolean;
}

export const ForgivenessButtons: React.FC<ForgivenessButtonsProps> = ({
  onAccept,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const mousePosition = useMousePosition();
  const { state: noState, triggerEscape } = useNoButton(containerRef);

  const proximity = useProximity(
    noBtnRef,
    mousePosition,
    APOLOGY_CONFIG.noButtonConfig.proximityThreshold
  );

  // When cursor gets within threshold, trigger evasion
  useEffect(() => {
    if (proximity.isNear && !disabled) {
      triggerEscape(mousePosition.x, mousePosition.y);
    }
  }, [proximity.isNear, mousePosition.x, mousePosition.y, triggerEscape, disabled]);

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!disabled) {
      triggerEscape(mousePosition.x, mousePosition.y);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[220px] w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-6 px-4"
    >
      {/* ================= YES BUTTON ================= */}
      <motion.button
        variants={yesButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => {
          if (!disabled) {
            sounds.playCelebrationFanfare();
            onAccept();
          }
        }}
        disabled={disabled}
        className="relative z-30 group flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-extrabold text-lg sm:text-xl text-white bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-xl shadow-pink-500/35 hover:shadow-pink-500/60 border-2 border-white/50 cursor-pointer overflow-hidden active:scale-95 transition-all"
        aria-label="Forgive me and accept apology"
      >
        {/* Glow overlay */}
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />

        <motion.div variants={pulseHeartIcon} animate="animate" className="flex items-center">
          <Heart className="w-6 h-6 fill-white text-white drop-shadow-sm" />
        </motion.div>

        <span className="tracking-wide drop-shadow-sm">
          {APOLOGY_CONFIG.forgiveness.yesButtonText}
        </span>

        <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
      </motion.button>

      {/* ================= ESCAPING NO BUTTON ================= */}
      <motion.div
        className="relative z-20"
        animate={{
          x: noState.x,
          y: noState.y,
          rotate: noState.isEscaping ? [-8, 8, -4, 4, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 22,
          mass: 0.8,
        }}
      >
        {/* Playful Floating Evasion Speech Bubble */}
        <AnimatePresence>
          {noState.escapesCount > 0 && (
            <motion.div
              key={noState.escapesCount}
              initial={{ opacity: 0, y: 10, scale: 0.7 }}
              animate={{ opacity: 1, y: -42, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-white/95 text-gray-800 text-xs sm:text-sm font-black rounded-full shadow-lg border border-pink-200 pointer-events-none"
            >
              {noState.message}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-pink-200" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          ref={noBtnRef}
          onMouseEnter={() => triggerEscape(mousePosition.x, mousePosition.y)}
          onTouchStart={handleNoClick}
          onClick={handleNoClick}
          whileHover={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg text-gray-600 bg-white/80 hover:bg-white/90 border border-gray-300 shadow-md backdrop-blur-sm cursor-pointer select-none transition-colors"
          aria-label="No option button (evasive button)"
        >
          <span>{APOLOGY_CONFIG.forgiveness.noButtonText}</span>
          <span className="text-sm">💨</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
