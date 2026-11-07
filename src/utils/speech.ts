// Web Speech API Voice Announcements for Kids Interactive Quiz

class VoiceAnnouncer {
  private isMuted: boolean = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(text: string, rate: number = 1.0, pitch: number = 1.1) {
    if (this.isMuted) return;
    if (!('speechSynthesis' in window)) return;

    try {
      // Cancel previous speech to prevent overlapping audio
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 0.85;

      // Pick an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (preferred) {
        utterance.voice = preferred;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  }

  public announceCorrect() {
    const praises = ['Good Job!', 'Excellent!', 'Awesome!', 'Brilliant!'];
    const chosen = praises[Math.floor(Math.random() * praises.length)];
    this.speak(chosen, 1.05, 1.2);
  }

  public announceIncorrect() {
    const encouragements = ['Oops! Try again!', 'Almost there! Keep going!', 'Don\'t worry! You can do it!'];
    const chosen = encouragements[Math.floor(Math.random() * encouragements.length)];
    this.speak(chosen, 0.95, 1.0);
  }

  public announceLifeLost() {
    this.speak('Warning! You lost one life!', 1.0, 1.05);
  }

  public announceVictory() {
    this.speak('Congratulations, Python Hero! Fantastic work!', 1.05, 1.2);
  }

  public announceFailure() {
    this.speak('Challenge failed! Don\'t give up, try again!', 0.95, 1.0);
  }
}

export const announcer = new VoiceAnnouncer();

