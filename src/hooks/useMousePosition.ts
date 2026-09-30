import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  isInside: boolean;
}

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>({
    x: -9999,
    y: -9999,
    isInside: false,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        isInside: true,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          isInside: true,
        });
      }
    };

    const handleMouseLeave = () => {
      setPosition((prev) => ({ ...prev, isInside: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return position;
};
