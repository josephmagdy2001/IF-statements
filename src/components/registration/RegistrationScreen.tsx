import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, BookOpen, GraduationCap, ShieldAlert, ArrowRight, User } from 'lucide-react';
import { GradeLevel, GameMode } from '../../types/quiz';
import { Mascot } from '../mascot/Mascot';
import { soundFx } from '../../utils/sound';

interface RegistrationScreenProps {
  onRegister: (name: string, grade: GradeLevel, mode: GameMode) => void;
  onOpenLeaderboard: () => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  onRegister,
  onOpenLeaderboard,
}) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Grade 4');
  const [mode, setMode] = useState<GameMode>('student');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      soundFx.playIncorrect();
      setError('Please enter your hero name to start!');
      return;
    }
    if (cleanName.length < 2) {
      soundFx.playIncorrect();
      setError('Name must be at least 2 characters long!');
      return;
    }

    soundFx.playClick();
    onRegister(cleanName, grade, mode);
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
            <span>Python If / Else / Elif Master Challenge</span>
          </div>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Mascot mood="happy" size="lg" message="Hi! Ready to learn Python with me?" />
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
              Python Kids Quiz
            </h1>
            <p className="text-slate-400 text-sm">
              Level up your programming superpower and solve maze & traffic logic!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Your Hero Name:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-5 h-5 text-indigo-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. Alex, Maya, Omar..."
                  maxLength={25}
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border-2 border-slate-700/80 rounded-2xl text-white placeholder-slate-500 font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all text-base"
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
                Select Your Grade:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
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
                      className={`p-3 rounded-2xl border-2 text-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white font-extrabold ring-2 ring-indigo-500/40 shadow-lg'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 font-semibold hover:border-slate-600'
                      }`}
                    >
                      <GraduationCap className={`w-5 h-5 mx-auto mb-1 ${isSelected ? 'text-yellow-400' : 'text-slate-500'}`} />
                      <div className="text-xs sm:text-sm font-bold">{g}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Challenge Mode:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setMode('student');
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    mode === 'student'
                      ? 'bg-rose-950/40 border-rose-500 text-white font-bold ring-2 ring-rose-500/30'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    Student Challenge
                  </div>
                  <div className="text-[11px] text-slate-300">
                    3 Lives & Security Detection
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setMode('teacher');
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    mode === 'teacher'
                      ? 'bg-purple-950/40 border-purple-500 text-white font-bold ring-2 ring-purple-500/30'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1">
                    <BookOpen className="w-4 h-4" />
                    Teacher Mode
                  </div>
                  <div className="text-[11px] text-slate-300">
                    No Lives, Reveal Answers
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl transition active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Start Python Adventure</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
              <span>View Local Hall of Fame Leaderboard</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

