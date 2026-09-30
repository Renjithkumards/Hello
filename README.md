# Sorry Rajitha ❤️

A beautifully designed, interactive, emotional, and playful apology website created especially for **Rajitha**.

This microsite tells a warm, heartfelt story transitioning from sadness to joyful forgiveness with micro-animations, an evasive escape button, interactive audio effects, and celebration confetti.

---

## ✨ Features

- **Story-driven progression**: Starts with a sad mascot bear asking for a moment, shares sincere reflections and friendship memories, and culminates in an interactive question.
- **Custom SVG Animated Mascot**: Fully vector-based character supporting **Sad**, **Happy**, **Excited**, and **Shy** moods with natural blinking, breathing, falling tears, and celebratory dancing animations.
- **Playful Escaping "No 😤" Button**:
  - Proximity detection triggers smooth evasion via spring physics before the cursor can click it.
  - Dynamically displays funny quips (*"Nope! 😜"*, *"Too slow! 😂"*, *"Catch me first! 🏃‍♀️"*).
  - Keeps the button safe within visible viewport bounds without horizontal scrolling.
  - Mobile & touch optimized (evades tap gestures on mobile devices).
- **Celebratory "Yes, I Forgive You ❤️" Transition**:
  - Pulsing glowing CTA button.
  - Triggers instant **Happy Mode**: mascot starts dancing, confetti bursts across the screen, hearts rain down, and victory fanfare plays.
- **Synthesizer Sound Effects**:
  - Built-in Web Audio API synthesizer for zero latency and 100% offline capability (no external audio files needed).
  - Floating sound toggle button in the top corner (defaults to muted until toggled by the user).
- **Customizable & Clean**: All text, reasons, quotes, colors, and animation thresholds are centralized in a single data configuration file.
- **Accessible & Performant**: Supports `prefers-reduced-motion`, responsive down to 320px screens, keyboard navigable, and passes production builds cleanly.

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (Blazing fast build tool & dev server)
- **Tailwind CSS** (Custom pastel theme, glassmorphism, and responsive utilities)
- **Framer Motion** (Spring physics, floating transitions, and viewport reveals)
- **Canvas Confetti** (Lightweight celebration particle cannon)
- **Lucide React** (Crisp modern icons)
- **Web Audio API** (Procedural chime and fanfare synthesis)

---

## 📁 Project Structure

```
rajitha-apology/
│
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── characters/
│       ├── sounds/
│       └── illustrations/
│
├── src/
│   ├── components/
│   │   ├── CuteCharacter.tsx      # Multi-mood animated SVG mascot
│   │   ├── FloatingHearts.tsx     # Ambient floating hearts
│   │   ├── FloatingStars.tsx      # Twinkling star particles
│   │   ├── CursorEffects.tsx      # Subtle desktop cursor sparkles
│   │   ├── SoundToggle.tsx        # Floating audio enable/mute button
│   │   ├── ApologyHero.tsx        # Opening greeting & mascot intro
│   │   ├── ApologyMessage.tsx     # Sincere apology letter card
│   │   ├── ReasonsSection.tsx     # Cute interactive reason cards
│   │   ├── ForgivenessCard.tsx    # Question stage container
│   │   ├── ForgivenessButtons.tsx # Yes button & escaping No button
│   │   ├── Confetti.tsx           # Celebratory canvas particle cannon
│   │   ├── Celebration.tsx        # Happy Mode victory & treat promise
│   │   └── Footer.tsx             # Warm closing footer
│   │
│   ├── hooks/
│   │   ├── useMousePosition.ts    # Mouse & touch coordinate tracker
│   │   ├── useProximity.ts        # Proximity vector calculator
│   │   └── useNoButton.ts         # Spring physics escape algorithm
│   │
│   ├── animations/
│   │   ├── characterAnimations.ts # Mascot keyframes
│   │   ├── pageAnimations.ts      # Viewport reveal variants
│   │   └── buttonAnimations.ts    # Pulse and button hover states
│   │
│   ├── data/
│   │   └── apologyContent.ts      # Central configuration for all content
│   │
│   ├── utils/
│   │   └── soundEffects.ts        # Web Audio API procedural sound engine
│   │
│   ├── App.tsx                    # Main interactive story controller
│   ├── main.tsx                   # React root entry
│   ├── index.css                  # Custom styling & glassmorphism
│   └── vite-env.d.ts
│
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Customization Guide

All text, reasons, quotes, and parameters can be easily edited in `src/data/apologyContent.ts`:

- **Recipient Name & Greeting**: Modify `APOLOGY_CONFIG.recipientName` and `APOLOGY_CONFIG.hero`.
- **Apology Body Paragraphs**: Edit `APOLOGY_CONFIG.letter.paragraphs`.
- **Reason Cards**: Add or modify items in `APOLOGY_CONFIG.reasonsSection.cards`.
- **No Button Escape Quotes**: Customize the phrases in `APOLOGY_CONFIG.noButtonConfig.escapeMessages`.
- **Escape Proximity Sensitivity**: Adjust `APOLOGY_CONFIG.noButtonConfig.proximityThreshold` (default: `110px`).
- **Post-Forgiveness Treat & Message**: Update `APOLOGY_CONFIG.celebration`.

---

## ☁️ Deployment (Vercel Ready)

This project is configured out of the box for standard Vite deployments on **Vercel**:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
