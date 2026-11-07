// Web Speech API Voice Announcements for Kids Interactive Quiz (Bilingual EN/AR)
import { Language } from '../types/quiz';

class VoiceAnnouncer {
  private isMuted: boolean = false;
  private currentLang: Language = 'en';

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public setLanguage(lang: Language) {
    this.currentLang = lang;
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
      utterance.volume = 0.95;

      const voices = window.speechSynthesis.getVoices();

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

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  }

  public announceCorrect() {
    if (this.currentLang === 'ar') {
      const praisesAr = [
        'أحسنت! إجابة صحيحة وممتازة!',
        'رائع جداً يا بطل بايثون!',
        'إجابة عبقرية! برافو!',
        'ممتاز جداً! استمر هكذا!'
      ];
      const chosen = praisesAr[Math.floor(Math.random() * praisesAr.length)];
      this.speak(chosen, 1.0, 1.1);
    } else {
      const praisesEn = ['Good Job!', 'Excellent!', 'Awesome!', 'Brilliant!'];
      const chosen = praisesEn[Math.floor(Math.random() * praisesEn.length)];
      this.speak(chosen, 1.05, 1.2);
    }
  }

  public announceIncorrect() {
    if (this.currentLang === 'ar') {
      const encouragementsAr = [
        'إجابة غير صحيحة! حاول مرة أخرى!',
        'لا بأس يا بطل، راجع الشرح وركز جيداً!',
        'قريب جداً! استمر ولا تستسلم!'
      ];
      const chosen = encouragementsAr[Math.floor(Math.random() * encouragementsAr.length)];
      this.speak(chosen, 1.0, 1.0);
    } else {
      const encouragementsEn = ['Oops! Try again!', 'Almost there! Keep going!', "Don't worry! You can do it!"];
      const chosen = encouragementsEn[Math.floor(Math.random() * encouragementsEn.length)];
      this.speak(chosen, 0.95, 1.0);
    }
  }

  public announceLifeLost() {
    if (this.currentLang === 'ar') {
      this.speak('تحذير! لقد خسرت محاولة واحدة بسبب مغادرة الشاشة!', 1.0, 1.0);
    } else {
      this.speak('Warning! You lost one life!', 1.0, 1.05);
    }
  }

  public announceVictory() {
    if (this.currentLang === 'ar') {
      this.speak('مبروك يا بطل بايثون! لقد أنجزت التحدي ببراعة وتفوق!', 1.0, 1.1);
    } else {
      this.speak('Congratulations, Python Hero! Fantastic work!', 1.05, 1.2);
    }
  }

  public announceFailure() {
    if (this.currentLang === 'ar') {
      this.speak('انتهت المحاولات! لا تحزن يا بطل، حاول مرة أخرى وستنجح!', 1.0, 1.0);
    } else {
      this.speak("Challenge failed! Don't give up, try again!", 0.95, 1.0);
    }
  }
}

export const announcer = new VoiceAnnouncer();
