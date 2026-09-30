export interface ReasonCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tag: string;
  color: string;
}

export const APOLOGY_CONFIG = {
  recipientName: "Rajitha",
  hero: {
    greeting: "Hey Rajitha... 🥺",
    subtitle: "I have something really important to tell you...",
    apologyLine: "Rajitha, I'm really really sorry... 🥺💗",
    scrollHint: "Scroll down with an open heart 👇",
  },
  letter: {
    badge: "A message straight from the heart",
    heading: "I'm Truly Sorry, Rajitha 💗",
    paragraphs: [
      "I know I messed up, and I'm genuinely, wholeheartedly sorry.",
      "I never ever wanted to hurt your feelings or make you upset with me. Sometimes my words or actions stumble, but that doesn't mean you don't matter to me.",
      "You are genuinely one of the sweetest, most special people in my life, and the thought of causing you any sadness hurts me deeply.",
      "Our friendship is priceless to me, and I sincerely hope you can find it in your kind heart to forgive me."
    ],
    signature: "From your regretful bestie 🥺👉👈",
  },
  reasonsSection: {
    title: "Why I Can't Stand Being in the Doghouse 🥺",
    subtitle: "A few genuine reminders of why your happiness matters so much to me",
    cards: [
      {
        id: "smile",
        emoji: "😊",
        title: "Your Smile Lights Up Everything",
        description: "Your genuine laughter is the brightest thing ever. Seeing you upset is the worst feeling in the world.",
        tag: "Too Precious",
        color: "from-pink-100 to-rose-100 border-pink-200 text-pink-700",
      },
      {
        id: "fun",
        emoji: "✨",
        title: "Everything Is Better With You",
        description: "Every funny moment, conversation, and random story is 1000x more fun when you're happy and laughing.",
        tag: "Irreplaceable",
        color: "from-purple-100 to-indigo-100 border-purple-200 text-purple-700",
      },
      {
        id: "guilt",
        emoji: "🥺",
        title: "I Hate Seeing You Mad At Me",
        description: "My day just feels incomplete and gloomy whenever we are not okay. I miss our normal cheerful vibes.",
        tag: "Sad Vibes",
        color: "from-yellow-100 to-amber-100 border-yellow-200 text-amber-700",
      },
      {
        id: "friendship",
        emoji: "💗",
        title: "Our Friendship Means The World",
        description: "Good friends are rare gems, and you are absolute gold. I never want silly mistakes to come between us.",
        tag: "True Bond",
        color: "from-rose-100 to-pink-100 border-rose-200 text-rose-700",
      },
      {
        id: "promise",
        emoji: "🤞",
        title: "I Promise To Do Better",
        description: "I've learned my lesson and I will be much more thoughtful, caring, and attentive going forward!",
        tag: "Pinky Promise",
        color: "from-emerald-100 to-teal-100 border-emerald-200 text-emerald-700",
      },
    ] as ReasonCard[],
  },
  interactiveSection: {
    characterAsk: "Can we please be okay again? 🥺",
    subAsk: "I promise I'll try my absolute best to make it up to you with treats and good vibes!",
    continueButton: "Continue To Question ❤️",
  },
  forgiveness: {
    badge: "Moment of Truth",
    heading: "One Last Question, Rajitha... 🥺",
    question: "Will you forgive me?",
    plea: "Pretty please with extra sugar on top? 🥺👉👈",
    yesButtonText: "Yes, I Forgive You ❤️",
    noButtonText: "No 😤",
  },
  noButtonConfig: {
    proximityThreshold: 110, // pixels
    shakeThreshold: 160, // pixels
    escapeMessages: [
      "Nope! 😜",
      "Too slow! 😂",
      "Catch me first! 🏃‍♀️",
      "Are you sure? 👀",
      "Try again! 😝",
      "Nice try! 😂",
      "Can't touch this! 💃",
      "Wrong answer! 🙈",
      "Look at the other button! 👉",
      "Think about my cute puppy eyes! 🥺",
      "Nu-uh! 🧸",
      "Mission impossible! 🕵️‍♀️",
    ],
  },
  celebration: {
    title: "YAYYYYY!!! 🥳🎉💗",
    heroBadge: "Friendship Restored 100% ✨",
    subtitle: "Rajitha forgave me! 😭❤️",
    thankYou: "Thank you so much, Rajitha! 🥰",
    body: "You just made my entire year! I promise to be the best friend ever and cherish our friendship forever.",
    treatPromise: "Next Boba / Ice cream / Treat is 100% on me! 🍦🧋✨",
    resetButtonText: "Replay The Cuteness ↺",
  },
  footer: {
    line1: "Made with a lot of sorry, a little bit of panic, and lots of ❤️",
    line2: "Exclusively for Rajitha ✨",
  }
};
