import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const FloatingStars: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      top: Math.random() * 96 + 2,
      size: 10 + Math.random() * 12,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-300"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            fontSize: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [star.opacity * 0.5, star.opacity * 1.5, star.opacity * 0.5],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};
