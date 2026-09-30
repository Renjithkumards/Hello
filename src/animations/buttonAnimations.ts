import { Variants } from 'framer-motion';

export const yesButtonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.08,
    boxShadow: "0px 15px 35px rgba(251, 111, 146, 0.45)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  },
  tap: { scale: 0.95 }
};

export const pulseHeartIcon: Variants = {
  animate: {
    scale: [1, 1.25, 1, 1.25, 1],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
