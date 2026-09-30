import React from 'react';
import { motion } from 'framer-motion';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { fadeInUp, staggerContainer } from '../animations/pageAnimations';
import { CuteCharacter } from './CuteCharacter';
import { ArrowRight, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ReasonsSectionProps {
  onContinueToQuestion: () => void;
  isHappyMode: boolean;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({
  onContinueToQuestion,
  isHappyMode,
}) => {
  const { reasonsSection, interactiveSection } = APOLOGY_CONFIG;

  return (
    <section className="py-16 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-pink-600 bg-pink-100/90 px-3.5 py-1 rounded-full border border-pink-200">
          Pure Facts
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
          {reasonsSection.title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base font-medium">
          {reasonsSection.subtitle}
        </p>
      </div>

      {/* Grid of Reasons Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
      >
        {reasonsSection.cards.map((card, idx) => (
          <motion.div
            key={card.id}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.02, rotate: (idx % 2 === 0 ? 1 : -1) * 1.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onHoverStart={() => sounds.playPop()}
            className="glass-card rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/90 shadow-md group"
          >
            {/* Soft subtle gradient tint */}
            <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-xl opacity-40 bg-gradient-to-br ${card.color}`} />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {card.emoji}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/80 border border-gray-100 text-gray-700 shadow-2xs">
                  {card.tag}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-pink-50 flex items-center text-xs text-pink-500 font-semibold gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
              <span>Reason #{idx + 1}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Bridge Section before question */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="glass-card rounded-3xl sm:rounded-[40px] p-8 sm:p-12 text-center relative overflow-hidden shadow-lg border border-pink-100 max-w-3xl mx-auto"
      >
        <div className="flex flex-col items-center">
          <CuteCharacter
            mood={isHappyMode ? 'happy' : 'shy'}
            size="md"
            onClick={() => sounds.playPop()}
          />

          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-2">
            {isHappyMode ? "You already said yes! 🥰❤️" : interactiveSection.characterAsk}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 max-w-md mb-8">
            {interactiveSection.subAsk}
          </p>

          {!isHappyMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sounds.playPop();
                onContinueToQuestion();
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base sm:text-lg text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all cursor-pointer"
            >
              <span>{interactiveSection.continueButton}</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </section>
  );
};
