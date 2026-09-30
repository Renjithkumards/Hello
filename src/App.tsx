import React, { useState, useRef } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { FloatingStars } from './components/FloatingStars';
import { CursorEffects } from './components/CursorEffects';
import { SoundToggle } from './components/SoundToggle';
import { ApologyHero } from './components/ApologyHero';
import { ApologyMessage } from './components/ApologyMessage';
import { ReasonsSection } from './components/ReasonsSection';
import { ForgivenessCard } from './components/ForgivenessCard';
import { Celebration } from './components/Celebration';
import { Footer } from './components/Footer';
import { useMousePosition } from './hooks/useMousePosition';

export const App: React.FC = () => {
  const [isHappyMode, setIsHappyMode] = useState<boolean>(false);
  const mousePosition = useMousePosition();

  const letterRef = useRef<HTMLDivElement>(null);
  const forgivenessRef = useRef<HTMLDivElement>(null);

  const scrollToMessage = () => {
    letterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForgiveness = () => {
    forgivenessRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAccept = () => {
    setIsHappyMode(true);
    // Smooth scroll down to celebration
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleReset = () => {
    setIsHappyMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden">
      {/* Background Animated Atmosphere */}
      <FloatingHearts isHappyMode={isHappyMode} />
      <FloatingStars />
      <CursorEffects mousePosition={mousePosition} />

      {/* Floating Audio Toggle */}
      <SoundToggle />

      {/* Main Story Flow */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 z-10 flex flex-col items-center">
        {/* Step 1: Hero Intro */}
        <ApologyHero
          onScrollToMessage={scrollToMessage}
          isHappyMode={isHappyMode}
        />

        {/* Step 2: Sincere Apology Letter */}
        <div ref={letterRef} className="w-full">
          <ApologyMessage />
        </div>

        {/* Step 3: Cute Reasons & Connection */}
        <div className="w-full">
          <ReasonsSection
            onContinueToQuestion={scrollToForgiveness}
            isHappyMode={isHappyMode}
          />
        </div>

        {/* Step 4: The Moment of Truth (Forgiveness Card OR Celebration) */}
        <div ref={forgivenessRef} className="w-full">
          {isHappyMode ? (
            <Celebration onReset={handleReset} />
          ) : (
            <ForgivenessCard onAccept={handleAccept} isHappyMode={isHappyMode} />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
