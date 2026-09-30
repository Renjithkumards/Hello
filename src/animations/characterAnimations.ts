import { Variants } from 'framer-motion';

export const sadCharacterVariants: Variants = {
  initial: { scale: 0.8, opacity: 0, y: 30 },
  animate: {
    scale: 1,
    opacity: 1,
    y: [0, -6, 0],
    transition: {
      scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
      opacity: { duration: 0.6 },
      y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
    }
  }
};

export const happyDanceVariants: Variants = {
  initial: { scale: 0.5, rotate: -20, opacity: 0 },
  animate: {
    scale: [1, 1.08, 1, 1.08, 1],
    rotate: [0, -8, 8, -6, 6, 0],
    y: [0, -20, 0, -20, 0],
    opacity: 1,
    transition: {
      duration: 1.6,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

export const floatingTearVariants: Variants = {
  animate: {
    y: [0, 24],
    opacity: [0, 0.85, 0],
    scale: [0.6, 1, 0.3],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeIn"
    }
  }
};
