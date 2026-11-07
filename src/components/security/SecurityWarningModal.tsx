import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldAlert, HeartCrack, ArrowRight } from 'lucide-react';
import { Mascot } from '../mascot/Mascot';

interface SecurityWarningModalProps {
  isOpen: boolean;
  message: string | null;
  remainingLives: number;
  onDismiss: () => void;
}

export const SecurityWarningModal: React.FC<SecurityWarningModalProps> = ({
  isOpen,
  message,
  remainingLives,
  onDismiss,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-md w-full bg-gradient-to-b from-rose-950/90 to-slate-900 border-2 border-rose-500 rounded-3xl p-6 shadow-[0_0_50px_rgba(244,63,94,0.4)] text-center overflow-hidden"
        >
          {/* Animated flashing border header */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 animate-pulse" />

          <div className="flex justify-center -mt-2 mb-2">
            <Mascot mood="warning" size="sm" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-bounce" />
            Security Alert – Life Deducted
          </div>

          <h3 className="text-2xl font-black text-white mb-2 flex items-center justify-center gap-2">
            <AlertTriangle className="w-7 h-7 text-amber-400 inline" />
            Oops! Screen Left!
          </h3>

          <p className="text-slate-300 text-sm mb-4">
            {message || 'You left the quiz or switched tabs. To ensure fairness, leaving the challenge consumes one life.'}
          </p>

          {/* Lives summary box */}
          <div className="bg-slate-950/60 border border-rose-500/30 rounded-2xl p-4 mb-5 flex items-center justify-around">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <HeartCrack className="w-6 h-6 text-rose-500 animate-pulse" />
              <span>-1 Life Lost</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-sm font-semibold text-slate-200">
              Remaining:{' '}
              <span className={`text-lg font-black ${remainingLives > 1 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
                {remainingLives} / 3
              </span>
            </div>
          </div>

          <p className="text-xs text-amber-300/80 mb-5">
            ⚠️ Warning: When lives reach zero, your challenge will immediately end!
          </p>

          <button
            onClick={onDismiss}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            <span>Return to Quiz in Fullscreen</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

