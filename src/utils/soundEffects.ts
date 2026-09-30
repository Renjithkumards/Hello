/**
 * Web Audio API synthesizer for cute game-like sound effects.
 * Requires no external audio files, zero latency, 100% offline-ready.
 */
class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = false;

  constructor() {
    // sound is disabled by default until user toggles or explicitly interacts
    const saved = localStorage.getItem('rajitha_sound_enabled');
    if (saved === 'true') {
      this.soundEnabled = true;
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('rajitha_sound_enabled', String(this.soundEnabled));
    if (this.soundEnabled) {
      this.initContext();
      this.playChime();
    }
    return this.soundEnabled;
  }

  public playPop() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // ignore audio context errors
    }
  }

  public playBoing() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.07);
      osc.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  public playChime() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.3);
      });
    } catch {
      // ignore
    }
  }

  public playCelebrationFanfare() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Happy triumphant melody
      const melody = [
        { f: 523.25, d: 0.15, t: 0.0 },   // C5
        { f: 659.25, d: 0.15, t: 0.12 },  // E5
        { f: 783.99, d: 0.15, t: 0.24 },  // G5
        { f: 1046.5, d: 0.35, t: 0.38 },  // C6
        { f: 880.0,  d: 0.2,  t: 0.65 },  // A5
        { f: 1046.5, d: 0.5,  t: 0.85 },  // C6
      ];

      melody.forEach(note => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime + note.t);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.t + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + note.t);
        osc.stop(this.ctx.currentTime + note.t + note.d);
      });
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundManager();
