import React, { useState, useEffect } from 'react';
import { MousePosition } from '../hooks/useMousePosition';

interface CursorEffectsProps {
  mousePosition: MousePosition;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
}

export const CursorEffects: React.FC<CursorEffectsProps> = ({ mousePosition }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!mousePosition.isInside) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Only create a particle on some movements to avoid DOM bloat
    if (Math.random() > 0.35) return;

    const emojis = ['✨', '💖', '🌸', '⭐', '🤍'];
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: mousePosition.x + (Math.random() - 0.5) * 16,
      y: mousePosition.y + (Math.random() - 0.5) * 16,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: 12 + Math.floor(Math.random() * 8),
    };

    setParticles((prev) => [...prev.slice(-12), newParticle]);

    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 700);

    return () => clearTimeout(timer);
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none transition-all duration-700 ease-out"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'twinkle 0.7s forwards ease-out',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};
