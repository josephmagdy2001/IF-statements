import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RotateCcw, BookOpen, AlertOctagon, Home } from 'lucide-react';
import { Mascot } from '../mascot/Mascot';
import { Language } from '../../types/quiz';
import { translations } from '../../utils/translations';
import { soundFx } from '../../utils/sound';
import { announcer } from '../../utils/speech';

interface FailedScreenProps {
  studentName: string;
  grade: string;
  answeredCount: number;
  totalQuestions: number;
  lang: Language;
  onRetry: () => void;
  onReviewAnswers: () => void;
  onGoHome: () => void;
}

export const FailedScreen: React.FC<FailedScreenProps> = ({
  studentName,
  grade,
  answeredCount,
  totalQuestions,
  lang,
  onRetry,
  onReviewAnswers,
  onGoHome,
}) => {
  const t = translations[lang];

  useEffect(() => {
    soundFx.playWarning();
    announcer.announceFailure();
  }, []);

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl bg-slate-900/90 border-2 border-rose-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.3)] backdrop-blur-xl relative text-center overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 animate-pulse" />

        <div className="flex justify-center -mt-2 mb-2">
          <Mascot
            mood="sad"
            size="md"
            message={lang === 'ar' ? `لا تحزن يا ${studentName}! تستطيع المحاولة مجدداً!` : `Don't be sad, ${studentName}! Try again!`}
          />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-300 text-xs font-bold mb-3">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>{lang === 'ar' ? 'استنفاد بروتوكول الأمان' : 'Security Protocol Reached Limit'}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center justify-center gap-2">
          <AlertOctagon className="w-8 h-8 text-rose-500 inline" />
          {t.failedTitle}
        </h1>

        <p className="text-rose-300 font-bold text-base mb-1">
          {lang === 'ar'
            ? `يا ${studentName}، لقد خسرت جميع المحاولات الثلاث بسبب مغادرة الشاشة!`
            : `${studentName}, you lost all 3 lives due to leaving the quiz screen!`}
        </p>
        <p className="text-xs md:text-sm text-slate-400 mb-6">
          {t.failedSubtitle}
        </p>

        {/* Summary Card */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold block mb-1">
                {lang === 'ar' ? 'المرحلة الدراسية' : 'Grade Level'}
              </span>
              <span className="text-lg font-black text-white">{grade}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold block mb-1">
                {t.questionsReached}
              </span>
              <span className="text-lg font-black text-yellow-400">{answeredCount} / {totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onGoHome();
            }}
            className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <Home className="w-4 h-4 text-sky-400" />
            <span>{t.homePage}</span>
          </button>

          {answeredCount > 0 && (
            <button
              onClick={() => {
                soundFx.playClick();
                onReviewAnswers();
              }}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>{t.reviewAnswers}</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onRetry();
            }}
            className="flex-1 py-3.5 px-6 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.retryBtn}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
