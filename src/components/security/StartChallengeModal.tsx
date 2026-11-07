import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Heart, MonitorPlay, AlertCircle } from 'lucide-react';
import { Mascot } from '../mascot/Mascot';

interface StartChallengeModalProps {
  studentName: string;
  grade: string;
  onStart: () => void;
  onCancel: () => void;
}

export const StartChallengeModal: React.FC<StartChallengeModalProps> = ({
  studentName,
  grade,
  onStart,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative max-w-lg w-full bg-slate-900/95 border-2 border-indigo-500/50 rounded-3xl p-6 md:p-8 shadow-2xl text-center overflow-hidden"
      >
        <div className="flex justify-center -mt-2 mb-3">
          <Mascot mood="happy" size="sm" message={`Ready, ${studentName}?`} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          {grade} Python Hero Challenge
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          Challenge Rules & Security
        </h2>

        <p className="text-slate-300 text-sm mb-6">
          Welcome <span className="font-bold text-yellow-400">{studentName}</span>! Before entering the arena, please read the challenge conditions carefully:
        </p>

        {/* Rules Cards */}
        <div className="space-y-3 mb-6 text-left">
          <div className="p-3.5 bg-slate-800/80 border border-slate-700/60 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-rose-500/20 rounded-xl mt-0.5">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">3 Lives System</h4>
              <p className="text-xs text-slate-300">
                You begin with 3 lives. Leaving the screen, switching tabs, or exiting fullscreen consumes <strong className="text-rose-400">1 life</strong>.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/80 border border-slate-700/60 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl mt-0.5">
              <MonitorPlay className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Fullscreen Mode</h4>
              <p className="text-xs text-slate-300">
                The game runs in fullscreen for focus. Exiting fullscreen triggers a deterrence alert.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/80 border border-amber-500/20 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl mt-0.5">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-amber-300 text-sm">Fair Play Policy</h4>
              <p className="text-xs text-slate-300">
                Browser security provides activity detection and deterrence to encourage fair, focused learning.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition active:scale-95 text-sm"
          >
            Go Back
          </button>
          <button
            onClick={onStart}
            className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            <Shield className="w-5 h-5" />
            <span>I Am Ready, Start!</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

