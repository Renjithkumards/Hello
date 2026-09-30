import { RefObject, useMemo } from 'react';
import { MousePosition } from './useMousePosition';

export const useProximity = (
  elementRef: RefObject<HTMLElement>,
  mousePosition: MousePosition,
  threshold: number = 120
) => {
  return useMemo(() => {
    if (!elementRef.current || !mousePosition.isInside) {
      return { isNear: false, distance: Infinity, angle: 0, deltaX: 0, deltaY: 0 };
    }

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    const isNear = distance < threshold;
    const angle = Math.atan2(deltaY, deltaX);

    return {
      isNear,
      distance,
      angle,
      deltaX,
      deltaY,
      centerX,
      centerY,
      rect,
    };
  }, [elementRef, mousePosition, threshold]);
};
