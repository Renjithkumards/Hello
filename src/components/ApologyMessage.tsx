import React from 'react';
import { motion } from 'framer-motion';
import { APOLOGY_CONFIG } from '../data/apologyContent';
import { fadeInUp } from '../animations/pageAnimations';
import { Mail, Sparkles } from 'lucide-react';

interface ApologyMessageProps {
  id?: string;
}

export const ApologyMessage: React.FC<ApologyMessageProps> = ({ id = 'apology-message' }) => {
  const { letter } = APOLOGY_CONFIG;

  return (
    <section id={id} className="py-20 px-4 relative z-10 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeInUp}
        className="glass-card rounded-3xl sm:rounded-[36px] p-6 sm:p-12 relative overflow-hidden shadow-xl border border-white/80"
      >
        {/* Soft Background Accents */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-pink-100/90 text-pink-700 mb-4 border border-pink-200 shadow-sm">
            <Mail className="w-4 h-4 text-pink-500" />
            {letter.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
            {letter.heading}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full my-2" />
        </div>

        {/* Apology Body Paragraphs */}
        <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed relative z-10">
          {letter.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="bg-white/40 p-4 sm:p-5 rounded-2xl border border-white/60 shadow-xs"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10"
        >
          <div className="flex items-center gap-2 text-pink-600 font-bold text-sm sm:text-base">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{letter.signature}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-pink-50/80 px-3 py-1.5 rounded-full">
            <span>Written with 100% sincerity</span>
            <span>💌</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
