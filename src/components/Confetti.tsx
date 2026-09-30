import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
}

export const ConfettiEffect: React.FC<ConfettiProps> = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Burst 1: Immediate big center explosion
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FB6F92', '#FF8FAB', '#FFB3C6', '#FFD166', '#06D6A0', '#118AB2'],
    });

    // Burst 2: Side cannons
    const end = Date.now() + 3.5 * 1000;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#FB6F92', '#FF8FAB', '#FFD166'],
      });

      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#FB6F92', '#FFB3C6', '#06D6A0'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, [trigger]);

  return null;
};
