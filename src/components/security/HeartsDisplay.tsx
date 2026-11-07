import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartsDisplayProps {
  lives: number; // 0 to 3
  maxLives?: number;
}

export const HeartsDisplay: React.FC<HeartsDisplayProps> = ({ lives, maxLives = 3 }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-rose-500/30 rounded-2xl shadow-inner backdrop-blur-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-rose-400 mr-1 hidden sm:inline">
        Lives:
      </span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: maxLives }).map((_, index) => {
          const isActive = index < lives;
          return (
            <AnimatePresence key={index} mode="wait">
              {isActive ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.25, 1] }}
                  exit={{ scale: [1, 1.4, 0], rotate: [0, 20, -20] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2 + index * 0.4,
                    duration: 0.6,
                  }}
                  className="relative cursor-pointer"
                  title="Active Life"
                >
                  <Heart className="w-6 h-6 md:w-7 md:h-7 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.35 }}
                  className="relative"
                  title="Lost Life"
                >
                  <Heart className="w-6 h-6 md:w-7 md:h-7 text-slate-500 stroke-[1.5]" />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

