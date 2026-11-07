// Instant-response Web Speech API Voice Announcements for Kids Interactive Quiz (Bilingual EN/AR)
import { Language } from '../types/quiz';

class VoiceAnnouncer {
  private isMuted: boolean = false;
  private currentLang: Language = 'ar';
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public setLanguage(lang: Language) {
    this.currentLang = lang;
  }

  public speak(text: string, rate: number = 1.25, pitch: number = 1.1) {
    if (this.isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      // 1. Immediately cancel any pending speech
      window.speechSynthesis.cancel();

      // 2. Resume in case browser suspended speech engine (fixes Chrome/Edge delay)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate; // fast speech for snappy game feel
      utterance.pitch = pitch;
      utterance.volume = 1.0;

      const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();

      if (this.currentLang === 'ar') {
        utterance.lang = 'ar-SA';
        const arVoice = voices.find(v => v.lang.startsWith('ar'));
        if (arVoice) {
          utterance.voice = arVoice;
        }
      } else {
        utterance.lang = 'en-US';
        const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
        if (enVoice) {
          utterance.voice = enVoice;
        }
      }

      // 3. Fire immediately
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  }

  public announceCorrect() {
    if (this.currentLang === 'ar') {
      const praisesAr = [
        'أحسنت!',
        'ممتاز!',
        'رائع يا بطل!',
        'برافو عليك!',
        'إجابة صحيحة!'
      ];
      const chosen = praisesAr[Math.floor(Math.random() * praisesAr.length)];
      this.speak(chosen, 1.3, 1.15);
    } else {
      const praisesEn = ['Great job!', 'Awesome!', 'Brilliant!', 'Correct!', 'Super!'];
      const chosen = praisesEn[Math.floor(Math.random() * praisesEn.length)];
      this.speak(chosen, 1.25, 1.2);
    }
  }

  public announceIncorrect() {
    if (this.currentLang === 'ar') {
      const encouragementsAr = [
        'إجابة خاطئة!',
        'حاول مجدداً!',
        'ركز يا بطل!',
        'لا بأس، حاول ثانية!'
      ];
      const chosen = encouragementsAr[Math.floor(Math.random() * encouragementsAr.length)];
      this.speak(chosen, 1.25, 1.05);
    } else {
      const encouragementsEn = ['Try again!', 'Keep going!', 'Almost!', 'Focus hero!'];
      const chosen = encouragementsEn[Math.floor(Math.random() * encouragementsEn.length)];
      this.speak(chosen, 1.2, 1.0);
    }
  }

  public announceLifeLost() {
    if (this.currentLang === 'ar') {
      this.speak('انتبه! خسرت محاولة!', 1.25, 1.0);
    } else {
      this.speak('Warning! One life lost!', 1.25, 1.05);
    }
  }

  public announceVictory() {
    if (this.currentLang === 'ar') {
      this.speak('مبروك يا بطل بايثون! فوز عظيم!', 1.2, 1.15);
    } else {
      this.speak('Congratulations Python Hero! You won!', 1.2, 1.2);
    }
  }

  public announceFailure() {
    if (this.currentLang === 'ar') {
      this.speak('انتهت المحاولات! حاول ثانية!', 1.2, 1.0);
    } else {
      this.speak('Challenge failed! Try again!', 1.2, 1.0);
    }
  }
}

export const announcer = new VoiceAnnouncer();
