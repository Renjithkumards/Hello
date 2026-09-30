import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(sounds.isEnabled());

  const handleToggle = () => {
    const newState = sounds.toggleSound();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold shadow-md backdrop-blur-md transition-all duration-300 border ${
        enabled
          ? 'bg-white/90 text-pink-600 border-pink-300 hover:bg-pink-50 hover:scale-105 ring-2 ring-pink-200'
          : 'bg-white/70 text-gray-500 border-gray-200 hover:bg-white hover:text-gray-700'
      }`}
      title={enabled ? 'Mute Sound Effects' : 'Enable Cute Sound Effects'}
      aria-label="Toggle sound effects"
    >
      {enabled ? (
        <>
          <Volume2 className="w-4 h-4 animate-bounce-subtle text-pink-500" />
          <span>Sound ON 🎵</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-gray-400" />
          <span>Sound OFF</span>
        </>
      )}
    </button>
  );
};
