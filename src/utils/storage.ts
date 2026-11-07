import { StudentSession, LeaderboardEntry, Language } from '../types/quiz';

const SESSION_KEY = 'pykids_quiz_session';
const LEADERBOARD_KEY = 'pykids_leaderboard';
const SOUND_MUTE_KEY = 'pykids_sound_muted';
const LANG_KEY = 'pykids_lang';

export const storage = {
  // Session handling
  getSession: (): StudentSession | null => {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveSession: (session: StudentSession): void => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('LocalStorage error saving session', e);
    }
  },

  clearSession: (): void => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.warn('LocalStorage error clearing session', e);
    }
  },

  // Leaderboard handling
  getLeaderboard: (): LeaderboardEntry[] => {
    try {
      const data = localStorage.getItem(LEADERBOARD_KEY);
      if (!data) return [];
      const list: LeaderboardEntry[] = JSON.parse(data);
      // Sort: Highest score first, then shortest time, then date
      return list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.completionTimeSeconds !== b.completionTimeSeconds) {
          return a.completionTimeSeconds - b.completionTimeSeconds;
        }
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      });
    } catch {
      return [];
    }
  },

  saveLeaderboardEntry: (entry: LeaderboardEntry): LeaderboardEntry[] => {
    try {
      const current = storage.getLeaderboard();
      const updated = [entry, ...current.filter(item => item.id !== entry.id)];
      const sorted = updated.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.completionTimeSeconds !== b.completionTimeSeconds) {
          return a.completionTimeSeconds - b.completionTimeSeconds;
        }
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      }).slice(0, 50);

      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted));
      return sorted;
    } catch (e) {
      console.warn('LocalStorage error saving leaderboard', e);
      return [];
    }
  },

  // Sound preference
  isSoundMuted: (): boolean => {
    try {
      return localStorage.getItem(SOUND_MUTE_KEY) === 'true';
    } catch {
      return false;
    }
  },

  setSoundMuted: (muted: boolean): void => {
    try {
      localStorage.setItem(SOUND_MUTE_KEY, String(muted));
    } catch (e) {
      console.warn('LocalStorage error saving sound preference', e);
    }
  },

  // Language preference
  getLanguage: (): Language => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return (saved === 'en' || saved === 'ar') ? saved : 'ar';
    } catch {
      return 'ar';
    }
  },

  setLanguage: (lang: Language): void => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      console.warn('LocalStorage error saving language preference', e);
    }
  }
};
