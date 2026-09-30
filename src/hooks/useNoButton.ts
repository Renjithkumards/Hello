import { useState, useCallback, useRef } from 'react';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { sounds } from '../utils/soundEffects';

export interface NoButtonState {
  x: number;
  y: number;
  escapesCount: number;
  message: string;
  isEscaping: boolean;
  mood: 'normal' | 'shocked' | 'taunting';
}

export const useNoButton = (containerRef: React.RefObject<HTMLElement>) => {
  const [state, setState] = useState<NoButtonState>({
    x: 0,
    y: 0,
    escapesCount: 0,
    message: APOLOGY_CONFIG.forgiveness.noButtonText,
    isEscaping: false,
    mood: 'normal',
  });

  const lastEscapeTime = useRef<number>(0);
  const messages = APOLOGY_CONFIG.noButtonConfig.escapeMessages;

  const triggerEscape = useCallback((cursorX?: number, cursorY?: number) => {
    const now = performance.now();
    // throttle slightly so it doesn't calculate multiple times per single gesture
    if (now - lastEscapeTime.current < 180) return;
    lastEscapeTime.current = now;

    // Pick random message
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    // Calculate safe boundaries
    let bounds = { minX: -140, maxX: 140, minY: -100, maxY: 100 };

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const padding = 35;
      const halfW = Math.max(80, (containerRect.width / 2) - padding);
      const halfH = Math.max(60, (containerRect.height / 2) - padding);
      bounds = {
        minX: -halfW,
        maxX: halfW,
        minY: -halfH,
        maxY: halfH,
      };
    }

    setState((prev) => {
      let targetX = 0;
      let targetY = 0;

      // If we have cursor position, push away in opposite direction
      if (cursorX !== undefined && cursorY !== undefined && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerContainerX = rect.left + rect.width / 2;
        const centerContainerY = rect.top + rect.height / 2;

        const currentBtnX = centerContainerX + prev.x;
        const currentBtnY = centerContainerY + prev.y;

        const dirX = currentBtnX - cursorX;
        const dirY = currentBtnY - cursorY;
        const mag = Math.hypot(dirX, dirY) || 1;

        // Jump 100px - 180px in opposite direction with random angle deviation
        const jumpDist = 120 + Math.random() * 80;
        const randomAngle = (Math.random() - 0.5) * 0.8; // jitter
        const cos = Math.cos(randomAngle);
        const sin = Math.sin(randomAngle);
        const normX = (dirX / mag) * cos - (dirY / mag) * sin;
        const normY = (dirX / mag) * sin + (dirY / mag) * cos;

        targetX = prev.x + normX * jumpDist;
        targetY = prev.y + normY * jumpDist;

        // If it goes out of bounds, bounce back inside
        if (targetX < bounds.minX || targetX > bounds.maxX) {
          targetX = (Math.random() > 0.5 ? 1 : -1) * (bounds.maxX * (0.4 + Math.random() * 0.4));
        }
        if (targetY < bounds.minY || targetY > bounds.maxY) {
          targetY = (Math.random() > 0.5 ? 1 : -1) * (bounds.maxY * (0.4 + Math.random() * 0.4));
        }
      } else {
        // Pure random displacement away from 0,0
        const randomSignX = Math.random() > 0.5 ? 1 : -1;
        const randomSignY = Math.random() > 0.5 ? 1 : -1;
        targetX = randomSignX * (60 + Math.random() * (bounds.maxX - 60));
        targetY = randomSignY * (40 + Math.random() * (bounds.maxY - 40));
      }

      // Clamp target within safe boundaries
      targetX = Math.min(Math.max(targetX, bounds.minX), bounds.maxX);
      targetY = Math.min(Math.max(targetY, bounds.minY), bounds.maxY);

      return {
        x: targetX,
        y: targetY,
        escapesCount: prev.escapesCount + 1,
        message: randomMsg,
        isEscaping: true,
        mood: 'taunting',
      };
    });

    sounds.playBoing();

    // Reset escaping flag after animation settles
    setTimeout(() => {
      setState((p) => ({ ...p, isEscaping: false }));
    }, 400);
  }, [containerRef, messages]);

  const reset = useCallback(() => {
    setState({
      x: 0,
      y: 0,
      escapesCount: 0,
      message: APOLOGY_CONFIG.forgiveness.noButtonText,
      isEscaping: false,
      mood: 'normal',
    });
  }, []);

  return {
    state,
    triggerEscape,
    reset,
  };
};
