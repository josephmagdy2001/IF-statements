import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';
import { Language } from '../../types/quiz';
import { translations } from '../../utils/translations';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
  score: number;
  timeFormatted: string;
  lang: Language;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  total,
  score,
  timeFormatted,
  lang,
}) => {
  const t = translations[lang];
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3 md:p-4 backdrop-blur-md shadow-md mb-6">
      <div className="flex items-center justify-between text-xs md:text-sm font-bold text-slate-300 mb-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-xl">
            {t.questionLabel} {currentIndex + 1} {t.ofLabel} {total}
          </span>
          <span className="text-slate-400 hidden sm:inline">
            ({progressPercent}% {t.completedLabel})
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Spent */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 rounded-xl text-slate-300">
            <Clock className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-xs">{timeFormatted}</span>
          </div>

          {/* Current Score */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-black">{score} {t.ptsLabel}</span>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-md relative"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Glow bubble at the head */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full opacity-70 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};
