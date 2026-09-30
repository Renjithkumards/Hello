import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingHeartsProps {
  isHappyMode?: boolean;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ isHappyMode = false }) => {
  const hearts = useMemo(() => {
    const count = isHappyMode ? 28 : 16;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * (isHappyMode ? 24 : 18),
      duration: 12 + Math.random() * 14,
      delay: Math.random() * 10,
      rotateStart: -20 + Math.random() * 40,
      rotateEnd: -40 + Math.random() * 80,
      opacity: 0.15 + Math.random() * (isHappyMode ? 0.45 : 0.25),
      color: isHappyMode
        ? ['#FB6F92', '#FF8FAB', '#FFB3C6', '#FFCCD5', '#FF5D8F'][i % 5]
        : ['#FFB3C6', '#FFCCD5', '#E8DFF5', '#FCE1E4'][i % 4],
    }));
  }, [isHappyMode]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px]"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            color: heart.color,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -window.innerHeight - 150],
            x: [0, (heart.id % 2 === 0 ? 1 : -1) * (20 + (heart.id % 4) * 10), 0],
            rotate: [heart.rotateStart, heart.rotateEnd],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
