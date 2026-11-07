import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Heart,
  Clock,
  Home
} from 'lucide-react';
import { Mascot } from '../mascot/Mascot';
import { Language } from '../../types/quiz';
import { translations } from '../../utils/translations';
import { soundFx } from '../../utils/sound';
import { announcer } from '../../utils/speech';

interface VictoryScreenProps {
  studentName: string;
  grade: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  remainingLives: number;
  completionTimeFormatted: string;
  lang: Language;
  onPlayAgain: () => void;
  onReviewAnswers: () => void;
  onViewLeaderboard: () => void;
  onGoHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  studentName,
  grade,
  score,
  totalQuestions,
  correctCount,
  incorrectCount,
  remainingLives,
  completionTimeFormatted,
  lang,
  onPlayAgain,
  onReviewAnswers,
  onViewLeaderboard,
  onGoHome,
}) => {
  const t = translations[lang];
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    soundFx.playCelebration();
    announcer.announceVictory();

    // Fire Confetti!
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const getTierInfo = () => {
    if (percentage >= 90) {
      return {
        title: lang === 'ar' ? 'مذهل! أنت عبقري وبطل بايثون الحقيقي!' : "Outstanding! You're a Python Master!",
        color: 'from-amber-400 to-yellow-500',
        badge: lang === 'ar' ? 'خبير بايثون الذهبي 🏆' : 'Python Grand Master 🏆',
        mood: 'cool' as const,
      };
    }
    if (percentage >= 70) {
      return {
        title: lang === 'ar' ? 'عمل ممتاز ورائع جداً!' : 'Excellent Work!',
        color: 'from-emerald-400 to-teal-500',
        badge: lang === 'ar' ? 'بطل بايثون المتألق ⭐' : 'Python Hero ⭐',
        mood: 'celebrating' as const,
      };
    }
    if (percentage >= 50) {
      return {
        title: lang === 'ar' ? 'مجهود رائع! استمر في التمرين وستصل للقمة!' : 'Good Effort! Keep Practicing!',
        color: 'from-blue-400 to-indigo-500',
        badge: lang === 'ar' ? 'مغامر بايثون 🚀' : 'Python Adventurer 🚀',
        mood: 'happy' as const,
      };
    }
    return {
      title: lang === 'ar' ? 'واصل التعلم ولا تستسلم أبداً!' : 'Keep Learning! Never Give Up!',
      color: 'from-purple-400 to-pink-500',
      badge: lang === 'ar' ? 'مستكشف بايثون 🧭' : 'Python Explorer 🧭',
      mood: 'thinking' as const,
    };
  };

  const tier = getTierInfo();

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl relative text-center overflow-hidden"
      >
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-emerald-400 to-indigo-500" />

        {/* Mascot */}
        <div className="flex justify-center -mt-2 mb-2">
          <Mascot
            mood={tier.mood}
            size="md"
            message={lang === 'ar' ? `فخور بك جداً يا ${studentName}!` : `Proud of you, ${studentName}!`}
          />
        </div>

        {/* Congratulations header */}
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-300 text-xs font-bold mb-3">
          <Award className="w-4 h-4 text-yellow-400" />
          <span>{tier.badge}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          {lang === 'ar' ? `مبروك يا بطل بايثون، ${studentName}!` : `Congratulations, Python Hero ${studentName}!`}
        </h1>

        <p className={`text-lg md:text-xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-6`}>
          {tier.title}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {/* Final Score */}
          <div className="p-3.5 bg-slate-950/70 border border-amber-500/30 rounded-2xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.finalScore}
            </span>
            <span className="text-2xl font-black text-amber-400">{score}</span>
            <span className="text-xs text-slate-500 block">{t.ptsLabel}</span>
          </div>

          {/* Accuracy Percentage */}
          <div className="p-3.5 bg-slate-950/70 border border-emerald-500/30 rounded-2xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.accuracy}
            </span>
            <span className="text-2xl font-black text-emerald-400">{percentage}%</span>
            <span className="text-xs text-slate-500 block">{correctCount}/{totalQuestions} {t.correctAnswers}</span>
          </div>

          {/* Remaining Lives */}
          <div className="p-3.5 bg-slate-950/70 border border-rose-500/30 rounded-2xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.livesLabel}
            </span>
            <div className="flex items-center justify-center gap-1 my-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${
                    i < remainingLives
                      ? 'text-rose-500 fill-rose-500'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500 block">{remainingLives} / 3</span>
          </div>

          {/* Time Taken */}
          <div className="p-3.5 bg-slate-950/70 border border-sky-500/30 rounded-2xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.totalTime}
            </span>
            <div className="flex items-center justify-center gap-1 text-sky-400 my-1 font-mono text-xl font-bold">
              <Clock className="w-4 h-4" />
              <span>{completionTimeFormatted}</span>
            </div>
            <span className="text-xs text-slate-500 block">{lang === 'ar' ? 'دقيقة : ثانية' : 'minutes:seconds'}</span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="flex items-center justify-center gap-6 p-3 bg-slate-800/40 rounded-2xl mb-6 text-sm font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.correctAnswers}: {correctCount}</span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-rose-400">
            <XCircle className="w-4 h-4" />
            <span>{t.incorrectAnswers}: {incorrectCount}</span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="text-slate-400">
            {lang === 'ar' ? 'المرحلة:' : 'Grade:'} <span className="text-white font-bold">{grade}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onGoHome();
            }}
            className="py-3 px-4 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <Home className="w-4 h-4 text-sky-400" />
            <span>{t.homePage}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onReviewAnswers();
            }}
            className="py-3 px-4 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>{t.reviewAnswers}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onViewLeaderboard();
            }}
            className="py-3 px-4 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>{t.leaderboardTitle}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onPlayAgain();
            }}
            className="py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.playAgain}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
