import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, GraduationCap, ArrowRight, User, Shield } from 'lucide-react';
import { GradeLevel, Language } from '../../types/quiz';
import { Mascot } from '../mascot/Mascot';
import { translations } from '../../utils/translations';
import { soundFx } from '../../utils/sound';

interface RegistrationScreenProps {
  lang: Language;
  onRegister: (name: string, grade: GradeLevel) => void;
  onOpenLeaderboard: () => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  lang,
  onRegister,
  onOpenLeaderboard,
}) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Grade 4');
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];

  const gradeLabels: Record<GradeLevel, { en: string; ar: string }> = {
    'Grade 4': { en: 'Grade 4 (Easy)', ar: 'الصف الرابع (مبتدئ)' },
    'Grade 5': { en: 'Grade 5 (Medium)', ar: 'الصف الخامس (متوسط)' },
    'Grade 6': { en: 'Grade 6 (Hard)', ar: 'الصف السادس (متقدم)' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      soundFx.playIncorrect();
      setError(t.nameErrorEmpty);
      return;
    }
    if (cleanName.length < 2) {
      soundFx.playIncorrect();
      setError(t.nameErrorShort);
      return;
    }

    soundFx.playClick();
    onRegister(cleanName, grade);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-xl">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-yellow-500/20 border border-indigo-500/40 rounded-full text-indigo-300 text-xs md:text-sm font-bold shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            <span>{t.appBadge}</span>
          </div>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Mascot
            mood="happy"
            size="lg"
            message={lang === 'ar' ? 'أهلاً بك يا بطل! جاهز لتعلم بايثون معي؟' : 'Hi! Ready to learn Python with me?'}
          />
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Subtle glow border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-yellow-400 to-emerald-400" />

          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              {t.appName}
            </h1>
            <p className="text-slate-400 text-sm">
              {t.appSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {t.heroNameLabel}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-500`}>
                  <User className="w-5 h-5 text-indigo-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t.heroNamePlaceholder}
                  maxLength={25}
                  className={`w-full ${lang === 'ar' ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'} py-3.5 bg-slate-950/80 border-2 border-slate-700/80 rounded-2xl text-white placeholder-slate-500 font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all text-base`}
                />
              </div>
              {error && (
                <p className="text-rose-400 text-xs font-bold mt-1.5 pl-1 animate-shake">
                  {error}
                </p>
              )}
            </div>

            {/* Grade Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {t.selectGrade}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['Grade 4', 'Grade 5', 'Grade 6'] as GradeLevel[]).map((g) => {
                  const isSelected = grade === g;
                  return (
                    <button
                      type="button"
                      key={g}
                      onClick={() => {
                        soundFx.playClick();
                        setGrade(g);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white font-extrabold ring-2 ring-indigo-500/40 shadow-lg'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 font-semibold hover:border-slate-600'
                      }`}
                    >
                      <GraduationCap className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-yellow-400' : 'text-slate-500'}`} />
                      <div className="text-xs sm:text-sm font-bold">{gradeLabels[g][lang]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Challenge Info Pill (Fixed 3-lives challenge) */}
            <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-rose-300 font-medium">
              <Shield className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'يبدأ كل طالب بـ 3 قلوب ومحاولات. تجنب مغادرة الشاشة أو تبديل التبويب!'
                  : 'Every student starts with 3 lives. Avoid switching tabs or leaving the screen!'}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl transition active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>{t.startBtn}</span>
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
            </button>
          </form>

          {/* Leaderboard Link */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenLeaderboard();
              }}
              className="text-xs font-bold text-yellow-400 hover:text-yellow-300 inline-flex items-center gap-1.5 transition"
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>{t.viewLeaderboard}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
