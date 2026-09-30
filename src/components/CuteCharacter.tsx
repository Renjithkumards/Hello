import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export type CharacterMood = 'sad' | 'happy' | 'excited' | 'shy';

interface CuteCharacterProps {
  mood: CharacterMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const CuteCharacter: React.FC<CuteCharacterProps> = ({
  mood = 'sad',
  size = 'lg',
  className = '',
  onClick,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeDimensions = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    xl: 'w-60 h-60 sm:w-72 sm:h-72',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative select-none flex items-center justify-center ${sizeDimensions} ${className} cursor-pointer transition-transform hover:scale-105 active:scale-95`}
      title={mood === 'happy' ? 'Happy Bear is dancing! 🥰' : 'Sad Bear is waiting for forgiveness... 🥺'}
    >
      {/* Floating Tears for Sad Mode */}
      {mood === 'sad' && (
        <>
          <div className="absolute left-[30%] top-[48%] pointer-events-none z-20">
            <span className="block w-2.5 h-3.5 bg-blue-400 rounded-full animate-tear shadow-sm" />
          </div>
          <div className="absolute right-[30%] top-[48%] pointer-events-none z-20">
            <span className="block w-2.5 h-3.5 bg-blue-400 rounded-full animate-tear-delay shadow-sm" />
          </div>
        </>
      )}

      {/* Sparkles / Stars for Happy & Excited Mode */}
      {(mood === 'happy' || mood === 'excited') && (
        <>
          <motion.span
            animate={{ scale: [0, 1.2, 0], rotate: [0, 90, 180], y: [-10, -35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.1 }}
            className="absolute -top-3 -left-3 text-xl pointer-events-none"
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ scale: [0, 1.3, 0], rotate: [0, -90, -180], y: [-10, -40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            className="absolute -top-4 -right-3 text-2xl pointer-events-none"
          >
            💖
          </motion.span>
          <motion.span
            animate={{ scale: [0, 1.1, 0], y: [0, -25] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
            className="absolute bottom-2 -right-4 text-lg pointer-events-none"
          >
            ⭐
          </motion.span>
        </>
      )}

      {/* Main Animated Character SVG */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        animate={
          mood === 'happy'
            ? {
                y: [0, -18, 0, -18, 0],
                rotate: [0, -6, 6, -6, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }
            : mood === 'excited'
            ? {
                y: [0, -24, 0],
                scale: [1, 1.08, 1],
              }
            : mood === 'shy'
            ? {
                rotate: [0, -4, 0],
                y: [0, 2, 0],
              }
            : {
                // Sad subtle breathing & droop
                y: [0, 6, 0],
                scale: [1, 0.98, 1],
              }
        }
        transition={{
          duration: mood === 'happy' ? 1.4 : mood === 'sad' ? 3.5 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <defs>
          <radialGradient id="bodyGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="70%" stopColor="#F5D0A9" />
            <stop offset="100%" stopColor="#E2B182" />
          </radialGradient>
          <radialGradient id="earInnerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB3C6" />
            <stop offset="100%" stopColor="#FF8FAB" />
          </radialGradient>
          <radialGradient id="bellyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF0E1" />
          </radialGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- EARS --- */}
        {/* Left Ear */}
        <motion.g
          animate={
            mood === 'sad'
              ? { rotate: [-12, -15, -12], originX: '45px', originY: '50px' }
              : mood === 'happy'
              ? { rotate: [-5, 8, -5], originX: '45px', originY: '50px' }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="50" cy="52" r="26" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="3" />
          <circle cx="50" cy="52" r="16" fill="url(#earInnerGrad)" opacity="0.85" />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          animate={
            mood === 'sad'
              ? { rotate: [12, 15, 12], originX: '155px', originY: '50px' }
              : mood === 'happy'
              ? { rotate: [5, -8, 5], originX: '155px', originY: '50px' }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="150" cy="52" r="26" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="3" />
          <circle cx="150" cy="52" r="16" fill="url(#earInnerGrad)" opacity="0.85" />
        </motion.g>

        {/* --- BODY --- */}
        <ellipse cx="100" cy="140" rx="60" ry="50" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="3" />
        {/* Soft Tummy Patch */}
        <ellipse cx="100" cy="142" rx="38" ry="34" fill="url(#bellyGrad)" />

        {/* --- HEAD --- */}
        <circle cx="100" cy="100" r="58" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="3.5" />

        {/* --- CHEEKS (BLUSH) --- */}
        <ellipse
          cx="62"
          cy="114"
          rx={mood === 'happy' || mood === 'shy' ? 12 : 9}
          ry={mood === 'happy' || mood === 'shy' ? 8 : 6}
          fill="#FB6F92"
          opacity={mood === 'sad' ? 0.35 : 0.65}
        />
        <ellipse
          cx="138"
          cy="114"
          rx={mood === 'happy' || mood === 'shy' ? 12 : 9}
          ry={mood === 'happy' || mood === 'shy' ? 8 : 6}
          fill="#FB6F92"
          opacity={mood === 'sad' ? 0.35 : 0.65}
        />

        {/* --- SNOUT --- */}
        <ellipse cx="100" cy="112" rx="22" ry="17" fill="#FFF9F4" />
        {/* Cute Heart-shaped / Oval Nose */}
        <path
          d="M 94 105 C 94 102, 100 101, 100 105 C 100 101, 106 102, 106 105 C 106 109, 100 113, 100 113 C 100 113, 94 109, 94 105 Z"
          fill="#4A3428"
        />

        {/* --- MOUTH --- */}
        {mood === 'sad' ? (
          /* Sad Droop Mouth */
          <path
            d="M 92 124 Q 100 117 108 124"
            stroke="#4A3428"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
        ) : mood === 'happy' || mood === 'excited' ? (
          /* Big Happy Open Smile */
          <g>
            <path
              d="M 88 116 Q 100 134 112 116"
              stroke="#4A3428"
              strokeWidth="3"
              strokeLinecap="round"
              fill="#E01E5A"
            />
            <path
              d="M 94 122 Q 100 128 106 122"
              fill="#FF8FAB"
            />
          </g>
        ) : (
          /* Shy Cute Little W Smile */
          <path
            d="M 92 118 Q 96 122 100 118 Q 104 122 108 118"
            stroke="#4A3428"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* --- EYES --- */}
        {isBlinking ? (
          /* Blinking closed slits */
          <g stroke="#4A3428" strokeWidth="3.5" strokeLinecap="round">
            <path d="M 68 94 Q 76 98 84 94" fill="none" />
            <path d="M 116 94 Q 124 98 132 94" fill="none" />
          </g>
        ) : mood === 'sad' ? (
          /* Sad Puppy Eyes with Droop & Glisten */
          <g>
            {/* Sad Eyebrows */}
            <path d="M 68 80 Q 76 86 84 84" stroke="#6C4A32" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <path d="M 132 80 Q 124 86 116 84" stroke="#6C4A32" strokeWidth="2.8" strokeLinecap="round" fill="none" />

            {/* Left Eye */}
            <circle cx="76" cy="94" r="9" fill="#3D291D" />
            <circle cx="73" cy="91" r="3.5" fill="#FFFFFF" />
            <circle cx="78" cy="96" r="1.8" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle cx="124" cy="94" r="9" fill="#3D291D" />
            <circle cx="121" cy="91" r="3.5" fill="#FFFFFF" />
            <circle cx="126" cy="96" r="1.8" fill="#FFFFFF" />
          </g>
        ) : mood === 'happy' || mood === 'excited' ? (
          /* Happy Crescent Eyes */
          <g stroke="#4A3428" strokeWidth="4" strokeLinecap="round" fill="none">
            {/* Happy Eyebrows */}
            <path d="M 68 80 Q 76 74 84 80" strokeWidth="2.5" />
            <path d="M 116 80 Q 124 74 132 80" strokeWidth="2.5" />

            {/* Crescent Happy Eyes */}
            <path d="M 68 94 Q 76 82 84 94" />
            <path d="M 116 94 Q 124 82 132 94" />
          </g>
        ) : (
          /* Shy Eyes Looking Side */
          <g>
            <circle cx="74" cy="94" r="8" fill="#3D291D" />
            <circle cx="71" cy="92" r="3" fill="#FFFFFF" />
            <circle cx="122" cy="94" r="8" fill="#3D291D" />
            <circle cx="119" cy="92" r="3" fill="#FFFFFF" />
          </g>
        )}

        {/* --- PAWS / HANDS --- */}
        {mood === 'happy' ? (
          /* Paws in Air Celebrating */
          <g>
            <motion.ellipse
              cx="46"
              cy="115"
              rx="14"
              ry="12"
              fill="url(#bodyGrad)"
              stroke="#6C4A32"
              strokeWidth="2.8"
              animate={{ y: [-4, 4, -4], rotate: [-10, 10, -10] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="154"
              cy="115"
              rx="14"
              ry="12"
              fill="url(#bodyGrad)"
              stroke="#6C4A32"
              strokeWidth="2.8"
              animate={{ y: [4, -4, 4], rotate: [10, -10, 10] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ) : mood === 'sad' ? (
          /* Paws pleading together 👉👈 */
          <g>
            <ellipse cx="86" cy="148" rx="13" ry="11" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="2.8" />
            <ellipse cx="114" cy="148" rx="13" ry="11" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="2.8" />
            {/* Little paw pads */}
            <circle cx="86" cy="148" r="4" fill="#FFB3C6" />
            <circle cx="114" cy="148" r="4" fill="#FFB3C6" />
          </g>
        ) : (
          /* Normal Resting Paws */
          <g>
            <ellipse cx="60" cy="150" rx="14" ry="12" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="2.8" />
            <ellipse cx="140" cy="150" rx="14" ry="12" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="2.8" />
          </g>
        )}

        {/* --- FEET --- */}
        <ellipse cx="70" cy="184" rx="18" ry="11" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="2.8" />
        <ellipse cx="130" cy="184" rx="18" ry="11" fill="url(#bodyGrad)" stroke="#6C4A32" strokeWidth="2.8" />
        <ellipse cx="70" cy="184" rx="9" ry="6" fill="#FFB3C6" opacity="0.8" />
        <ellipse cx="130" cy="184" rx="9" ry="6" fill="#FFB3C6" opacity="0.8" />
      </motion.svg>
    </div>
  );
};
