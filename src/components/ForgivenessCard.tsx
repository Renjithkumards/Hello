import React from 'react';
import { motion } from 'framer-motion';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { CuteCharacter } from './CuteCharacter';
import { ForgivenessButtons } from './ForgivenessButtons';
import { fadeInUp } from '../animations/pageAnimations';
import { HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ForgivenessCardProps {
  id?: string;
  onAccept: () => void;
  isHappyMode: boolean;
}

export const ForgivenessCard: React.FC<ForgivenessCardProps> = ({
  id = 'forgiveness-card',
  onAccept,
  isHappyMode,
}) => {
  const { forgiveness } = APOLOGY_CONFIG;

  if (isHappyMode) {
    return null; // When happy mode is active, the celebration component takes over this stage smoothly!
  }

  return (
    <section id={id} className="py-20 px-4 relative z-10 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUp}
        className="glass-card rounded-3xl sm:rounded-[44px] p-6 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-pink-200/90"
      >
        {/* Glow ambient background rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-pink-100/90 text-pink-700 mb-6 border border-pink-200 shadow-sm relative z-10">
          <HelpCircle className="w-4 h-4 text-pink-500" />
          {forgiveness.badge}
        </div>

        {/* Character */}
        <div className="flex justify-center mb-4 relative z-10">
          <CuteCharacter mood="sad" size="xl" onClick={() => sounds.playPop()} />
        </div>

        {/* Question Titles */}
        <div className="relative z-10 mb-8 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            {forgiveness.heading}
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-pink-600 mb-2">
            {forgiveness.question}
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {forgiveness.plea}
          </p>
        </div>

        {/* The Interactive Buttons */}
        <div className="relative z-10">
          <ForgivenessButtons onAccept={onAccept} />
        </div>
      </motion.div>
    </section>
  );
};
